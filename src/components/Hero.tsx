
import { ArrowRight, LaptopIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-8 px-4 py-2 text-sm bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-800">
            <span className="text-rdp-blue dark:text-rdp-blue-light">New:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Instant RDP Deployment Available</span>
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-6 tracking-tight"
        >
          Deploy Your RDP
          <br />
          <span className="bg-gradient-to-r from-rdp-blue via-purple-500 to-rdp-purple text-transparent bg-clip-text">
            In Minutes
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl"
        >
          High-performance remote desktop environments with enterprise-grade security.
          Configure and deploy your RDP instance in just a few clicks.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/configure">
            <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-rdp-blue to-rdp-purple hover:opacity-90 transition-opacity">
              Start Configuring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
              View Pricing
            </Button>
          </Link>
        </motion.div>

        {/* Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative w-full max-w-5xl mx-auto"
        >
          <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-rdp-blue/10 to-rdp-purple/10 dark:from-rdp-blue/20 dark:to-rdp-purple/20"></div>
            <div className="bg-gray-800 h-8 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="RDP dashboard preview"
              className="w-full object-cover"
            />
          </div>
          
          {/* Floating Cards */}
          <div className="absolute -left-4 top-1/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-float">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Server Status: Online</span>
            </div>
          </div>
          
          <div className="absolute -right-4 bottom-1/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 animate-float" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-2">
              <LaptopIcon className="h-4 w-4 text-rdp-blue" />
              <span className="text-sm font-medium">Ready to Connect</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
