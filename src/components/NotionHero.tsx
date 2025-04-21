
import { PuzzleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import PricingSection from './PricingSection';

const defaultPricingPlans = [
  {
    name: "Basic",
    price: 29,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "64 GB SSD",
    features: [
      "Windows or Linux OS",
      "Basic Software Suite",
      "24/7 Access",
      "Standard Support"
    ]
  },
  {
    name: "Standard",
    price: 59,
    cpu: "4 Cores",
    ram: "8 GB",
    storage: "128 GB SSD",
    features: [
      "Windows or Linux OS",
      "Standard Software Suite",
      "24/7 Access",
      "Priority Support",
      "Daily Backups"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: 99,
    cpu: "8 Cores",
    ram: "16 GB",
    storage: "256 GB SSD",
    features: [
      "Windows or Linux OS",
      "Professional Software Suite",
      "24/7 Access",
      "Priority Support",
      "Daily Backups",
      "Enhanced Security"
    ]
  },
  {
    name: "Enterprise",
    price: 199,
    cpu: "16 Cores",
    ram: "32 GB",
    storage: "512 GB SSD",
    features: [
      "Windows or Linux OS",
      "Enterprise Software Suite",
      "24/7 Access",
      "Priority Support",
      "Hourly Backups",
      "Advanced Security",
      "Dedicated Resources"
    ]
  }
];

const NotionHero = () => {
  return (
    <>
      {/* HERO SECTION takes full height */}
      <section className="bg-white w-full font-sans flex items-center min-h-screen relative">
        <div className="notion-page-container flex flex-col-reverse md:flex-row items-center w-full py-16 md:py-0">
          <div className="text-left flex-1">
            <h1 className="notion-heading-1">
              The happier<br />
              <span>workspace puzzle</span>
            </h1>
            <p className="mt-6 notion-paragraph max-w-2xl">
              Configure. Connect. Deploy. Put together your ideal remote desktop environment
              with our easy-to-use building blocks.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex items-center justify-center notion-button cursor-pointer">
                <PuzzleIcon className="mr-2 h-5 w-5 text-white" />
                Start Building
              </Link>
              <Link to="/pricing" className="inline-flex items-center justify-center notion-button-outline cursor-pointer">
                View Pricing
              </Link>
            </div>
          </div>
          <div className="relative flex-1 flex justify-center">
            <img
              src="/lovable-uploads/8f2131b2-d7e7-42cb-bba7-d50ac84b91a2.png"
              alt="Puzzle RDP Logo"
              className="w-full h-auto max-w-md animate-float"
            />
          </div>
        </div>
        {/* Optional down arrow to cue scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <span className="text-gray-400 animate-bounce mb-2" style={{ fontSize: 28 }}>▼</span>
          <span className="sr-only">Scroll down</span>
        </div>
      </section>

      {/* SLIDESHOW SECTION (DashboardCarousel) and PRICING now below, visible on scroll */}
      <section className="bg-white w-full pt-8 pb-4 font-sans border-t border-gray-100">
        <div className="notion-page-container">
          {/* Dashboard Slideshow - appears when user scrolls below hero */}
          <div className="mb-12">
            {/* Removed inline in NotionHero, appears on scroll */}
            {/**@ts-ignore */}
            {require('./DashboardCarousel').default && (
              require('./DashboardCarousel').default()
            )}
          </div>
          {/* Pricing Section */}
          <div>
            <div className="text-center">
              <h2 className="notion-heading-2">
                Choose your puzzle pieces
              </h2>
              <p className="notion-paragraph max-w-2xl mx-auto mb-6">
                Simple, transparent pricing for building your perfect workspace.
              </p>
            </div>
            <PricingSection plans={defaultPricingPlans} showDetailedComparison={false} />
          </div>
        </div>
      </section>
    </>
  );
};

export default NotionHero;

