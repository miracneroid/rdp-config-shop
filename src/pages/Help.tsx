
import Navbar from "@/components/Navbar";
import StatsBanner from "@/components/StatsBanner";
import SimpleFooter from "@/components/SimpleFooter";
import { Mail, Phone, MessageSquare, FileText, Server, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  const helpCategories = [
    {
      icon: <FileText className="h-8 w-8 text-rdp-blue mb-4" />,
      title: "Frequently Asked Questions",
      description: "Find answers to the most common questions about our RDP services.",
      action: () => navigate("/faq"),
      actionText: "View FAQ",
    },
    {
      icon: <Mail className="h-8 w-8 text-rdp-blue mb-4" />,
      title: "Email Support",
      description: "Send us an email for technical questions and billing inquiries.",
      info: "support@rdpconfig.com",
      action: () => navigate("/contact"),
      actionText: "Contact Us",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-rdp-blue mb-4" />,
      title: "Live Chat",
      description: "Get real-time assistance from our support team.",
      info: "Available 24/7",
      action: () => navigate("/contact?open=chat"),
      actionText: "Start Chat",
    },
    {
      icon: <Phone className="h-8 w-8 text-rdp-blue mb-4" />,
      title: "Phone Support",
      description: "Speak directly with our customer service team.",
      info: "+1 (555) 123-4567",
      action: () => navigate("/contact"),
      actionText: "Contact Details",
    },
    {
      icon: <Server className="h-8 w-8 text-rdp-blue mb-4" />,
      title: "Technical Documentation",
      description: "Detailed guides on setting up and managing your RDP.",
      action: () => navigate("/documentation"),
      actionText: "View Docs",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-rdp-blue mb-4" />,
      title: "Security Resources",
      description: "Best practices and security information for your RDP instance.",
      action: () => navigate("/documentation?tab=security"),
      actionText: "Security Guides",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e2537] dark:text-white">Help Center</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Find the support you need to make the most of our RDP services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  {category.icon}
                  <h2 className="text-xl font-semibold mb-3 text-rdp-blue dark:text-rdp-blue-light">{category.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                  {category.info && (
                    <p className="text-gray-700 dark:text-gray-200 font-medium mb-4">{category.info}</p>
                  )}
                  <Button 
                    onClick={category.action} 
                    variant="outline" 
                    className="mt-auto text-rdp-blue border-rdp-blue hover:bg-rdp-blue hover:text-white dark:border-rdp-blue-light dark:text-rdp-blue-light"
                  >
                    {category.actionText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-3 text-rdp-dark dark:text-white">Need Urgent Help?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our priority support team is available for emergencies 24/7
            </p>
            <Button 
              onClick={() => navigate("/contact")} 
              className="bg-rdp-blue hover:bg-rdp-blue/90"
            >
              Contact Priority Support
            </Button>
          </div>
        </div>
      </div>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Help;
