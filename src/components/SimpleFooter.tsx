
import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor } from 'lucide-react';

const SimpleFooter = () => {
  return (
    <footer className="bg-black pt-16 pb-8 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Monitor className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold text-white font-mono">RDP Config</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Deploy Windows RDP and Linux VPS servers with a few clicks.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="/docs" className="text-gray-400 hover:text-white">Documentation</Link></li>
              <li><Link to="/status" className="text-gray-400 hover:text-white">Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
              <li><Link to="/sla" className="text-gray-400 hover:text-white">SLA</Link></li>
              <li><Link to="/imprint" className="text-gray-400 hover:text-white">Imprint</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RDP Config. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-gray-400 hover:text-white">Twitter</Link>
            <Link to="#" className="text-gray-400 hover:text-white">LinkedIn</Link>
            <Link to="#" className="text-gray-400 hover:text-white">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
