
import { Blocks } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const NotionHero = () => {
  return (
    <div className="bg-notion-background py-16 sm:py-24">
      <div className="notion-page-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center sm:text-left mb-12">
            <Badge variant="outline" className="mb-4 text-black border-black">
              RDP Simplified
            </Badge>
            <h1 className="notion-heading-1 text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Build your perfect<br />
              <span className="text-black font-bold">workspace puzzle</span>
            </h1>
            <p className="notion-paragraph mt-6 max-w-2xl mx-auto sm:mx-0">
              Connect the pieces of your ideal remote desktop environment.
              Choose your performance blocks, add your software components,
              and watch your perfect workspace come together.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link to="/configure" className="notion-button inline-flex items-center justify-center">
                <Blocks className="mr-2 h-5 w-5" />
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
                src="/lovable-uploads/a831c66a-d192-4fb2-a9a9-d7331e60b331.png"
                alt="RDP Workspace Preview"
                className="w-full h-auto"
              />
            </div>
            
            <div className="absolute -bottom-8 left-8 bg-white p-4 rounded-lg shadow-notion border border-notion-border max-w-xs animate-float">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-semibold">Instant Deployment</span>
              </div>
              <p className="text-xs text-notion-text-light">
                Your workspace is ready in minutes, not hours.
              </p>
            </div>

            <div className="absolute -top-6 right-8 bg-white p-4 rounded-lg shadow-notion border border-notion-border animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="text-center">
                <span className="text-3xl font-bold text-black">100%</span>
                <p className="text-xs text-notion-text-light">Customizable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionHero;
