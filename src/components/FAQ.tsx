
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is an RDP?",
    answer: "Remote Desktop Protocol (RDP) is a proprietary protocol developed by Microsoft that allows a user to connect to another computer over a network connection. Our service provides fully configured RDP servers that you can access from anywhere, on any device, with your own customized specifications."
  },
  {
    question: "How secure are your RDP solutions?",
    answer: "We implement multiple layers of security including enterprise-grade firewalls, regular security patches, automated backups, and advanced authentication. All connections are encrypted, and we follow industry best practices to ensure your RDP environment remains secure."
  },
  {
    question: "Can I upgrade my RDP configuration later?",
    answer: "Yes, you can upgrade your RDP configuration at any time. You can increase CPU, RAM, storage, or add additional software as your needs change. Upgrades are typically applied within minutes with minimal downtime."
  },
  {
    question: "What operating systems do you support?",
    answer: "We support a variety of Windows operating systems including Windows 10 Home/Pro, Windows 11 Home/Pro, and Windows Server editions. We also offer Ubuntu Linux options for those who prefer Linux environments."
  },
  {
    question: "How long does it take to set up my RDP?",
    answer: "Most RDP configurations are provisioned automatically and available within 5-10 minutes after payment is confirmed. More complex setups or custom configurations may take slightly longer."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards, PayPal, and select cryptocurrencies. All payments are processed securely through our payment partners."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 24-hour satisfaction guarantee. If you're not satisfied with your RDP service within the first 24 hours, contact our support team for a full refund. After that, refunds are evaluated on a case-by-case basis."
  },
  {
    question: "Can I run resource-intensive applications?",
    answer: "Yes, our higher-tier configurations are designed to handle resource-intensive applications like video editing, 3D rendering, data analysis, and more. Choose the appropriate CPU, RAM, and storage options based on your application requirements."
  },
];

const FAQ = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-rdp-blue">FAQ</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-rdp-dark sm:text-4xl">
            Frequently Asked Questions
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Everything you need to know about our RDP services.
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-rdp-dark">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
