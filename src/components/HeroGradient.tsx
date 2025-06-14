
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Zap, Globe, Monitor, Clock, Users, CheckCircle, Star } from 'lucide-react';

const HeroGradient: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Deploy in minutes"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: "Enterprise security"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      text: "Global infrastructure"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime SLA" },
    { number: "24/7", label: "Expert Support" },
    { number: "50+", label: "Global Locations" },
    { number: "10,000+", label: "Active Users" }
  ];

  const benefits = [
    {
      icon: <Monitor className="h-6 w-6 text-blue-600" />,
      title: "Multi-Platform Support",
      description: "Windows Server and Linux environments with full administrative privileges and customizable configurations"
    },
    {
      icon: <Clock className="h-6 w-6 text-emerald-600" />,
      title: "Rapid Deployment",
      description: "Automated provisioning system delivers your RDP server infrastructure in under 5 minutes"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Enterprise Security",
      description: "Military-grade encryption, DDoS protection, and compliance with SOC 2 Type II standards"
    },
    {
      icon: <Users className="h-6 w-6 text-orange-600" />,
      title: "Team Collaboration",
      description: "Advanced user management with role-based access controls and collaborative workspaces"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-100 dark:border-blue-800">
              <Star className="h-4 w-4 fill-current" />
              Trusted by 10,000+ professionals worldwide
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
              Enterprise{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-transparent bg-clip-text">
                Remote Desktop
              </span>
              <br />
              Infrastructure
            </h1>

            {/* Professional Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Deploy secure, high-performance RDP servers with enterprise-grade infrastructure. 
              Trusted by Fortune 500 companies for mission-critical remote operations.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-8 justify-center mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Professional CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link to="/pricing" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/pricing" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 px-10 py-4 rounded-xl transition-all duration-300 text-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
                View Enterprise Plans
              </Link>
            </div>
          </div>

          {/* Professional Dashboard Preview */}
          <div className="max-w-6xl mx-auto relative">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm font-medium justify-center">
                    <span>Puzzle RDP</span>
                    <span>•</span>
                    <span>Enterprise Console</span>
                    <span>•</span>
                    <span>Management Portal</span>
                  </div>
                </div>
                <div className="w-16"></div>
              </div>
              <div className="relative">
                <img
                  src="/lovable-uploads/dashboard-v3-dark-DkIL4YRw.webp"
                  alt="Puzzle RDP Enterprise Dashboard"
                  className="w-full h-auto object-cover"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 font-mono">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
              Enterprise-Grade Remote Infrastructure
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Built for organizations that demand reliability, security, and performance at scale. 
              Our platform delivers the enterprise features you need with the simplicity you want.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                Everything your enterprise needs for secure remote operations
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                Our comprehensive platform provides enterprise-grade security, performance, and management tools 
                designed for organizations of all sizes.
              </p>
              
              <div className="space-y-6">
                {[
                  "Complete administrative access with custom configurations",
                  "Multi-platform support: Windows Server 2019/2022 and Ubuntu LTS",
                  "Automated daily backups with point-in-time recovery",
                  "24/7 expert support with 99.9% SLA guarantee",
                  "Enterprise security: SOC 2 Type II compliant infrastructure",
                  "Global edge locations for optimal performance"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link to="/pricing" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Explore Enterprise Features
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl">
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-gray-900 dark:text-white text-lg">System Status</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">Operational</span>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">CPU Utilization</span>
                      <span className="font-semibold text-gray-900 dark:text-white">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Memory Usage</span>
                      <span className="font-semibold text-gray-900 dark:text-white">34%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: '34%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Storage</span>
                      <span className="font-semibold text-gray-900 dark:text-white">52%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500" style={{ width: '52%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Network I/O</span>
                      <span className="font-semibold text-gray-900 dark:text-white">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
                Ready to transform your remote infrastructure?
              </h2>
              <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of enterprises who trust Puzzle RDP for their mission-critical remote desktop needs. 
                Start your free trial today and experience enterprise-grade performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/pricing" className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  Start Free Trial
                </Link>
                <Link to="/pricing" className="border-2 border-white/30 hover:bg-white/10 px-10 py-4 rounded-xl transition-all duration-300 font-bold text-lg">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Trust Section */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-60">
            <div className="text-gray-500 dark:text-gray-400 font-bold tracking-wide">SOC 2 TYPE II CERTIFIED</div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="text-gray-500 dark:text-gray-400 font-bold tracking-wide">ISO 27001 COMPLIANT</div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="text-gray-500 dark:text-gray-400 font-bold tracking-wide">GDPR READY</div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="text-gray-500 dark:text-gray-400 font-bold tracking-wide">24/7 EXPERT SUPPORT</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroGradient;
