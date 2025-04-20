
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden bg-gradient-radial from-rdp-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-rdp-accent-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rdp-accent-cyan/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left flex flex-col justify-center">
            <Badge variant="outline" className="mb-4 md:ml-0 inline-flex mx-auto lg:mx-0 text-rdp-blue border-rdp-blue w-fit">
              Remote Desktop Platform
            </Badge>
            <h1>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900">Remote Desktop</span>
                <span className="block bg-gradient-to-r from-rdp-blue via-rdp-accent-purple to-rdp-accent-cyan bg-clip-text text-transparent">
                  Made Simple
                </span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Deploy secure, high-performance remote desktop environments tailored to your needs in minutes.
              Choose your specs, region, and software setup with our intuitive configuration system.
            </p>
            <div className="mt-8 flex gap-4 sm:justify-center lg:justify-start">
              <Link to="/configure" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-rdp-blue hover:bg-rdp-blue-dark transition-colors">
                Configure Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/demo" className="inline-flex items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                View Demo
              </Link>
            </div>
          </div>
          
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
            <div className="relative">
              {/* Dashboard Preview */}
              <div className="relative backdrop-blur-xl bg-white/50 border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                <div className="h-[480px]">
                  <div className="flex items-center border-b border-gray-200 bg-gray-50 p-2">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <img 
                    src="/placeholder.svg"
                    alt="RDP Dashboard"
                    className="w-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-semibold text-gray-900">99.9% Uptime</span>
                </div>
              </div>
              
              {/* Floating Features Card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                <div className="text-sm font-medium text-gray-900">Instant Setup</div>
                <p className="text-xs text-gray-500">Ready in 5 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
