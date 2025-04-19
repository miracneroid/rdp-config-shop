import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 sm:py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 -translate-x-1/3 translate-y-1/4 transform">
          <div className="h-56 w-56 rounded-full bg-rdp-blue/10 blur-3xl"></div>
        </div>
        <div className="absolute inset-y-0 left-0 translate-x-1/4 -translate-y-1/4 transform">
          <div className="h-72 w-72 rounded-full bg-rdp-blue/20 blur-3xl"></div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left flex flex-col justify-center">
            <Badge variant="outline" className="mb-4 md:ml-0 inline-flex mx-auto lg:mx-0 text-rdp-blue border-rdp-blue w-fit">
              Desktop on Demand
            </Badge>
            <h1>
              <span className="mt-2 block text-4xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-5xl xl:text-6xl">
                Custom RDP<br />
                <span className="bg-gradient-to-r from-rdp-blue to-rdp-blue-light text-transparent bg-clip-text">Made Simple</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Deploy secure, high-performance remote desktop environments 
              tailored to your exact specifications within minutes.
              Choose your performance tier, region, and software setup
              with our easy-to-use configuration system.
            </p>
            <div className="mt-8 flex gap-4 sm:justify-center lg:justify-start">
              <Link to="/pricing" className="inline-flex items-center justify-center rounded-md border border-transparent bg-rdp-blue px-5 py-3 text-base font-medium text-white hover:bg-rdp-blue-light transition-colors">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/faq" className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-3 text-base font-medium text-rdp-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative mt-12 sm:mx-auto lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <div className="bg-white dark:bg-gray-800 overflow-hidden">
                  <div className="bg-gray-800 h-6 flex items-center px-4">
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
              
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs animate-float">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-semibold text-rdp-dark dark:text-white">Ready in 5 minutes</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Your RDP server is configured and ready for immediate access.
                </p>
              </div>

              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="text-center">
                  <span className="text-3xl font-bold text-rdp-blue">100%</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Uptime Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
