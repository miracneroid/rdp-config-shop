import { Link } from 'react-router-dom';
import { Monitor } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Description */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Monitor className="h-8 w-8 text-white" />
            <h2 className="ml-3 text-xl font-bold">Quantum Servers</h2>
          </div>
          <p className="text-gray-400 max-w-md">
            Fast & reliable Windows RDPs and Linux servers.
          </p>
          <div className="flex items-center mt-4 text-[#00ff66]">
            <div className="w-2 h-2 rounded-full bg-[#00ff66] mr-2"></div>
            <span>100% All Systems Operational</span>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Products Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/windows-rdp" className="text-gray-400 hover:text-white transition-colors">
                  Windows RDP
                </Link>
              </li>
              <li>
                <Link to="/linux-vps" className="text-gray-400 hover:text-white transition-colors">
                  Linux VPS
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/looking-glass" className="text-gray-400 hover:text-white transition-colors">
                  Looking Glass
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-gray-400 hover:text-white transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/usa-vps" className="text-gray-400 hover:text-white transition-colors">
                  USA VPS
                </Link>
              </li>
              <li>
                <Link to="/europe-vps" className="text-gray-400 hover:text-white transition-colors">
                  Europe VPS
                </Link>
              </li>
              <li>
                <Link to="/buy-rdp" className="text-gray-400 hover:text-white transition-colors">
                  Buy RDP
                </Link>
              </li>
              <li>
                <Link to="/buy-vps" className="text-gray-400 hover:text-white transition-colors">
                  Buy VPS
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/network" className="text-gray-400 hover:text-white transition-colors">
                  Network
                </Link>
              </li>
              <li>
                <Link to="/service-status" className="text-gray-400 hover:text-white transition-colors">
                  Service Status
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-400 hover:text-white transition-colors">
                  Legal
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/imprint" className="text-gray-400 hover:text-white transition-colors">
                  Imprint
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2020-{currentYear} Quantum Servers - A Technology Solutions Company
          </p>
          <div className="flex items-center">
            <span className="text-[#0FA0CE] flex items-center">
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
