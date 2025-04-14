
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
    console.log("Received request to generate test RDP");
    
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Get the request body which should contain the user's email
    const body = await req.json();
    const { email } = body;

    console.log("Request parameters:", { email });

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    if (email !== "test@gmail.com") {
      return new Response(
        JSON.stringify({ error: "This function only works for test@gmail.com" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get user by email using the admin auth API
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserByEmail(email);
    
    if (userError || !userData?.user) {
      console.error("Error finding test user:", userError);
      return new Response(
        JSON.stringify({ error: "Failed to find test user", details: userError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    const userId = userData.user.id;
    
    // First check if an RDP instance already exists for the user
    const { data: existingRdp } = await supabaseAdmin
      .from('rdp_instances')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
      
    if (existingRdp) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Test RDP already exists for test@gmail.com",
          data: { rdpExists: true }
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create a test RDP instance with 59 EUR price
    const { data: rdpInstance, error: rdpError } = await supabaseAdmin
      .from('rdp_instances')
      .insert({
        user_id: userId,
        name: "Windows 11 Enterprise",
        username: "admin",
        password: "Test123!",
        ip_address: "192.168.1.101",
        port: "3389",
        status: "active",
        expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        plan_details: {
          cpu: "8 vCPU",
          ram: "32 GB",
          storage: "500 GB SSD",
          os: "Windows 11 Enterprise",
          bandwidth: "Unlimited"
        }
      })
      .select()
      .single();

    if (rdpError) {
      console.error("Error creating RDP instance:", rdpError);
      return new Response(
        JSON.stringify({ error: "Failed to create RDP instance", details: rdpError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Create an order for this RDP
    const { error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: userId,
        rdp_instance_id: rdpInstance.id,
        invoice_number: `INV-${Date.now().toString().substring(0, 10)}`,
        payment_status: "paid",
        currency: "EUR",
        amount: 59.00,
        order_details: {
          items: [
            {
              name: "Windows 11 Enterprise RDP",
              quantity: 1,
              price: "€59.00",
              subtotal: "€59.00"
            }
          ],
          subtotal: "€59.00",
          tax: "€0.00",
          total: "€59.00"
        }
      });
      
    if (orderError) {
      console.error("Error creating order:", orderError);
      return new Response(
        JSON.stringify({ error: "Failed to create order", details: orderError }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { 
          rdpInstance,
          message: "Test RDP added successfully for test@gmail.com" 
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Unhandled error generating test RDP:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
