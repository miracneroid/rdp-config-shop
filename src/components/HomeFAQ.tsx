
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "Why do I need a VPN?",
    answer: "A VPN encrypts your internet connection and hides your online identity, protecting your data from hackers, ISPs, and other third parties. It also allows you to access geo-restricted content and browse the web anonymously."
  },
  {
    question: "How does our service protect my data?",
    answer: "Our service uses military-grade encryption to secure your connection, implements a strict no-logs policy to ensure your activity isn't recorded, and provides advanced features like kill switch and DNS leak protection to safeguard your identity."
  },
  {
    question: "Does our service run when the app is closed?",
    answer: "Yes, our service continues to protect your connection even when the app is minimized or in the background. You can configure auto-connect settings to ensure you're always protected when connecting to new networks."
  },
  {
    question: "Can I use our VPN app abroad?",
    answer: "Absolutely! Our service works worldwide with servers in 55+ countries. This allows you to access your favorite content while traveling and bypass regional restrictions from anywhere in the world."
  },
  {
    question: "Can I use your VPN on multiple devices?",
    answer: "Yes, depending on your plan. Our Personal plan covers 1 device, Starter plan covers 5 devices, and Premium plan supports up to 10 devices simultaneously, all with the same account."
  }
];

const HomeFAQ = () => {
  return (
    <div className="bg-[#0c0c20] py-16 relative overflow-hidden">
      {/* Star background with small dots (same as pricing section) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-blue-400 mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            We have compiled list of frequently asked questions to provide you with
            quick and comprehensive answers.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem 
                value={`item-${index}`} 
                className="border-none bg-[#171728] rounded-xl overflow-hidden mb-4"
              >
                <AccordionTrigger className="px-6 py-4 text-white hover:no-underline hover:bg-[#1e1e3a] transition-all">
                  <span className="text-left text-lg">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-400">
          More questions? <Link to="/contact" className="text-blue-400 hover:underline">Contact Us</Link>.
        </div>
      </div>
    </div>
  );
};

export default HomeFAQ;
