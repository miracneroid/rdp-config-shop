
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.1.1";

// Email service (mock implementation)
const sendEmail = async (to: string, subject: string, html: string, attachmentContent?: Uint8Array) => {
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

// Function to generate PDF invoice content
const generatePdfInvoice = (orderData: any): Uint8Array => {
  const textEncoder = new TextEncoder();
  
  // PDF header
  let pdfStr = '%PDF-1.7\n';
  
  // Objects array to track PDF objects
  const objects: string[] = [];
  
  // Add catalog - the root object (1)
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  
  // Add pages dictionary (2)
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  
  // Add page object (3)
  objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n');
  
  // Prepare invoice content
  const items = orderData.order_details.items;
  const invoiceNumber = orderData.invoice_number || orderData.id.substring(0, 8);
  const date = new Date(orderData.created_at).toLocaleDateString();
  
  // Prepare invoice content stream
  const contentStream = `
BT
/F1 16 Tf
50 750 Td
(RDP Config Service - INVOICE) Tj
/F1 12 Tf
0 -30 Td
(Invoice #: ${invoiceNumber}) Tj
0 -20 Td
(Date: ${date}) Tj
0 -20 Td
(Customer: ${orderData.order_details.customer?.name || "Customer"}) Tj
0 -20 Td
(Email: ${orderData.order_details.customer?.email || ""}) Tj
0 -30 Td
(Items:) Tj
`;

  // Add each line item
  let itemsContent = '';
  items.forEach((item: { description: string; price: string }) => {
    itemsContent += `0 -20 Td\n(${item.description}: ${item.price}) Tj\n`;
  });

  // Add total and footer
  const footerContent = `
0 -30 Td
(Total: ${orderData.currency} ${orderData.amount.toFixed(2)}) Tj
0 -50 Td
(Thank you for your business!) Tj
ET
`;

  const completeContent = contentStream + itemsContent + footerContent;
  
  // Add content stream (4)
  objects.push(`4 0 obj\n<< /Length ${completeContent.length} >>\nstream\n${completeContent}\nendstream\nendobj\n`);
  
  // Add font (5)
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n');
  
  // Add objects to PDF
  for (const obj of objects) {
    pdfStr += obj;
  }
  
  // Cross-reference table
  const xrefOffset = pdfStr.length;
  pdfStr += 'xref\n';
  pdfStr += '0 6\n'; // 6 objects (including object 0)
  pdfStr += '0000000000 65535 f \n'; // Object 0
  
  // Calculate offsets for each object
  let offset = pdfStr.indexOf('1 0 obj');
  pdfStr += `${offset.toString().padStart(10, '0')} 00000 n \n`;
  
  offset = pdfStr.indexOf('2 0 obj');
  pdfStr += `${offset.toString().padStart(10, '0')} 00000 n \n`;
  
  offset = pdfStr.indexOf('3 0 obj');
  pdfStr += `${offset.toString().padStart(10, '0')} 00000 n \n`;
  
  offset = pdfStr.indexOf('4 0 obj');
  pdfStr += `${offset.toString().padStart(10, '0')} 00000 n \n`;
  
  offset = pdfStr.indexOf('5 0 obj');
  pdfStr += `${offset.toString().padStart(10, '0')} 00000 n \n`;
  
  // Trailer
  pdfStr += 'trailer\n';
  pdfStr += '<< /Size 6 /Root 1 0 R >>\n';
  pdfStr += 'startxref\n';
  pdfStr += `${xrefOffset}\n`;
  pdfStr += '%%EOF';
  
  // Convert to binary
  return textEncoder.encode(pdfStr);
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

    // Generate invoice HTML and PDF
    const invoiceHTML = generateInvoiceHTML(order);
    const invoicePDF = generatePdfInvoice(order);

    // Send the invoice by email
    await sendEmail(
      email,
      `Your RDP Config Invoice #${order.invoice_number || order.id.substring(0, 8)}`,
      invoiceHTML,
      invoicePDF
    );

    // Update order to indicate invoice was sent
    await supabaseAdmin
      .from("orders")
      .update({ invoice_sent: true })
      .eq("id", orderId);

    // Return the PDF data as a response
    return new Response(
      invoicePDF,
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="invoice-${order.invoice_number || order.id.substring(0, 8)}.pdf"`
        }
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
