
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingCart, ArrowRight, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { supabase } from "@/integrations/supabase/client";

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotal, updateQuantity } = useCart();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsCheckingAuth(false);
    };
    
    checkAuth();
  }, []);
  
  const formatCurrency = (amount: number) => {
    return `${settings.currency.symbol}${amount.toFixed(2)}`;
  };
  
  const handleCheckout = async () => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to continue with checkout.",
      });
      
      // Store current cart in localStorage to restore after login
      navigate('/login', { state: { redirectTo: '/checkout' } });
      return;
    }
    
    // If user is authenticated, go to checkout page
    navigate('/checkout');
  };
  
  const formatDetail = (key: string, value: any) => {
    switch(key) {
      case 'cpu':
        return `${value} Cores`;
      case 'ram':
        return `${value} GB`;
      case 'storage':
        return `${value} GB SSD`;
      case 'os':
        return value.split('-').map((word: string) => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      case 'region':
        const regions: {[key: string]: string} = {
          'us-east': 'US East (N. Virginia)',
          'us-west': 'US West (Oregon)',
          'eu-central': 'EU Central (Frankfurt)',
          'eu-west': 'EU West (Ireland)',
          'ap-south': 'Asia Pacific (Mumbai)',
          'ap-southeast': 'Asia Pacific (Singapore)',
          'ap-northeast': 'Asia Pacific (Tokyo)',
        };
        return regions[value] || value;
      case 'applications':
        if (value.length === 0) return 'None';
        const apps: {[key: string]: string} = {
          'office': 'Microsoft Office Suite',
          'adobe': 'Adobe Creative Cloud',
          'dev-tools': 'Development Tools',
          'db-server': 'Database Server',
          'web-server': 'Web Server',
          'antivirus': 'Enterprise Antivirus'
        };
        return value.map((app: string) => apps[app] || app).join(', ');
      case 'duration':
        return `${value} ${value === 1 ? 'Month' : 'Months'}`;
      default:
        return value;
    }
  };
  
  const handleIncreaseQuantity = (id: string) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = (id: string) => {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else {
      removeFromCart(id);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-4xl">Your Cart</h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              Review your RDP configurations before checkout.
            </p>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-rdp-dark dark:text-white mb-4">Your cart is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added any RDP configurations yet.</p>
              <Link to="/configure" className="rdp-btn-primary inline-flex items-center">
                <span>Configure Your RDP</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="rdp-card dark:bg-gray-800 dark:border-gray-700 overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Configuration
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Subtotal
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-rdp-dark dark:text-white">{item.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                              {Object.entries(item.configuration).map(([key, value]) => (
                                <div key={key} className="flex">
                                  <span className="font-medium w-24 inline-block capitalize">{key}:</span>
                                  <span>{formatDetail(key, value)}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end">
                              <button 
                                onClick={() => handleDecreaseQuantity(item.id)}
                                className="text-gray-500 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="mx-3 text-rdp-dark dark:text-white">{item.quantity}</span>
                              <button 
                                onClick={() => handleIncreaseQuantity(item.id)}
                                className="text-gray-500 dark:text-gray-400 hover:text-rdp-blue dark:hover:text-rdp-blue-light"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-rdp-dark dark:text-white">
                              {formatCurrency(item.price)}
                              {item.configuration.duration > 1 && (
                                <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">
                                  ({item.configuration.duration} months)
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-rdp-dark dark:text-white">
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex md:flex-row flex-col">
                  <Link to="/configure" className="rdp-btn-secondary dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 flex items-center mb-4 md:mb-0 justify-center">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    <span>Continue Shopping</span>
                  </Link>
                  <button 
                    onClick={clearCart}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center ml-0 md:ml-4 justify-center"
                  >
                    <Trash2 className="mr-2 h-5 w-5" />
                    <span>Clear Cart</span>
                  </button>
                </div>
                
                <div className="mt-8 md:mt-0">
                  <div className="text-right mb-4">
                    <span className="text-lg text-gray-600 dark:text-gray-300">Total:</span>
                    <span className="text-2xl font-bold text-rdp-dark dark:text-white ml-2">
                      {formatCurrency(getTotal())}
                    </span>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="rdp-btn-primary w-full md:w-auto"
                    disabled={isProcessing || isCheckingAuth}
                  >
                    {isProcessing ? "Processing..." : isCheckingAuth ? "Loading..." : "Proceed to Checkout"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
