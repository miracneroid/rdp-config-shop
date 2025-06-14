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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 w-full relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg0MFY0MEgwVjBaIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPgo=')] opacity-30"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
              <Sparkles className="h-4 w-4" />
              #1 BEST ENTERPRISE RDP SOLUTION
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Revolutionize Your{" "}
              <span className="bg-gradient-to-r from-purple-200 via-white to-purple-200 text-transparent bg-clip-text">
                Remote Desktop
              </span>
            </h1>

            {/* Professional Subheadline */}
            <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Empowering you to work smarter, not harder, with cutting-edge RDP solutions 
              tailored for enhanced productivity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link to="/pricing" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <Sparkles className="h-5 w-5" />
                Get Started Now
              </Link>
              <Link to="/pricing" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 rounded-full transition-all duration-300 text-lg font-semibold border border-white/20 hover:border-white/30">
                Explore Free
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="max-w-6xl mx-auto relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between bg-black/60 backdrop-blur-sm p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Monitor className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Puzzle RDP</h3>
                    <p className="text-purple-200 text-sm">Enterprise Console</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-purple-200 text-sm">
                  <span className="border-b-2 border-purple-400 text-white pb-1">Dashboard</span>
                  <span className="hover:text-white transition-colors cursor-pointer">Analytics</span>
                  <span className="hover:text-white transition-colors cursor-pointer">Servers</span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-8 bg-gradient-to-br from-black/60 to-purple-900/20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Chart Area */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-white text-lg font-semibold">Server Performance</h4>
                        <div className="text-purple-200 text-sm">May 2023</div>
                      </div>
                      <div className="text-white text-3xl font-bold mb-2">20,342,952</div>
                      <div className="text-purple-200 text-sm mb-6">Total requests this month</div>
                      
                      {/* Simulated Chart */}
                      <div className="h-40 relative">
                        <svg className="w-full h-full" viewBox="0 0 400 160">
                          <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8"/>
                              <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.1"/>
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 120 Q 50 100 100 110 T 200 100 T 300 90 T 400 80"
                            stroke="rgb(168, 85, 247)"
                            strokeWidth="3"
                            fill="none"
                          />
                          <path
                            d="M 0 120 Q 50 100 100 110 T 200 100 T 300 90 T 400 80 L 400 160 L 0 160 Z"
                            fill="url(#chartGradient)"
                          />
                          <circle cx="200" cy="100" r="4" fill="white"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Stats Sidebar */}
                  <div className="space-y-6">
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <h4 className="text-white text-lg font-semibold mb-4">Active Users</h4>
                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="rgb(75, 85, 99)"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="rgb(168, 85, 247)"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray="251.2"
                              strokeDashoffset="62.8"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">4,612</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <h4 className="text-white text-lg font-semibold mb-4">System Status</h4>
                      <div className="space-y-4">
                        {[
                          { label: "CPU", value: "18%", color: "bg-blue-500" },
                          { label: "Memory", value: "34%", color: "bg-purple-500" },
                          { label: "Storage", value: "52%", color: "bg-orange-500" },
                        ].map((metric, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-200">{metric.label}</span>
                              <span className="text-white font-medium">{metric.value}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className={`${metric.color} h-2 rounded-full transition-all duration-500`} 
                                style={{ width: metric.value }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Stats Section */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-3 font-mono">
                  {stat.number}
                </div>
                <div className="text-purple-200 font-medium text-lg">
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
              Enterprise-Grade Remote Infrastructure
            </h2>
            <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Built for organizations that demand reliability, security, and performance at scale. 
              Our platform delivers the enterprise features you need with the simplicity you want.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-black/40 transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-purple-200 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
                Everything your enterprise needs for secure remote operations
              </h2>
              <p className="text-xl text-purple-100 mb-12 leading-relaxed">
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
                    <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-purple-100 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link to="/pricing" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Explore Enterprise Features
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm p-10 rounded-3xl border border-white/10 shadow-2xl">
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-emerald-500/20 rounded-2xl border border-emerald-400/30">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-white text-lg">System Status</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-lg">Operational</span>
                </div>
                
                <div className="space-y-6">
                  {[
                    { label: "CPU Utilization", value: "18%", color: "from-blue-500 to-blue-600" },
                    { label: "Memory Usage", value: "34%", color: "from-purple-500 to-purple-600" },
                    { label: "Storage", value: "52%", color: "from-orange-500 to-orange-600" },
                    { label: "Network I/O", value: "12%", color: "from-emerald-500 to-emerald-600" }
                  ].map((metric, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200 font-medium">{metric.label}</span>
                        <span className="font-semibold text-white">{metric.value}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div className={`bg-gradient-to-r ${metric.color} h-3 rounded-full transition-all duration-500`} style={{ width: metric.value }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 rounded-3xl p-16 text-center text-white relative overflow-hidden">
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
                <Link to="/pricing" className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
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
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-purple-200 mb-8 text-lg">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-60">
            <div className="text-purple-200 font-bold tracking-wide">SOC 2 TYPE II CERTIFIED</div>
            <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
            <div className="text-purple-200 font-bold tracking-wide">ISO 27001 COMPLIANT</div>
            <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
            <div className="text-purple-200 font-bold tracking-wide">GDPR READY</div>
            <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
            <div className="text-purple-200 font-bold tracking-wide">24/7 EXPERT SUPPORT</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroGradient;
