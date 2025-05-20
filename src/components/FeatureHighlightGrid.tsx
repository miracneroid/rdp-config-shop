
import React from 'react';
import { Zap, ShieldCheck, Server, Globe, Settings, Cpu, HardDrive, LayoutList } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FeatureHighlightGridProps {
  planName?: string;
}

const FeatureHighlightGrid: React.FC<FeatureHighlightGridProps> = ({ planName = "Standard" }) => {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Background with blurred gradient elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-80 -right-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Main content container with dark backdrop */}
      <div className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Custom hexagon grid background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNTIuOC0zLjA3NSAxLjk1bC00LjI1IDcuMzVjLS41NTUgMS4xNS0uNTU1IDIuNSAwIDMuNjVsNC4yNSA3LjM1Yy41NTUgMS4xNSAxLjcxNSAxLjk1IDMuMDc1IDEuOTVoOC41YzEuMzYgMCAyLjUyLS44IDMuMDc1LTEuOTVsNC4yNS03LjM1Yy41NTUtMS4xNS41NTUtMi41IDAtMy42NWwtNC4yNS03LjM1Yy0uNTU1LTEuMTUtMS43MTUtMS45NS0zLjA3NS0xLjk1aC04LjV6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iI2ZmZiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xNS41IDE4Yy0xLjM2IDAtMi41Mi44LTMuMDc1IDEuOTVsLTQuMjUgNy4zNWMtLjU1NSAxLjE1LS41NTUgMi41IDAgMy42NWw0LjI1IDcuMzVjLjU1NSAxLjE1IDEuNzE1IDEuOTUgMy4wNzUgMS45NUgyNGMxLjM2IDAgMi41Mi0uOCAzLjA3NS0xLjk1bDQuMjUtNy4zNWMuNTU1LTEuMTUuNTU1LTIuNSAwLTMuNjVsLTQuMjUtNy4zNUMyNi41MiAxOC44IDI1LjM2IDE4IDI0IDE4aC04LjV6IiBzdHJva2Utb3BhY2l0eT0iLjEiIHN0cm9rZT0iI2ZmZiIgZmlsbD0ibm9uZSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Left Column: Takes 7/12 columns on large screens */}
            <div className="lg:col-span-7 animate-fade-in">
              <div className="space-y-8">
                {/* Main heading with innovative design */}
                <div className="relative">
                  <div className="absolute -top-14 -left-10 w-28 h-28 rounded-full bg-blue-600/10 filter blur-xl"></div>
                  <div className="relative inline-block">
                    <span className="inline-block text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-3">
                      Customized for Your Needs
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-3">
                      Tailor Your <span className="relative">
                        RDP <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500/50 rounded-full"></span>
                      </span> Experience
                    </h2>
                    <p className="text-xl text-blue-100/70 max-w-xl leading-relaxed">
                      Design your ideal Windows RDP server from scratch. Choose every detail and get a machine built exactly for your unique requirements.
                    </p>
                    
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-900/20 hover:border-blue-500/30 transition-all duration-300 group">
                        <div className="flex items-center mb-4">
                          <div className="mr-4 relative">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md transform group-hover:scale-125 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-lg">
                              <Cpu className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">Hardware Flexibility</h3>
                        </div>
                        <p className="text-blue-100/80 pl-16">Choose your exact CPU, RAM, and storage configurations to match your workload.</p>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-900/20 hover:border-blue-500/30 transition-all duration-300 group">
                        <div className="flex items-center mb-4">
                          <div className="mr-4 relative">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md transform group-hover:scale-125 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-lg">
                              <HardDrive className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">OS Selection</h3>
                        </div>
                        <p className="text-blue-100/80 pl-16">Select your preferred Windows version pre-installed and ready to go.</p>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-900/20 hover:border-blue-500/30 transition-all duration-300 group">
                        <div className="flex items-center mb-4">
                          <div className="mr-4 relative">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md transform group-hover:scale-125 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-lg">
                              <LayoutList className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">Software Suite</h3>
                        </div>
                        <p className="text-blue-100/80 pl-16">Add specialized software and applications pre-installed on your RDP.</p>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-900/20 hover:border-blue-500/30 transition-all duration-300 group">
                        <div className="flex items-center mb-4">
                          <div className="mr-4 relative">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md transform group-hover:scale-125 transition-all duration-300"></div>
                            <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-lg">
                              <Zap className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">Performance Tuning</h3>
                        </div>
                        <p className="text-blue-100/80 pl-16">Optimize for your specific workload and performance requirements.</p>
                      </div>
                    </div>

                    {/* Mobile Accordion (visible only on small screens) */}
                    <div className="block md:hidden mt-8">
                      <Accordion type="single" collapsible className="text-white border border-blue-900/30 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
                        <AccordionItem value="why-customize" className="border-blue-800/30">
                          <AccordionTrigger className="px-4 text-blue-100 hover:text-white">
                            Why customize your RDP?
                          </AccordionTrigger>
                          <AccordionContent className="px-4 text-blue-200">
                            A customized RDP server ensures you only pay for what you need while getting optimal performance for your specific use case.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
                
                {/* Call to action button with enhanced styling */}
                <div className="relative group mt-12">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-300"></div>
                  <Link to="/config-builder" className="relative block">
                    <Button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300 h-auto group-hover:shadow-blue-500/25">
                      Build Your Custom RDP
                      <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Column: Takes 5/12 columns on large screens */}
            <div className="lg:col-span-5 relative">
              {/* Floating decorative elements */}
              <div className="absolute top-10 -right-10 w-20 h-20 rounded-full bg-blue-500/10 filter blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 -left-10 w-16 h-16 rounded-full bg-indigo-500/10 filter blur-xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
              
              {/* 3D-like card with shine effect on hover */}
              <div className="relative bg-gradient-to-br from-blue-900/20 to-indigo-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl transform hover:-rotate-1 transition-all duration-500 overflow-hidden group">
                {/* Shine effect on hover */}
                <div className="absolute -inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shine"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Your Custom RDP</h3>
                    <div className="px-3 py-1 bg-blue-600/30 rounded-full text-blue-200 text-xs font-medium">
                      Personalized
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Cpu className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-blue-100">CPU Cores</span>
                      </div>
                      <div className="text-white font-medium bg-blue-500/20 px-3 py-1 rounded-full">
                        Choose Any
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Server className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-blue-100">RAM Memory</span>
                      </div>
                      <div className="text-white font-medium bg-blue-500/20 px-3 py-1 rounded-full">
                        Flexible
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center">
                        <HardDrive className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-blue-100">Storage</span>
                      </div>
                      <div className="text-white font-medium bg-blue-500/20 px-3 py-1 rounded-full">
                        Your Choice
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-blue-100">Location</span>
                      </div>
                      <div className="text-white font-medium bg-blue-500/20 px-3 py-1 rounded-full">
                        Global Options
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="h-1 w-full bg-gray-700/50 rounded-full">
                        <div className="h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full w-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlightGrid;
