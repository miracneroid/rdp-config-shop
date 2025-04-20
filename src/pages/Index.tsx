import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ServiceOfferings from "@/components/ServiceOfferings";
import Footer from "@/components/Footer";
import StatsBanner from "@/components/StatsBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Cpu, Zap, Server, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const pricingPlans = [
  {
    name: 'Basic RDP',
    cpu: '2× Cores',
    ram: '4GB RAM',
    storage: '64GB NVMe',
    bandwidth: '1G',
    status: 'Available',
    price: 29,
  },
  {
    name: 'Standard RDP',
    cpu: '4× Cores',
    ram: '8GB RAM',
    storage: '128GB NVMe',
    bandwidth: '1G',
    status: 'Available',
    price: 59,
    popular: true,
  },
  {
    name: 'Premium RDP',
    cpu: '8× Cores',
    ram: '16GB RAM',
    storage: '256GB NVMe',
    bandwidth: '1G',
    status: 'Available',
    price: 99,
  },
  {
    name: 'Enterprise RDP',
    cpu: '16× Cores',
    ram: '32GB RAM',
    storage: '512GB NVMe',
    bandwidth: '1G',
    status: 'Available',
    price: 199,
  }
];

const stats = [
  { value: '147k+', label: 'deployed servers' },
  { value: '99.9%', label: 'uptime' },
  { value: '5min', label: 'setup time' }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 dark:from-gray-950 dark:to-black w-full">
      <Navbar />
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white">
                    <span className="block mb-2">100%</span>
                    <div className="bg-rdp-blue inline-block px-4 py-2 rounded-lg">
                      privacy
                    </div>
                    <span className="block mt-2">focused hosting</span>
                  </h1>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-gray-300 max-w-xl"
                >
                  Cloud provider backed by US-legislation and high quality
                  standards, with servers located in Phoenix 🇺🇸
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/configure">
                    <Button size="lg" className="bg-rdp-blue hover:bg-rdp-blue-light text-white">
                      Instant deployment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
                
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4"
                    >
                      <div className="font-bold text-xl sm:text-2xl text-white">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative w-full"
              >
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
                    alt="Digital Security"
                    className="w-full h-full object-cover opacity-40 absolute inset-0"
                  />
                  <div className="relative z-10">
                    <div className="bg-gray-900 h-8 flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-800">
                      <div className="flex items-center mb-6">
                        <Server className="h-6 w-6 text-rdp-blue mr-2" />
                        <span className="text-white font-medium">rdp.sh</span>
                        <span className="ml-auto px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          All services are up and running
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Active Servers</div>
                          <div className="flex items-center">
                            <span className="text-white font-bold text-xl">3</span>
                            <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                          </div>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Suspended</div>
                          <div className="text-white font-bold text-xl">1</div>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Pending</div>
                          <div className="text-white font-bold text-xl">0</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700/30 rounded-lg p-4">
                        <div className="text-gray-300 font-medium mb-4">Active Services</div>
                        <div className="space-y-3">
                          <div className="flex items-center p-2 bg-gray-700/50 rounded-md">
                            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                              <Server className="h-4 w-4 text-red-400" />
                            </div>
                            <div>
                              <div className="text-white text-sm">Standard-RDP</div>
                              <div className="text-gray-400 text-xs">4GB RAM, 4 Cores</div>
                            </div>
                            <div className="ml-auto text-green-400 text-xs">Active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Background gradient effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[30%] -left-[10%] w-[600px] h-[600px] bg-rdp-blue/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-3xl"></div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section 
          id="pricing" 
          className="py-16 bg-gray-900 dark:bg-black/40 border-t border-b border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">PRICING</Badge>
              <h2 className="text-3xl font-bold text-white mb-4">
                Choose Your Perfect Plan
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                High-performance Windows RDP servers with full admin access, instant setup, and 24/7 support
              </p>
            </div>

            {/* Server Location */}
            <div className="flex justify-center mb-12 space-x-4">
              <div className="bg-gray-800/80 rounded-lg px-6 py-3 shadow-sm border border-gray-700">
                <div className="flex items-center space-x-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-white font-medium">USA Server</span>
                  <span className="text-gray-400">(~50ms)</span>
                </div>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.name}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rdp-blue/20"
                >
                  <div className="p-6">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                        {plan.popular && (
                          <span className="px-2 py-1 text-xs font-medium text-rdp-blue bg-rdp-blue/10 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-white">${plan.price}</span>
                          <span className="ml-2 text-gray-400">/month</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center text-gray-300">
                          <span className="w-24 text-sm">CPU</span>
                          <span className="text-sm font-medium">{plan.cpu}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <span className="w-24 text-sm">RAM</span>
                          <span className="text-sm font-medium">{plan.ram}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <span className="w-24 text-sm">Storage</span>
                          <span className="text-sm font-medium">{plan.storage}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <span className="w-24 text-sm">Bandwidth</span>
                          <span className="text-sm font-medium">{plan.bandwidth}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-6">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm text-gray-400">{plan.status}</span>
                      </div>
                      
                      <Link to="/configure" className="mt-auto">
                        <Button 
                          className={`w-full ${
                            plan.popular 
                              ? "bg-rdp-blue hover:bg-rdp-blue-light text-white" 
                              : "border border-gray-600 text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          Purchase
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-gray-950 dark:bg-black/60 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold text-white">The most powerful RDP solution</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                Our Remote Desktop Protocol solutions are designed for performance, security, and reliability.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-900/30 flex items-center justify-center rounded-lg mb-4">
                  <Zap className="h-6 w-6 text-rdp-blue" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400">
                  Our servers are optimized for speed with the latest hardware and network infrastructure.
                </p>
              </div>
              
              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-900/30 flex items-center justify-center rounded-lg mb-4">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ultra Secure</h3>
                <p className="text-gray-400">
                  Enterprise-grade security protocols and encryption to keep your data safe.
                </p>
              </div>
              
              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-purple-900/30 flex items-center justify-center rounded-lg mb-4">
                  <Server className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">99.9% Uptime</h3>
                <p className="text-gray-400">
                  Reliable infrastructure with redundant systems and automatic failover.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/configure">
                <Button size="lg" className="bg-rdp-blue hover:bg-rdp-blue-light">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Setup Time Section */}
        <section className="py-16 bg-gray-900 dark:bg-black/60 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Fast Setup</Badge>
                <h2 className="text-3xl font-bold text-white">Ready in minutes, not hours</h2>
                <p className="mt-4 text-lg text-gray-400">
                  Our automated provisioning system gets your RDP environment up and running in just minutes after payment. 
                  No waiting for manual setup or approval.
                </p>
                
                <div className="mt-8 flex items-center space-x-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-rdp-blue mr-2" />
                    <span className="text-gray-300">5-10 minute setup</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Cpu className="h-5 w-5 text-rdp-blue mr-2" />
                    <span className="text-gray-300">Instant scaling</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/configure">
                    <Button size="lg" className="bg-rdp-blue hover:bg-rdp-blue-light">
                      Configure Your RDP
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="w-full h-64 md:h-80 bg-gray-800 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <div className="absolute inset-0">
                      <div className="bg-gray-900 h-8 flex items-center px-4">
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-6 p-4">
                        <Server className="h-6 w-6 text-rdp-blue mr-2" />
                        <span className="text-white font-medium">RDP Config</span>
                        <span className="ml-auto px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          All services are up and running
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Active Servers</div>
                          <div className="flex items-center">
                            <span className="text-white font-bold text-xl">3</span>
                            <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                          </div>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Suspended</div>
                          <div className="text-white font-bold text-xl">1</div>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Pending</div>
                          <div className="text-white font-bold text-xl">0</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700/30 rounded-lg p-4">
                        <div className="text-gray-300 font-medium mb-4">Active Services</div>
                        <div className="space-y-3">
                          <div className="flex items-center p-2 bg-gray-700/50 rounded-md">
                            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                              <Server className="h-4 w-4 text-red-400" />
                            </div>
                            <div>
                              <div className="text-white text-sm">Standard-RDP</div>
                              <div className="text-gray-400 text-xs">4GB RAM, 4 Cores</div>
                            </div>
                            <div className="ml-auto text-green-400 text-xs">Active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-gray-800 p-3 rounded-lg shadow-lg animate-bounce border border-gray-700">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-semibold text-white">Ready to use</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <ServiceOfferings />
      </main>
      
      <StatsBanner />
      <Footer />
    </div>
  );
};

export default Index;
