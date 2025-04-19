
import { ArrowRight, Server, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-rdp-dark dark:to-black py-16 sm:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30 dark:opacity-10"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-72 h-72 bg-indigo-300/30 dark:bg-indigo-700/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-[20%] w-40 h-40 bg-cyan-300/20 dark:bg-cyan-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left flex flex-col justify-center">
            <Badge variant="outline" className="mb-4 md:ml-0 inline-flex mx-auto lg:mx-0 text-rdp-blue border-rdp-blue w-fit px-3 py-1 bg-white/80 dark:bg-rdp-dark-light/50 backdrop-blur-sm">
              Desktop on Demand
            </Badge>
            <h1>
              <span className="mt-2 block text-4xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-5xl xl:text-6xl">
                Custom RDP<br />
                <span className="bg-gradient-to-r from-rdp-blue to-rdp-purple text-transparent bg-clip-text">Made Simple</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Deploy secure, high-performance remote desktop environments 
              tailored to your exact specifications within minutes.
              Choose your performance tier, region, and software setup
              with our easy-to-use configuration system.
            </p>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
              <div className="bg-white/70 dark:bg-rdp-dark-light/50 backdrop-blur-sm p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/20 flex items-start">
                <div className="mr-3 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-rdp-blue dark:text-rdp-blue-light">
                  <Server className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-rdp-dark dark:text-white">High Performance</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SSD storage & powerful CPUs</p>
                </div>
              </div>
              
              <div className="bg-white/70 dark:bg-rdp-dark-light/50 backdrop-blur-sm p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/20 flex items-start">
                <div className="mr-3 bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-rdp-dark dark:text-white">Ultra Secure</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Enterprise-grade security</p>
                </div>
              </div>
              
              <div className="bg-white/70 dark:bg-rdp-dark-light/50 backdrop-blur-sm p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/20 flex items-start">
                <div className="mr-3 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-rdp-dark dark:text-white">Ready in 5 minutes</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Instant deployment</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4 sm:justify-center lg:justify-start">
              <Link to="/pricing" className="inline-flex items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-rdp-blue to-rdp-purple px-5 py-3 text-base font-medium text-white hover:shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-1 transition-all duration-300">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/faq" className="inline-flex items-center justify-center rounded-xl border border-indigo-200 dark:border-indigo-800/40 bg-white dark:bg-rdp-dark-light px-5 py-3 text-base font-medium text-rdp-dark dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative mt-12 sm:mx-auto lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full">
              <div className="relative">
                <div className="glowing-border">
                  <div className="neon-card overflow-hidden">
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
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-900/20 max-w-xs animate-float neon-card">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 relative">
                    <span className="absolute inset-0 w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></span>
                  </div>
                  <span className="text-sm font-semibold text-rdp-dark dark:text-white">Ready in 5 minutes</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Your RDP server is configured and ready for immediate access.
                </p>
              </div>

              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-900/20 animate-float neon-card" style={{ animationDelay: "0.5s" }}>
                <div className="text-center">
                  <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-rdp-blue to-rdp-purple bg-clip-text">100%</span>
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
