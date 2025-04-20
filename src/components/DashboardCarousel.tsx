
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
  
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.next();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel className="w-full max-w-5xl mx-auto mt-12" setApi={setApi}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative overflow-hidden rounded-lg shadow-notion-lg">
              <img
                src={image}
                alt={`Dashboard screenshot ${index + 1}`}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default DashboardCarousel;
