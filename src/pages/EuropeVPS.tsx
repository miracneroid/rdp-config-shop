
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsBanner from '@/components/StatsBanner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Server, Shield, Globe, Zap, Clock, Check, MapPin } from 'lucide-react';
import PricingCard from '@/components/PricingCard';

const europePricingPlans = [
  {
    name: "EU Basic",
    price: 29,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "100 GB SSD",
    features: [
      "EU-Based Data Centers",
      "99.9% Uptime SLA",
      "24/7 Support",
      "Basic DDoS Protection",
      "GDPR Compliant"
    ]
  },
  {
    name: "EU Standard",
    price: 59,
    cpu: "4 Cores",
    ram: "8 GB",
    storage: "200 GB SSD",
    features: [
      "EU-Based Data Centers",
      "99.9% Uptime SLA",
      "24/7 Priority Support",
      "Enhanced DDoS Protection",
      "Daily Backups",
      "GDPR Compliant"
    ],
    popular: true
  },
  {
    name: "EU Premium",
    price: 99,
    cpu: "8 Cores",
    ram: "16 GB",
    storage: "400 GB SSD",
    features: [
      "EU-Based Data Centers",
      "99.99% Uptime SLA",
      "24/7 Priority Support",
      "Advanced DDoS Protection",
      "Hourly Backups",
      "Dedicated Resources",
      "GDPR Compliant"
    ]
  },
  {
    name: "EU Enterprise",
    price: 199,
    cpu: "16 Cores",
    ram: "32 GB",
    storage: "800 GB SSD",
    features: [
      "EU-Based Data Centers",
      "99.99% Uptime SLA",
      "24/7 Premium Support",
      "Enterprise DDoS Protection",
      "Continuous Backups",
      "Dedicated Resources",
      "Custom Configuration",
      "GDPR Compliant"
    ]
  }
];

const datacenterLocations = [
  { city: "Frankfurt", country: "Germany", region: "Central Europe", latency: "Low" },
  { city: "Amsterdam", country: "Netherlands", region: "Western Europe", latency: "Low" },
  { city: "Paris", country: "France", region: "Western Europe", latency: "Low" },
  { city: "London", country: "UK", region: "Northern Europe", latency: "Low" },
  { city: "Stockholm", country: "Sweden", region: "Northern Europe", latency: "Medium" },
  { city: "Milan", country: "Italy", region: "Southern Europe", latency: "Low" }
];

const EuropeVPS = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-rdp-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-rdp-dark dark:to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30 dark:opacity-10"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-64 h-64 bg-blue-300/30 dark:bg-blue-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-[5%] w-72 h-72 bg-indigo-300/30 dark:bg-indigo-700/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 inline-flex mx-auto text-rdp-blue border-rdp-blue w-fit px-3 py-1 bg-white/80 dark:bg-rdp-dark-light/50 backdrop-blur-sm">
              European Virtual Private Servers
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-5xl lg:text-6xl">
              Premium <span className="bg-gradient-to-r from-rdp-blue to-indigo-500 text-transparent bg-clip-text">Europe VPS</span> Solutions
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              High-performance, GDPR-compliant virtual servers optimized for European operations.
              Benefit from strategically located data centers across Europe.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/configure">
                <Button size="lg" className="bg-gradient-to-r from-rdp-blue to-rdp-purple rounded-xl px-8 py-6 hover:shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-1 transition-all duration-300">
                  Configure Your VPS
                </Button>
              </Link>
              <Link to="#eu-locations">
                <Button variant="outline" size="lg" className="rounded-xl px-8 py-6 border-indigo-200 dark:border-indigo-800/40">
                  View EU Locations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose EU-Based VPS */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">EU Advantage</Badge>
            <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">Why choose a Europe-based VPS?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our European virtual private servers offer unique advantages for businesses targeting EU markets and requiring GDPR compliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="neon-card p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center rounded-lg mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">GDPR Compliance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fully compliant with EU data protection regulations and privacy laws.
              </p>
            </div>
            
            <div className="neon-card p-6">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center rounded-lg mb-4">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">EU Network</h3>
              <p className="text-gray-600 dark:text-gray-400">
                High-speed connectivity across European networks with minimal latency.
              </p>
            </div>
            
            <div className="neon-card p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 flex items-center justify-center rounded-lg mb-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">EU-Based IP Address</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access EU-specific content and services with genuine European IP addresses.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* EU Datacenter Locations */}
      <section id="eu-locations" className="py-16 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">European Coverage</Badge>
            <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">Strategic EU Datacenter Locations</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our VPS servers are hosted in premium datacenters across Europe, providing optimal coverage and redundancy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {datacenterLocations.map((location, index) => (
              <div key={index} className="neon-card p-5 flex items-start">
                <div className="mr-4 mt-1">
                  <MapPin className="h-5 w-5 text-rdp-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-rdp-dark dark:text-white">{location.city}, {location.country}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{location.region}</p>
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
      
      {/* Pricing for EU VPS */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Pricing</Badge>
            <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">EU VPS Pricing Plans</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. All plans include GDPR compliance.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
            {europePricingPlans.map((plan, index) => (
              <div key={index}>
                <PricingCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features List */}
      <section className="py-16 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Features</Badge>
            <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">EU VPS Features</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              All of our EU-based VPS plans include these premium features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              "GDPR Compliance Built-in",
              "EU Network Infrastructure",
              "Advanced DDoS Protection",
              "24/7 European Support",
              "Full Root Access",
              "Choice of Operating System",
              "Automated Backups",
              "Free Migration Assistance",
              "Scalable Resources",
              "EU-based IP Addresses",
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
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to deploy your EU-based VPS?</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Get started in minutes with our simple configuration process. Full GDPR compliance included.
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

export default EuropeVPS;
