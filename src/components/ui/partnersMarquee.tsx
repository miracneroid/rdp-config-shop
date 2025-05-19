import React from "react";

interface PartnersMarqueeProps {
  partners: string[];
}

const PartnersMarquee: React.FC<PartnersMarqueeProps> = ({ partners }) => {
  return (
    <div className="relative w-full py-20 overflow-hidden select-none bg-transparent z-10">
      <div className="text-center mb-12">
        <p className="text-xl text-gray-400 mb-10">
          Our trusted partners and companies, relying on our safe services.
        </p>

        {/* Marquee */}
        <div
          className="flex items-center gap-12 animate-scroll whitespace-nowrap"
          style={{
            animation: "partners-scroll-marquee 40s linear infinite",
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <span
              key={`${partner}-${index}`}
              className="text-white-500 text-2xl md:text-3xl font-bold hover:scale-110 transition-transform duration-300"
              style={{
                minWidth: `${partner.length * 20 + 30}px`, // Dynamic width
                textAlign: "center",
                textShadow: "0 0 0 transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.2)";
                e.currentTarget.style.textShadow = "0 0 8px rgb(255, 255, 255)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(1)";
                e.currentTarget.style.textShadow = "0 0 0 transparent";
              }}
            >
              {partner}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes partners-scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        :root {
          --bg-gradient-start:rgb(255, 255, 255);
        }

        .dark {
          --bg-gradient-start:rgb(255, 255, 255);
        }

        .animate-scroll {
          display: flex;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default PartnersMarquee;
