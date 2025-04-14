
// This module generates PDF invoices using a proper PDF structure
// It creates valid PDF documents that can be downloaded and viewed in PDF readers

export const generateInvoice = (data: {
  orderNumber: number;
  customer: {
    name: string;
    email: string;
  };
  items: {
    description: string;
    price: string;
  }[];
  total: string;
  date: string;
}) => {
  console.log('Generating invoice for order', data.orderNumber);
  
  // Create a valid PDF structure following the PDF specification
  const pdfContent = generatePdfContent(data);
  
  // Return a PDF blob with proper MIME type
  return new Blob([pdfContent], { type: 'application/pdf' });
};

function generatePdfContent(data: any): Uint8Array {
  // PDF structure based on PDF 1.7 specification to create a valid PDF document
  
  // Instead of returning just text, create a proper PDF structure with binary content
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
  
  // Prepare invoice content stream
  const contentStream = `
BT
/F1 16 Tf
50 750 Td
(RDP Config Service - INVOICE) Tj
/F1 12 Tf
0 -30 Td
(Invoice #: ${data.orderNumber}) Tj
0 -20 Td
(Date: ${data.date}) Tj
0 -20 Td
(Customer: ${data.customer.name}) Tj
0 -20 Td
(Email: ${data.customer.email}) Tj
0 -30 Td
(Items:) Tj
`;

  // Add each line item
  let itemsContent = '';
  let yOffset = 30;
  data.items.forEach((item: { description: string; price: string }) => {
    itemsContent += `0 -20 Td\n(${item.description}: ${item.price}) Tj\n`;
  });

  // Add total and footer
  const footerContent = `
0 -30 Td
(Total: ${data.total}) Tj
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
}

export const emailInvoice = (email: string, invoiceData: any) => {
  // In a real application, this would send an email with the invoice attached
  console.log('Emailing invoice to', email);
  
  // Mock implementation
  return {
    success: true,
    message: `Invoice sent to ${email}`
  };
};

export const emailRdpCredentials = (email: string, credentials: { username: string; password: string }, packageDetails: string) => {
  // In a real application, this would send an email with RDP credentials
  console.log('Emailing RDP credentials to', email);
  
  // Mock implementation
  return {
    success: true,
    message: `RDP credentials sent to ${email}`
  };
};
