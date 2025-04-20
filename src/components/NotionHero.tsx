
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const NotionHero = () => {
  return (
    <div className="bg-notion-background dark:bg-rdp-dark py-16 sm:py-24">
      <div className="notion-page-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center sm:text-left mb-12">
            <Badge variant="outline" className="mb-4 text-black dark:text-white border-black dark:border-white">
              Desktop on Demand
            </Badge>
            <h1 className="notion-heading-1 text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Custom RDP<br />
              <span className="text-black dark:text-white font-bold">Made Simple</span>
            </h1>
            <p className="notion-paragraph mt-6 max-w-2xl mx-auto sm:mx-0">
              Deploy secure, high-performance remote desktop environments 
              tailored to your exact specifications within minutes.
              Choose your performance tier, region, and software setup
              with our easy-to-use configuration system.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link to="/pricing" className="notion-button inline-flex items-center justify-center">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/faq" className="notion-button-outline inline-flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative mt-20">
            <div className="relative overflow-hidden rounded-lg shadow-notion-lg animate-fade-in">
              <div className="bg-white dark:bg-gray-800">
                <div className="bg-gray-100 dark:bg-gray-700 h-6 flex items-center px-4">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <img
                  className="w-full"
                  src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="RDP dashboard preview"
                />
              </div>
            </div>
            
            <div className="absolute -bottom-8 left-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-notion border border-notion-border dark:border-gray-700 max-w-xs animate-float">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-semibold text-notion-text dark:text-white">Ready in 5 minutes</span>
              </div>
              <p className="text-xs text-notion-text-light dark:text-gray-400">
                Your RDP server is configured and ready for immediate access.
              </p>
            </div>

            <div className="absolute -top-6 right-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-notion border border-notion-border dark:border-gray-700 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="text-center">
                <span className="text-3xl font-bold text-rdp-blue">100%</span>
                <p className="text-xs text-notion-text-light dark:text-gray-400">Uptime Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionHero;
