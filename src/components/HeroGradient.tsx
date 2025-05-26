
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Zap, Globe, Monitor, Clock, Users, CheckCircle } from 'lucide-react';

const HeroGradient: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Deploy in 5 minutes"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: "99.9% uptime guarantee"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      text: "Global data centers"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
    { number: "50+", label: "Locations" },
    { number: "10k+", label: "Customers" }
  ];

  const benefits = [
    {
      icon: <Monitor className="h-6 w-6 text-blue-600" />,
      title: "Windows & Linux",
      description: "Choose from Windows or Linux environments with full administrator access"
    },
    {
      icon: <Clock className="h-6 w-6 text-green-600" />,
      title: "Instant Deployment",
      description: "Get your RDP server up and running in under 5 minutes"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols for your data"
    },
    {
      icon: <Users className="h-6 w-6 text-orange-600" />,
      title: "Multi-User Support",
      description: "Support multiple concurrent users with role-based access"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 w-full">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              #1 Premium RDP Hosting Platform
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Professional{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Remote Desktop
              </span>
              <br />
              Solutions
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Deploy secure, high-performance RDP servers in minutes. Choose from Windows or Linux environments with enterprise-grade security and 24/7 support.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-6 justify-center mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="text-green-500">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/pricing" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2 text-lg font-semibold">
                <Sparkles className="h-5 w-5" />
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/pricing" className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-8 py-4 rounded-lg transition-all text-lg font-semibold">
                View Pricing
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="max-w-5xl mx-auto relative">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl">
              <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 p-3 px-4 border-b border-gray-200 dark:border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1"></div>
                <div className="flex gap-3 text-gray-500 dark:text-gray-400 text-xs">
                  <span>Puzzle RDP</span>
                  <span>Control Panel</span>
                  <span>Management</span>
                </div>
                <div className="flex-1"></div>
              </div>
              <img
                src="/lovable-uploads/dashboard-v3-dark-DkIL4YRw.webp"
                alt="Puzzle RDP Dashboard"
                className="w-full h-auto object-cover"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Puzzle RDP?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the power of professional remote desktop solutions with enterprise-grade features and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Everything you need for professional remote access
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Our platform provides all the tools and features you need to run your business remotely with confidence.
              </p>
              
              <div className="space-y-4">
                {[
                  "Full administrator access to your server",
                  "Choice of Windows or Linux operating systems",
                  "Automated daily backups included",
                  "24/7 technical support from experts",
                  "99.9% uptime SLA guarantee",
                  "Global data center locations"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/pricing" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all inline-flex items-center gap-2 font-semibold">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-900 dark:text-white">Server Status</span>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-semibold">Online</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">CPU Usage</span>
                    <span className="font-medium text-gray-900 dark:text-white">23%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Memory Usage</span>
                    <span className="font-medium text-gray-900 dark:text-white">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Storage</span>
                    <span className="font-medium text-gray-900 dark:text-white">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of professionals who trust Puzzle RDP for their remote desktop needs. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg transition-all font-semibold">
                Start Free Trial
              </Link>
              <Link to="/pricing" className="border border-white/30 hover:bg-white/10 px-8 py-4 rounded-lg transition-all font-semibold">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Trusted by thousands of professionals worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Enterprise Grade Security</div>
            <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">ISO 27001 Certified</div>
            <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">24/7 Expert Support</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroGradient;
