
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.1";

// Email service (mock implementation)
const sendEmail = async (to: string, subject: string, html: string, attachmentContent?: string) => {
  console.log(`Sending email to ${to} with subject: ${subject}`);
  // In a real implementation, this would use a service like Resend or SendGrid
  // and would include the PDF attachment
  return { success: true };
};

const generateInvoiceHTML = (orderData: any) => {
  const items = orderData.order_details.items.map((item: any) => {
    return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.description}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price}</td>
      </tr>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .invoice { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #eee; }
        .header { border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
        .title { font-size: 24px; font-weight: bold; margin: 0; color: #2563eb; }
        .meta { margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f9fafb; text-align: left; padding: 10px; }
        .total { margin-top: 30px; text-align: right; }
        .footer { margin-top: 50px; text-align: center; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="invoice">
        <div class="header">
          <h1 class="title">INVOICE</h1>
          <p>RDP Config Service</p>
          <div class="meta">
            <p><strong>Invoice #:</strong> ${orderData.invoice_number || orderData.id.substring(0, 8)}</p>
            <p><strong>Date:</strong> ${new Date(orderData.created_at).toLocaleDateString()}</p>
            <p><strong>Payment Status:</strong> ${orderData.payment_status.toUpperCase()}</p>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${items}
          </tbody>
        </table>
        
        <div class="total">
          <p><strong>Total:</strong> ${orderData.currency} ${orderData.amount.toFixed(2)}</p>
        </div>
        
        <div class="footer">
          <p>Thank you for your business!</p>
          <p>For support, contact support@rdpconfig.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

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
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Get the request body
    const body = await req.json();
    const { orderId, email } = body;

    if (!orderId || !email) {
      return new Response(
        JSON.stringify({ error: "Order ID and email are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Fetch order details
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { 
          status: 404, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Generate invoice HTML
    const invoiceHTML = generateInvoiceHTML(order);

    // Send the invoice by email (in a real implementation, this would also attach the PDF)
    await sendEmail(
      email,
      `Your RDP Config Invoice #${order.invoice_number || order.id.substring(0, 8)}`,
      invoiceHTML
    );

    // Update order to indicate invoice was sent
    await supabaseAdmin
      .from("orders")
      .update({ invoice_sent: true })
      .eq("id", orderId);

    return new Response(
      JSON.stringify({ success: true, message: "Invoice sent successfully" }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error sending invoice:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
