
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import PuzzleIcon from "@/components/ui/puzzle-icon";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
    companyName: "Gusto",
    companyLogo: "/lovable-uploads/39d58574-fcd5-4ca1-92d0-a5f48152b4f9.png",
    quote: "Gosh, I wish this existed when we started Gusto. It's about time innovation comes to the business accounting space. Puzzle is going to be huge.",
    personName: "Tomer London",
    personTitle: "CO-Founder & CPO at Gusto",
    personImage: "/avatars/human1.png"
  },
  {
    companyName: "Burkland",
    companyLogo: "/lovable-uploads/ce82569c-c62b-488d-9d1d-7ac9fdbb14e6.png", 
    quote: "How Burkland cut 25% from month-end close with Ramp and Puzzle",
    personName: "",
    personTitle: "",
    personImage: "",
    linkText: "CASE STUDY",
    linkUrl: "/case-studies/burkland"
  },
  {
    companyName: "Meow",
    companyLogo: "/lovable-uploads/8f2131b2-d7e7-42cb-bba7-d50ac84b91a2.png",
    quote: "A must-have tool for founders. Autonomous accounting is no longer the future — it's arrived",
    personName: "Brandon Arvanaghi",
    personTitle: "CEO & CO-Founder at Meow",
    personImage: "/avatars/human3.png"
  },
  {
    companyName: "Loom",
    companyLogo: "/lovable-uploads/e3cb316d-065e-4164-9419-1cacf07d64f1.png",
    quote: "Puzzle has transformed our financial operations. It's the most intuitive accounting software we've ever used.",
    personName: "Sarah Chen",
    personTitle: "CFO at Loom",
    personImage: "/avatars/human2.png"
  },
  {
    companyName: "Segment",
    companyLogo: "/lovable-uploads/e74400ca-7cb9-43c8-9512-6c417565b6b1.png",
    quote: "Integration was seamless. Our team was up and running in minutes, not days. Puzzle just works.",
    personName: "Michael Rodriguez",
    personTitle: "Head of Finance at Segment",
    personImage: "/avatars/mage.png"
  },
  {
    companyName: "Notion",
    companyLogo: "/lovable-uploads/a831c66a-d192-4fb2-a9a9-d7331e60b331.png",
    quote: "We've tried everything, and Puzzle is by far the most powerful yet simple accounting solution for startups.",
    personName: "Alex Johnson",
    personTitle: "VP of Operations at Notion",
    personImage: "/avatars/elf.png"
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
    <section className="w-full py-20 font-sans relative overflow-hidden">
      {/* Dark background with subtle pattern */}
      <div className="absolute inset-0 bg-[#0e0c1f] bg-opacity-95"></div>
      
      {/* Circular gradient overlays */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-3xl -top-[300px] -left-[300px]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl -bottom-[200px] -right-[200px]"></div>
        <div className="absolute w-[1000px] h-[1000px] rounded-full border border-gray-700/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-[1400px] h-[1400px] rounded-full border border-gray-700/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-start mb-14">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">❤️</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center">
              Customers Love <span className="ml-3">Puzzle</span>
            </h2>
          </div>
          
          <div className="hidden md:flex space-x-12 text-white text-right">
            <div>
              <div className="text-3xl font-bold">2K+</div>
              <div className="text-gray-400 text-sm">Ambitious Startups</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold">$20B+</div>
              <div className="text-gray-400 text-sm">Transactions Categorized</div>
            </div>
          </div>
        </div>

        <div className="relative px-2">
          {/* Left shadow/smoke effect for partially visible testimonials */}
          <div className="absolute left-0 top-0 h-full w-16 z-20 pointer-events-none bg-gradient-to-r from-[#0e0c1f] to-transparent"></div>

          <Carousel 
            className="w-full" 
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial, idx) => (
                <CarouselItem key={idx} className="pl-4 md:pl-6 sm:basis-4/5 md:basis-1/2 lg:basis-1/3">
                  <div className="transition-all duration-300 transform hover:scale-105 h-full">
                    <Card className="bg-[#1a192f] border-0 h-[350px] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-gray-700/20">
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className="mb-6">
                          <img 
                            src={testimonial.companyLogo} 
                            alt={testimonial.companyName}
                            className="h-7 object-contain"
                          />
                        </div>

                        <div className="flex-grow">
                          <p className="text-white text-xl font-light leading-relaxed mb-6">{testimonial.quote}</p>
                        </div>

                        {testimonial.personName && (
                          <div className="flex items-center mt-4">
                            <Avatar className="w-10 h-10 mr-4 border border-gray-700 ring-2 ring-gray-600/30">
                              <AvatarImage 
                                src={testimonial.personImage}
                                alt={testimonial.personName}
                              />
                              <AvatarFallback className="bg-purple-700 text-white">
                                {testimonial.personName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-white">{testimonial.personName}</p>
                              <p className="text-sm text-gray-400">{testimonial.personTitle}</p>
                            </div>
                          </div>
                        )}
                        
                        {testimonial.linkText && (
                          <div className="mt-6 flex items-center">
                            <div className="text-emerald-400 font-semibold text-sm flex items-center gap-2 hover:text-emerald-300 transition-colors cursor-pointer">
                              {testimonial.linkText}
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Right shadow/smoke effect for partially visible testimonials */}
            <div className="absolute right-0 top-0 h-full w-24 z-20 pointer-events-none bg-gradient-to-l from-[#0e0c1f] to-transparent"></div>

            {/* Navigation controls */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-30">
              <CarouselPrevious className="bg-white/10 hover:bg-white/20 border-0 rounded-full w-12 h-12 shadow-lg" />
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-30">
              <CarouselNext className="bg-white/10 hover:bg-white/20 border-0 rounded-full w-12 h-12 shadow-lg" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
