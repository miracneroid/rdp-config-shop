
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Validation Error",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: "We'll get back to you soon!",
    });

    setName('');
    setEmail('');
    setMessage('');
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
      detail: "Typical response time: 5 mins"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-rdp-dark dark:text-white">Get in Touch</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions about our RDP services? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-rdp-dark dark:text-white">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message here..."
                    rows={5}
                    required
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full bg-rdp-blue hover:bg-rdp-blue/90">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-full">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-rdp-dark dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.info}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.detail}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
