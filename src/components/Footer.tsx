
import { Link } from 'react-router-dom';
import { Monitor, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/90 dark:bg-rdp-dark/90 backdrop-blur-md border-t border-indigo-100 dark:border-indigo-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Description */}
        <div className="mb-12 pt-16">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rdp-blue to-rdp-purple text-white">
              <Monitor className="h-5 w-5" />
            </div>
            <h2 className="ml-3 text-xl font-bold gradient-text">RDP Config</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Fast & reliable Windows RDPs and Linux servers for professionals who demand excellence.
          </p>
          <div className="flex items-center mt-4 text-emerald-500 dark:text-emerald-400">
            <div className="status-dot status-active mr-2"></div>
            <span>100% All Systems Operational</span>
          </div>
          
          <div className="flex mt-6 space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-rdp-blue dark:text-gray-400 dark:hover:text-rdp-blue-light transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-rdp-blue dark:text-gray-400 dark:hover:text-rdp-blue-light transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-rdp-blue dark:text-gray-400 dark:hover:text-rdp-blue-light transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:contact@rdpconfig.com" className="text-gray-500 hover:text-rdp-blue dark:text-gray-400 dark:hover:text-rdp-blue-light transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Products Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-rdp-blue dark:text-rdp-blue-light mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/windows-rdp" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors flex items-center">
                  Windows RDP
                  {location.pathname === "/windows-rdp" && (
                    <Badge className="ml-2 bg-rdp-blue dark:bg-rdp-blue-light text-white text-xs">Current</Badge>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/linux-vps" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors flex items-center">
                  Linux VPS
                  {location.pathname === "/linux-vps" && (
                    <Badge className="ml-2 bg-rdp-blue dark:bg-rdp-blue-light text-white text-xs">Current</Badge>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/usa-vps" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors flex items-center">
                  USA VPS
                  {location.pathname === "/usa-vps" && (
                    <Badge className="ml-2 bg-rdp-blue dark:bg-rdp-blue-light text-white text-xs">Current</Badge>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/europe-vps" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors flex items-center">
                  Europe VPS
                  {location.pathname === "/europe-vps" && (
                    <Badge className="ml-2 bg-rdp-blue dark:bg-rdp-blue-light text-white text-xs">Current</Badge>
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-rdp-blue dark:text-rdp-blue-light mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors group">
                  Documentation
                  <ExternalLink className="inline-block ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/looking-glass" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors group">
                  Looking Glass
                  <ExternalLink className="inline-block ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors group">
                  API
                  <ExternalLink className="inline-block ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-rdp-blue dark:text-rdp-blue-light mb-4">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/usa-vps" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors flex items-center">
                  USA VPS
                  {location.pathname === "/usa-vps" && (
                    <Badge className="ml-2 bg-rdp-blue dark:bg-rdp-blue-light text-white text-xs">Current</Badge>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/europe-vps" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
                  Europe VPS
                </Link>
              </li>
              <li>
                <Link to="/buy-rdp" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
                  Buy RDP
                </Link>
              </li>
              <li>
                <Link to="/buy-vps" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
                  Buy VPS
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-rdp-blue dark:text-rdp-blue-light mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/network" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
                  Network
                </Link>
              </li>
              <li>
                <Link to="/service-status" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
                  Service Status
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
                  Legal
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/imprint" className="text-gray-600 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light transition-colors">
                  Imprint
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-indigo-100 dark:border-indigo-950/20">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © 2020-{currentYear} RDP Config - A Technology Solutions Company
          </p>
          <div className="flex items-center">
            <span className="text-rdp-blue dark:text-rdp-blue-light flex items-center bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">
              <img src="/lovable-uploads/3e5fc145-b08d-41e8-9e53-288c5cb07eb2.png" alt="EU Flag" className="w-5 h-4 mr-2" />
              Made in Europe
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
