
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Bot, User } from 'lucide-react';

interface Message {
  type: 'bot' | 'user';
  content: string;
}

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: "Hi! How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: userInput }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "Thanks for your message! One of our support agents will get back to you soon."
      }]);
    }, 1000);

    setUserInput('');
    
    toast({
      title: "Message sent",
      description: "We'll respond to you shortly!",
    });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-rdp-dark dark:text-white">Live Chat Support</h2>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                message.type === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-lg flex items-start gap-2 max-w-[80%] ${
                message.type === 'user'
                  ? 'bg-rdp-blue text-white ml-auto'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {message.type === 'bot' ? (
                  <Bot className="h-5 w-5 mt-1" />
                ) : (
                  <User className="h-5 w-5 mt-1" />
                )}
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message here..."
            className="resize-none"
            rows={2}
          />
          <Button onClick={handleSendMessage} className="bg-rdp-blue hover:bg-rdp-blue/90">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
