
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Quote, Star } from "lucide-react";
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
  stars?: number;
}

const testimonials: TestimonialProps[] = [
  {
    companyName: "Atlas Corp",
    companyLogo: "/lovable-uploads/39d58574-fcd5-4ca1-92d0-a5f48152b4f9.png",
    quote: "The RDP solution from rdp.sh completely transformed our remote workflow. Reliable, fast, and incredibly secure.",
    personName: "Thomas Richards",
    personTitle: "CTO at Atlas Corp",
    personImage: "/avatars/human1.png",
    stars: 5
  },
  {
    companyName: "Nexus Tech",
    companyLogo: "/lovable-uploads/ce82569c-c62b-488d-9d1d-7ac9fdbb14e6.png", 
    quote: "How Nexus cut deployment time by 45% with rdp.sh's lightning-fast server provisioning and intuitive management panel",
    personName: "Alex Morgan",
    personTitle: "DevOps Lead at Nexus",
    personImage: "/avatars/human2.png",
    linkText: "CASE STUDY",
    linkUrl: "/case-studies/nexus",
    stars: 5
  },
  {
    companyName: "Quantum Systems",
    companyLogo: "/lovable-uploads/8f2131b2-d7e7-42cb-bba7-d50ac84b91a2.png",
    quote: "A must-have tool for tech teams. Automated provisioning, seamless scaling, and enterprise-grade security in one platform.",
    personName: "Sarah Chen",
    personTitle: "CEO & Founder at Quantum",
    personImage: "/avatars/human3.png",
    stars: 4
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

  const renderStars = (count: number = 5) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ));
  };

  return (
    <section className="w-full py-16 font-sans relative overflow-hidden">
      {/* Premium gradient background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 opacity-95"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-400 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 mb-4 px-3 py-1">
            TESTIMONIALS
          </Badge>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-100 bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          
          <p className="text-blue-200 max-w-2xl text-center mb-6">
            See why thousands of tech teams worldwide choose our platform for their remote infrastructure needs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-12 mt-4">
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg px-6 py-4 border border-white/10">
              <div className="text-4xl font-bold text-white">2K+</div>
              <div className="text-sm text-blue-200">Ambitious Companies</div>
            </div>
            
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-lg px-6 py-4 border border-white/10">
              <div className="text-4xl font-bold text-white">$20B+</div>
              <div className="text-sm text-blue-200">Transactions Processed</div>
            </div>
          </div>
        </div>

        <div className="relative px-10">
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
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-blue-400/30 transition-all duration-300 h-full overflow-hidden shadow-xl">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <img 
                          src={testimonial.companyLogo} 
                          alt={testimonial.companyName}
                          className="h-8 object-contain"
                        />
                        <div className="flex">
                          {renderStars(testimonial.stars)}
                        </div>
                      </div>

                      <div className="flex-grow">
                        <Quote className="text-blue-400/30 h-12 w-12 mb-2 -ml-2 opacity-50" />
                        <p className="text-white mb-6 font-light leading-relaxed">{testimonial.quote}</p>
                      </div>

                      <div className="flex items-center mt-4 pt-4 border-t border-white/10">
                        <img 
                          src={testimonial.personImage}
                          alt={testimonial.personName}
                          className="w-12 h-12 rounded-full mr-4 ring-2 ring-white/20"
                        />
                        <div>
                          <p className="font-medium text-white">{testimonial.personName}</p>
                          <p className="text-sm text-blue-200">{testimonial.personTitle}</p>
                        </div>
                      </div>
                      
                      {testimonial.linkText && (
                        <div className="mt-6 text-right">
                          <a href={testimonial.linkUrl} className="inline-flex items-center">
                            <Badge className="bg-blue-600 hover:bg-blue-700 gap-1 transition-all duration-300">
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
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-lg" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-lg" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
