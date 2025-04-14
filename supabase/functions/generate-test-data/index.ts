
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
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Get the request body which should contain the user's email
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin.auth.admin.getUserByEmail(email);

    let userId;
    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Create a test user
      const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createUserError || !newUser) {
        return new Response(
          JSON.stringify({ error: "Failed to create test user", details: createUserError }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      userId = newUser.id;
      
      // Create a profile for the user
      await supabaseAdmin
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
    }

    // Create a test RDP instance for the user
    const { data: rdpInstance, error: rdpError } = await supabaseAdmin
      .from('rdp_instances')
      .insert({
        user_id: userId,
        name: "Windows Server 2022",
        username: "admin",
        password: "SecurePassword123!",
        ip_address: "192.168.1.100",
        port: "3389",
        status: "active",
        expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        plan_details: {
          cpu: "4 vCPU",
          ram: "16 GB",
          storage: "250 GB SSD",
          os: "Windows Server 2022",
          bandwidth: "Unlimited"
        }
      })
      .select()
      .single();

    if (rdpError || !rdpInstance) {
      return new Response(
        JSON.stringify({ error: "Failed to create RDP instance", details: rdpError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create a test order for the RDP
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: userId,
        rdp_instance_id: rdpInstance.id,
        invoice_number: `INV-${Date.now().toString().substring(0, 10)}`,
        payment_status: "paid",
        currency: "EUR",
        amount: 49.99,
        order_details: {
          items: [
            {
              name: "Windows Server 2022 RDP",
              quantity: 1,
              price: "€49.99",
              subtotal: "€49.99"
            }
          ],
          subtotal: "€49.99",
          tax: "€0.00",
          total: "€49.99"
        }
      })
      .select()
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Failed to create order", details: orderError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create some system logs for the RDP
    const logActions = ["create", "start", "restart"];
    const logPromises = logActions.map((action, index) => {
      return supabaseAdmin
        .from('system_logs')
        .insert({
          rdp_instance_id: rdpInstance.id,
          action,
          status: "completed",
          details: { initiated_by: "system", reason: "setup" },
          performed_at: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString() // Going back in time for each log
        });
    });

    await Promise.all(logPromises);

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: { email, id: userId },
        rdp: rdpInstance,
        order 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error generating test data:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
