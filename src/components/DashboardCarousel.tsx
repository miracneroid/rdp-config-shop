
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
];

const DashboardCarousel = () => {
  const [api, setApi] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (!api) return;
    
    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 2500); // Changed to 2.5 seconds
    
    return () => {
      clearInterval(interval);
      api.off('select');
    };
  }, [api]);

  return (
    <div className="w-full relative -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="max-w-[100vw]">
        <Carousel className="relative" setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
                  <div className="rounded-[2rem] overflow-hidden">
                    <img
                      src={image}
                      alt={`Dashboard screenshot ${index + 1}`}
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-8" />
          <CarouselNext className="absolute right-8" />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-black' : 'bg-gray-300'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default DashboardCarousel;
