import { PuzzleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import ProcessorCards from './ProcessorCards';
import DashboardCarousel from './DashboardCarousel';

const NotionHero = () => {
  return (
    <div className="bg-white w-full">
      <div className="notion-page-container py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="text-left">
              <Badge variant="outline" className="mb-4 text-black border-black">
                Build Your Perfect RDP
              </Badge>
              <h1 className="text-[64px] font-bold leading-[1.1] tracking-[-0.02em] text-black">
                The happier<br />
                <span>workspace puzzle</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 max-w-2xl">
                Configure. Connect. Deploy. Put together your ideal remote desktop environment 
                with our easy-to-use building blocks.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/configure" className="inline-flex items-center justify-center bg-[#e5e7eb] text-black px-6 py-2.5 rounded-md hover:bg-gray-200 transition-colors">
                  <PuzzleIcon className="mr-2 h-5 w-5" />
                  Start Building
                </Link>
                <Link to="/pricing" className="inline-flex items-center justify-center bg-[#e5e7eb] text-black px-6 py-2.5 rounded-md hover:bg-gray-200 transition-colors">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/8f2131b2-d7e7-42cb-bba7-d50ac84b91a2.png"
                alt="Puzzle RDP Logo"
                className="w-full h-auto animate-float"
              />
            </div>
          </div>

          <ProcessorCards />
          
          <DashboardCarousel />
          
          <div className="absolute -bottom-8 left-8 bg-white p-4 rounded-lg shadow-notion border border-notion-border max-w-xs animate-float">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-semibold">Instant Setup</span>
            </div>
            <p className="text-xs text-gray-500">
              Your puzzle pieces come together in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionHero;
