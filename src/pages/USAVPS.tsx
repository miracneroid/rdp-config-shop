
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsBanner from '@/components/StatsBanner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Server, Shield, Globe, Zap, Clock, Check, MapPin } from 'lucide-react';
import PricingCard from '@/components/PricingCard';

const usaPricingPlans = [
  {
    name: "US Basic",
    price: 35,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "100 GB SSD",
    features: [
      "US-Based Data Centers",
      "99.9% Uptime SLA",
      "24/7 Support",
      "Basic DDoS Protection"
    ]
  },
  {
    name: "US Standard",
    price: 69,
    cpu: "4 Cores",
    ram: "8 GB",
    storage: "200 GB SSD",
    features: [
      "US-Based Data Centers",
      "99.9% Uptime SLA",
      "24/7 Priority Support",
      "Enhanced DDoS Protection",
      "Daily Backups"
    ],
    popular: true
  },
  {
    name: "US Premium",
    price: 119,
    cpu: "8 Cores",
    ram: "16 GB",
    storage: "400 GB SSD",
    features: [
      "US-Based Data Centers",
      "99.99% Uptime SLA",
      "24/7 Priority Support",
      "Advanced DDoS Protection",
      "Hourly Backups",
      "Dedicated Resources"
    ]
  },
  {
    name: "US Enterprise",
    price: 229,
    cpu: "16 Cores",
    ram: "32 GB",
    storage: "800 GB SSD",
    features: [
      "US-Based Data Centers",
      "99.99% Uptime SLA",
      "24/7 Premium Support",
      "Enterprise DDoS Protection",
      "Continuous Backups",
      "Dedicated Resources",
      "Custom Configuration"
    ]
  }
];

const datacenterLocations = [
  { city: "New York", state: "NY", region: "East Coast", latency: "Low" },
  { city: "Chicago", state: "IL", region: "Midwest", latency: "Low" },
  { city: "Dallas", state: "TX", region: "South", latency: "Medium" },
  { city: "Los Angeles", state: "CA", region: "West Coast", latency: "Low" },
  { city: "Miami", state: "FL", region: "Southeast", latency: "Low" },
  { city: "Seattle", state: "WA", region: "Northwest", latency: "Medium" }
];

const USAVPS = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-rdp-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-rdp-dark dark:to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30 dark:opacity-10"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-64 h-64 bg-red-300/30 dark:bg-red-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-[5%] w-72 h-72 bg-blue-300/30 dark:bg-blue-700/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 inline-flex mx-auto text-rdp-blue border-rdp-blue w-fit px-3 py-1 bg-white/80 dark:bg-rdp-dark-light/50 backdrop-blur-sm">
              USA-Based Virtual Private Servers
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-5xl lg:text-6xl">
              Premium <span className="bg-gradient-to-r from-rdp-blue to-red-500 text-transparent bg-clip-text">USA VPS</span> Solutions
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              High-performance, low-latency virtual servers optimized for US-based traffic and applications.
              Benefit from strategically located data centers across the United States.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/configure">
                <Button size="lg" className="bg-gradient-to-r from-rdp-blue to-rdp-purple rounded-xl px-8 py-6 hover:shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-1 transition-all duration-300">
                  Configure Your VPS
                </Button>
              </Link>
              <Link to="#us-locations">
                <Button variant="outline" size="lg" className="rounded-xl px-8 py-6 border-indigo-200 dark:border-indigo-800/40">
                  View US Locations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose US-Based VPS */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">US Advantage</Badge>
            <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">Why choose a US-based VPS?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our US-based virtual private servers offer unique advantages for businesses and individuals targeting North American audiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="neon-card p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center rounded-lg mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">Low Latency</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Optimized for US-based traffic with minimal latency for North American users.
              </p>
            </div>
            
            <div className="neon-card p-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 flex items-center justify-center rounded-lg mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">Regulatory Compliance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Meets various US compliance requirements for businesses operating in regulated industries.
              </p>
            </div>
            
            <div className="neon-card p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 flex items-center justify-center rounded-lg mb-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">US-Based IP Address</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access US-specific content and services with genuine American IP addresses.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* US Datacenter Locations */}
      <section id="us-locations" className="py-16 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">National Coverage</Badge>
            <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">Strategic US Datacenter Locations</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our VPS servers are hosted in premium datacenters across the United States, providing optimal coverage and redundancy.
            </p>
          </div>
          
          <div className="relative mt-10 mb-8">
            <img 
              src="https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="USA Map" 
              className="w-full h-auto rounded-xl object-cover max-h-[400px]"
            />
            
            {/* Location Dots would go here with absolute positioning */}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {datacenterLocations.map((location, index) => (
              <div key={index} className="neon-card p-5 flex items-start">
                <div className="mr-4 mt-1">
                  <MapPin className="h-5 w-5 text-rdp-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-rdp-dark dark:text-white">{location.city}, {location.state}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{location.region} Region</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                      {location.latency} Latency
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing for US VPS */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Pricing</Badge>
            <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">US VPS Pricing Plans</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. Choose the plan that fits your needs and budget.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
            {usaPricingPlans.map((plan, index) => (
              <div key={index}>
                <PricingCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Comparison */}
      <section className="py-16 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Features</Badge>
            <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">US VPS Features</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              All of our US-based VPS plans include these premium features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              "Tier-1 US Network Connectivity",
              "99.9% Uptime Guarantee",
              "DDoS Protection",
              "24/7 Technical Support",
              "Full Root Access",
              "Choice of Operating System",
              "Automated Backups",
              "Free Migration Assistance",
              "Scalable Resources",
              "US-based IP Addresses",
              "Multiple Data Center Options",
              "Intuitive Control Panel"
            ].map((feature, index) => (
              <div key={index} className="flex items-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to deploy your US-based VPS?</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Get started in minutes with our simple configuration process. No technical expertise required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/configure">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl px-8">
                Configure Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10 rounded-xl px-8">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <StatsBanner />
      <Footer />
    </div>
  );
};

export default USAVPS;
