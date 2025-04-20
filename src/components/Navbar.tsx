
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-gaming-dark/80 backdrop-blur-md border-b border-gaming-accent">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-gaming-blue to-gaming-purple bg-clip-text text-transparent">
              Trade
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gaming-blue transition-colors">
              Home
            </Link>
            <Link to="/trade" className="text-white hover:text-gaming-blue transition-colors">
              Trade
            </Link>
            <Link to="/market" className="text-white hover:text-gaming-blue transition-colors">
              Market
            </Link>
            <Link to="/help" className="text-white hover:text-gaming-blue transition-colors">
              Help
            </Link>
            
            <Button className="bg-gaming-blue hover:bg-gaming-blue/90">
              Connect Wallet
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gaming-darker border-t border-gaming-accent">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-white hover:bg-gaming-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/trade"
              className="block px-3 py-2 text-white hover:bg-gaming-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Trade
            </Link>
            <Link
              to="/market"
              className="block px-3 py-2 text-white hover:bg-gaming-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Market
            </Link>
            <Link
              to="/help"
              className="block px-3 py-2 text-white hover:bg-gaming-accent rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
