
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const SimpleFooter = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1">
            <div className="flex items-center">
              <img src="/lovable-uploads/ce82569c-c62b-488d-9d1d-7ac9fdbb14e6.png" alt="Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Puzzle RDP</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Fast & reliable Windows RDPs and Linux servers.
            </p>
            <div className="mt-4 flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full w-fit text-sm">
              <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
              <span>^100% All Systems Operational</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">PRODUCTS</h3>
            <ul className="space-y-3">
              <li><Link to="/windows" className="text-gray-500 hover:text-gray-900">Windows RDP</Link></li>
              <li><Link to="/linux" className="text-gray-500 hover:text-gray-900">Linux VPS</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              <li><Link to="/docs" className="text-gray-500 hover:text-gray-900">Documentation</Link></li>
              <li><Link to="/looking-glass" className="text-gray-500 hover:text-gray-900">Looking Glass</Link></li>
              <li><Link to="/api" className="text-gray-500 hover:text-gray-900">API</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-gray-900">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">USEFUL LINKS</h3>
            <ul className="space-y-3">
              <li><Link to="/usa-vps" className="text-gray-500 hover:text-gray-900">USA VPS</Link></li>
              <li><Link to="/europe-vps" className="text-gray-500 hover:text-gray-900">Europe VPS</Link></li>
              <li><Link to="/buy-rdp" className="text-gray-500 hover:text-gray-900">Buy RDP</Link></li>
              <li><Link to="/buy-vps" className="text-gray-500 hover:text-gray-900">Buy VPS</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li><Link to="/network" className="text-gray-500 hover:text-gray-900">Network</Link></li>
              <li><Link to="/status" className="text-gray-500 hover:text-gray-900">Service Status</Link></li>
              <li><Link to="/legal" className="text-gray-500 hover:text-gray-900">Legal</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/imprint" className="text-gray-500 hover:text-gray-900">Imprint</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-500">© 2025 Puzzle RDP</p>
            <div className="flex items-center">
              <img src="/lovable-uploads/ce82569c-c62b-488d-9d1d-7ac9fdbb14e6.png" alt="EU Flag" className="h-5 w-7" />
              <span className="ml-2 text-sm text-gray-500">Made in Europe</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-500">
                <Globe className="mr-2 h-4 w-4" />
                English
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Deutsch</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
