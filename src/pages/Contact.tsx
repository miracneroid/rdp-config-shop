
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Phone, MapPin, Headset, Clock } from 'lucide-react';
import ChatSection from '@/components/ChatSection';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [showChat, setShowChat] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('open') === 'chat') {
      setShowChat(true);
    }
  }, [location]);

  const onSubmit = (values: ContactFormValues) => {
    toast({
      title: "Message Sent",
      description: "We'll get back to you soon!",
    });

    form.reset();
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-rdp-blue" />,
      title: "Email",
      info: "support@rdpconfig.com",
      detail: "24/7 Support Available"
    },
    {
      icon: <Phone className="h-6 w-6 text-rdp-blue" />,
      title: "Phone",
      info: "+1 (555) 123-4567",
      detail: "Mon-Fri 9:00 AM - 6:00 PM EST"
    },
    {
      icon: <MapPin className="h-6 w-6 text-rdp-blue" />,
      title: "Location",
      info: "123 Business Ave",
      detail: "New York, NY 10001"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-rdp-blue" />,
      title: "Live Chat",
      info: "Available 24/7",
      detail: "Quick response within minutes",
      onClick: () => setShowChat(true)
    }
  ];
  
  const supportTimes = [
    {
      icon: <Headset className="h-5 w-5 text-green-500" />,
      title: "Live Support",
      hours: "24/7 for Premium Customers"
    },
    {
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      title: "Phone Support",
      hours: "Monday-Friday, 9AM-6PM EST"
    },
    {
      icon: <Mail className="h-5 w-5 text-purple-500" />,
      title: "Email Response",
      hours: "Within 24 hours"
    },
    {
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      title: "Technical Support",
      hours: "Monday-Sunday, 8AM-8PM EST"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-rdp-dark dark:text-white">Get in Touch</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about our RDP services? We're here to help. Choose your preferred contact method or send us a message directly.
            </p>
          </div>

          {showChat ? (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-rdp-dark dark:text-white">Live Chat Support</h2>
                <Button variant="outline" onClick={() => setShowChat(false)}>
                  Return to Contact Options
                </Button>
              </div>
              <ChatSection />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Contact Information - Left Side */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-rdp-dark dark:text-white">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  {contactInfo.map((item, index) => (
                    <Card 
                      key={index} 
                      className={`border-none shadow-md hover:shadow-lg transition-shadow duration-300 ${item.onClick ? 'cursor-pointer' : ''}`}
                      onClick={item.onClick}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-full">
                            {item.icon}
                          </div>
                          <h3 className="font-semibold text-lg text-rdp-dark dark:text-white">{item.title}</h3>
                          <p className="text-gray-700 dark:text-gray-200 font-medium">{item.info}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.detail}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold mb-4 text-rdp-dark dark:text-white">Support Hours</h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {supportTimes.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {item.icon}
                        <div>
                          <h4 className="font-medium text-rdp-dark dark:text-white">{item.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.hours}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form - Right Side */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-rdp-dark dark:text-white">Send us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              rows={5} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-rdp-blue hover:bg-rdp-blue/90">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Contact;
