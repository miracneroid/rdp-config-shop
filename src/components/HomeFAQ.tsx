
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "What makes our RDP solutions unique?",
    answer: "Our RDP solutions offer enterprise-grade security, instant deployment, and fully customizable configurations to meet your specific needs."
  },
  {
    question: "How quickly can I get started?",
    answer: "You can have your RDP environment up and running in just 5 minutes after configuration and payment."
  },
  {
    question: "What types of support do you offer?",
    answer: "We provide 24/7 technical support, detailed documentation, and dedicated account managers for enterprise clients."
  }
];

const HomeFAQ = () => {
  return (
    <div className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-indigo-400" />
            <Badge variant="outline" className="text-indigo-400 border-indigo-400">FAQ</Badge>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Get quick answers to common questions about our RDP services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
                <AccordionTrigger className="text-left font-medium text-white">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
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

export default HomeFAQ;
