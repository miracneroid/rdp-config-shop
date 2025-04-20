
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-rdp-primary/5 to-white dark:from-rdp-dark dark:to-rdp-dark/90">
      {/* Unique mesh background pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-50"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-rdp-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-rdp-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-8 px-4 py-2 text-sm bg-white/80 dark:bg-rdp-dark/80 backdrop-blur-sm border-rdp-primary/20 dark:border-rdp-primary/40">
            <span className="text-rdp-primary">New:</span>
            <span className="ml-2 text-rdp-gray-600 dark:text-rdp-gray-300">Instant RDP Deployment Available</span>
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
          <span className="bg-gradient-to-r from-rdp-primary via-rdp-secondary to-rdp-accent bg-clip-text text-transparent">
            In Minutes
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-rdp-gray-600 dark:text-rdp-gray-300 mb-12 max-w-3xl"
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
            <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-rdp-primary to-rdp-secondary hover:opacity-90 transition-opacity">
              Start Configuring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-rdp-primary/20 dark:border-rdp-primary/40 hover:bg-rdp-primary/5">
              View Pricing
            </Button>
          </Link>
        </motion.div>

        {/* Preview Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative w-full max-w-5xl mx-auto"
        >
          <div className="relative rounded-xl overflow-hidden border border-rdp-primary/20 dark:border-rdp-primary/40 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-rdp-primary/5 to-rdp-secondary/5"></div>
            <div className="bg-rdp-gray-800 h-8 flex items-center px-4">
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute -left-4 top-1/4 bg-white dark:bg-rdp-dark p-4 rounded-xl shadow-lg border border-rdp-primary/20 dark:border-rdp-primary/40 animate-float"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-rdp-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-rdp-gray-700 dark:text-rdp-gray-300">Server Status: Online</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -right-4 bottom-1/4 bg-white dark:bg-rdp-dark p-4 rounded-xl shadow-lg border border-rdp-primary/20 dark:border-rdp-primary/40 animate-float"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-rdp-gray-700 dark:text-rdp-gray-300">Ready to Connect</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
