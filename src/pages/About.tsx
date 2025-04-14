import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Shield, Clock, Users, Monitor, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 w-full">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              About <span className="text-rdp-blue dark:text-rdp-blue-light">RDP Config</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Your trusted partner for secure, reliable, and high-performance Remote Desktop Protocol solutions. 
              We specialize in creating custom RDP environments tailored to your specific needs.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white dark:bg-gray-900 w-full">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Story</h2>
              <div className="prose dark:prose-invert max-w-none dark:text-gray-300">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Founded in 2020, RDP Config was born out of a simple observation: accessing reliable remote desktop infrastructure was unnecessarily complex and expensive for many businesses and individuals.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Our founders, with over 15 years of combined experience in cloud infrastructure and virtualization, set out to build a platform that makes RDP services accessible, affordable, and easy to use.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  What started as a small team working out of a shared office space has grown into a leading provider of Remote Desktop Protocol solutions serving thousands of customers worldwide. Our mission remains the same: to empower people to work from anywhere with secure, reliable remote access to computing resources.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Today, RDP Config continues to innovate in the remote desktop space, bringing enterprise-grade technology to businesses of all sizes while maintaining our commitment to security, performance, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800 w-full">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-rdp-blue dark:text-rdp-blue-light mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Secure by Design</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Enterprise-grade security with encryption, multi-factor authentication, and regular security updates to keep your data safe.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Server className="h-8 w-8 text-rdp-blue dark:text-rdp-blue-light mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">High Performance</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Powered by state-of-the-art data centers and optimized networking to provide smooth, lag-free remote desktop experiences.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Clock className="h-8 w-8 text-rdp-blue dark:text-rdp-blue-light mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">24/7 Availability</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Access your remote desktop from anywhere, anytime with our guaranteed 99.9% uptime SLA and round-the-clock technical support.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-rdp-blue dark:text-rdp-blue-light mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Expert Support</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Our team of certified professionals is available to help you with any issues or questions, ensuring a smooth experience.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Monitor className="h-8 w-8 text-rdp-blue dark:text-rdp-blue-light mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Custom Solutions</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  We offer tailored RDP configurations to match your specific needs, whether you're a freelancer, small business, or enterprise.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-8 w-8 text-rdp-blue dark:text-rdp-blue-light mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Easy Deployment</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Get up and running in minutes with our streamlined setup process and user-friendly management interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-rdp-blue text-white dark:bg-rdp-dark w-full">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Configure your custom RDP solution today and experience the difference of professional remote desktop services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/configure" className="bg-white text-rdp-blue font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                Configure Your RDP
              </Link>
              <Link to="/faq" className="bg-transparent border-2 border-white py-3 px-6 rounded-lg hover:bg-white/10 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
