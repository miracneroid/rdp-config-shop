
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to generate test data");
    
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Get the request body which should contain the user's email
    const body = await req.json();
    const { email, password } = body;

    console.log("Request parameters:", { email, passwordProvided: !!password });

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Check if user already exists - FIXED method for v2 client
    const { data: users, error: getUserError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (getUserError) {
      console.error("Error checking existing users:", getUserError);
      return new Response(
        JSON.stringify({ error: "Failed to check existing users", details: getUserError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const existingUser = users.users.find(user => user.email === email);

    let userId;
    if (existingUser) {
      console.log("User already exists:", existingUser.id);
      userId = existingUser.id;
      
      // Update the user's password to ensure it matches the provided one
      const { error: updateUserError } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        { password }
      );
      
      if (updateUserError) {
        console.error("Error updating user password:", updateUserError);
        return new Response(
          JSON.stringify({ error: "Failed to update user password", details: updateUserError }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      console.log("Updated password for existing user");
    } else {
      console.log("Creating new test user with email:", email);
      // Create a test user
      const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,  // Important: This confirms the email so login works immediately
      });

      if (createUserError || !newUser) {
        console.error("Failed to create test user:", createUserError);
        return new Response(
          JSON.stringify({ error: "Failed to create test user", details: createUserError }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      userId = newUser.id;
      console.log("Created new user with ID:", userId);
      
      // Create a profile for the user
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: userId,
          display_name: "Test User",
          first_name: "Test",
          last_name: "User",
          preferred_currency: "EUR",
          billing_address: {
            address1: "123 Test Street",
            city: "Test City",
            state: "Test State",
            zip: "12345",
            country: "Test Country"
          }
        });
        
      if (profileError) {
        console.error("Error creating profile:", profileError);
      } else {
        console.log("Created profile for user");
      }
    }

    // We'll no longer create RDP instances here
    // This will now be handled by the addTestRdp function specifically for test@gmail.com

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: { email, id: userId },
        message: "Test user created successfully. You can now login with the provided credentials."
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Unhandled error generating test data:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
