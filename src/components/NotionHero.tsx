
import { Blocks, PuzzleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const NotionHero = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="notion-page-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center sm:text-left mb-12">
            <Badge variant="outline" className="mb-4 text-black border-black">
              Build Your Perfect RDP
            </Badge>
            <h1 className="text-[64px] font-bold leading-[1.1] tracking-[-0.02em] text-black">
              The happier<br />
              <span>workspace puzzle</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto sm:mx-0">
              Configure. Connect. Deploy. Put together your ideal remote desktop environment 
              with our easy-to-use building blocks.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link to="/configure" className="notion-button inline-flex items-center justify-center">
                <PuzzleIcon className="mr-2 h-5 w-5" />
                Start Building
              </Link>
              <Link to="/pricing" className="notion-button-outline inline-flex items-center justify-center">
                View Pricing
              </Link>
            </div>
          </div>
          
          <div className="relative mt-20">
            <div className="relative overflow-hidden rounded-lg shadow-notion-lg animate-fade-in">
              <img
                src="/lovable-uploads/e74400ca-7cb9-43c8-9512-6c417565b6b1.png"
                alt="RDP Workspace Illustration"
                className="w-full h-auto"
              />
            </div>
            
            <div className="absolute -bottom-8 left-8 bg-white p-4 rounded-lg shadow-notion border border-notion-border max-w-xs animate-float">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-semibold">Instant Setup</span>
              </div>
              <p className="text-xs text-gray-500">
                Your puzzle pieces come together in minutes.
              </p>
            </div>

            <div className="absolute -top-6 right-8 bg-white p-4 rounded-lg shadow-notion border border-notion-border animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="text-center">
                <span className="text-3xl font-bold text-black">100%</span>
                <p className="text-xs text-gray-500">Customizable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionHero;
