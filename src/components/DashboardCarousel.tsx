
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

// Use high-quality placeholder images from Unsplash that work well as dashboard previews
const images = [
  "/lovable-uploads/25b9a189-5c5b-4737-933a-6a328fe06be4.png", // Use the same image as in NotionHero
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
];

const DashboardCarousel = () => {
  const [api, setApi] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() === images.length - 1) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      api.off("select");
    };
  }, [api]);

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-7xl">
        <Carousel className="relative" setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
                  <div className="rounded-[2rem] overflow-hidden mx-auto shadow-xl border border-gray-100">
                    <img
                      src={image}
                      alt={`Dashboard screenshot ${index + 1}`}
                      className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        console.log(`Image failed to load: ${target.src}`);
                        target.src = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80";
                      }}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom control buttons */}
          <div className="mt-6 flex justify-center gap-2">
            {['Windows 11', 'Windows 10', 'Gaming RDP', 'Admin RDP', 'Private Server'].map((label, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                  ${
                    currentIndex === index
                      ? 'bg-gray-200 text-black shadow'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default DashboardCarousel;
