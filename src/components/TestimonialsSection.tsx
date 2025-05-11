
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface TestimonialProps {
  companyName: string;
  companyLogo: string;
  quote: string;
  personName: string;
  personTitle: string;
  personImage: string;
  linkText?: string;
  linkUrl?: string;
}

const testimonials: TestimonialProps[] = [
  {
    companyName: "Atlas Corp",
    companyLogo: "/lovable-uploads/39d58574-fcd5-4ca1-92d0-a5f48152b4f9.png",
    quote: "The RDP solution from rdp.sh completely transformed our remote workflow. Reliable, fast, and incredibly secure.",
    personName: "Thomas Richards",
    personTitle: "CTO at Atlas Corp",
    personImage: "/avatars/human1.png"
  },
  {
    companyName: "Nexus Tech",
    companyLogo: "/lovable-uploads/ce82569c-c62b-488d-9d1d-7ac9fdbb14e6.png", 
    quote: "How Nexus cut deployment time by 45% with rdp.sh's lightning-fast server provisioning and intuitive management panel",
    personName: "Alex Morgan",
    personTitle: "DevOps Lead at Nexus",
    personImage: "/avatars/human2.png",
    linkText: "CASE STUDY",
    linkUrl: "/case-studies/nexus"
  },
  {
    companyName: "Quantum Systems",
    companyLogo: "/lovable-uploads/8f2131b2-d7e7-42cb-bba7-d50ac84b91a2.png",
    quote: "A must-have tool for tech teams. Automated provisioning, seamless scaling, and enterprise-grade security in one platform.",
    personName: "Sarah Chen",
    personTitle: "CEO & Founder at Quantum",
    personImage: "/avatars/human3.png"
  }
];

const TestimonialsSection = () => {
  const [api, setApi] = useState<any>(null);
  
  useEffect(() => {
    if (!api) return;
    
    // Set up auto-scrolling
    const autoScrollInterval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Scroll every 5 seconds
    
    return () => {
      clearInterval(autoScrollInterval);
    };
  }, [api]);

  return (
    <section className="w-full bg-gradient-to-br from-blue-900/95 to-indigo-900/95 dark:from-blue-950 dark:to-indigo-950 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Customers <span className="text-red-500">❤</span> rdp.sh
          </h2>
          
          <div className="flex flex-wrap justify-center gap-12 mt-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">2K+</div>
              <div className="text-sm text-gray-300">Ambitious Companies</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-white">$20B+</div>
              <div className="text-sm text-gray-300">Transactions Processed</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Carousel 
            className="w-full" 
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, idx) => (
                <CarouselItem key={idx} className="md:basis-1/3 lg:basis-1/3 pl-4">
                  <Card className="bg-gray-800/80 border-gray-700 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 h-full overflow-hidden">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4">
                        <img 
                          src={testimonial.companyLogo} 
                          alt={testimonial.companyName}
                          className="h-8 object-contain"
                        />
                      </div>

                      <div className="flex-grow">
                        <Quote className="text-blue-400/50 h-8 w-8 mb-2" />
                        <p className="text-gray-100 mb-6">{testimonial.quote}</p>
                      </div>

                      <div className="flex items-center mt-4">
                        <img 
                          src={testimonial.personImage}
                          alt={testimonial.personName}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <p className="font-medium text-white">{testimonial.personName}</p>
                          <p className="text-sm text-gray-400">{testimonial.personTitle}</p>
                        </div>
                      </div>
                      
                      {testimonial.linkText && (
                        <div className="mt-6 text-right">
                          <a href={testimonial.linkUrl} className="inline-flex items-center">
                            <Badge className="bg-green-600 hover:bg-green-700 gap-1">
                              {testimonial.linkText}
                              <ArrowRight className="h-3 w-3" />
                            </Badge>
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:flex">
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-0" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
