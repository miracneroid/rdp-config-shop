
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="sm:text-center lg:text-left lg:col-span-6">
            <h1>
              <span className="block text-base font-semibold tracking-wide text-blue-500">
                Introducing RDP Config
              </span>
              <span className="mt-3 block text-5xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl xl:text-7xl">
                Your Cloud RDP
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  Made Simple
                </span>
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl max-w-xl">
              Deploy secure, high-performance remote desktop environments 
              with just a few clicks. Choose your specs, region, and start working in minutes.
            </p>
            <div className="mt-10 flex gap-4 sm:justify-center lg:justify-start">
              <Link 
                to="/configure" 
                className="group inline-flex items-center px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:translate-y-[-2px]"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about" 
                className="inline-flex items-center px-8 py-3 text-base font-medium rounded-lg text-gray-300 bg-gray-800/50 hover:bg-gray-800 hover:text-white transition-all duration-200 backdrop-blur-sm border border-gray-700"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
            <div className="relative mx-auto w-full rounded-lg shadow-xl lg:max-w-md">
              <div className="relative block w-full overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
                <AspectRatio ratio={16 / 9}>
                  <div className="animate-float p-8">
                    <div className="space-y-4">
                      <div className="h-2 w-3/4 rounded-full bg-gray-700/50"></div>
                      <div className="h-2 w-1/2 rounded-full bg-gray-700/50"></div>
                      <div className="h-24 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-gray-700/30"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gray-700/50"></div>
                        <div className="h-8 flex-1 rounded-lg bg-gray-700/50"></div>
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
