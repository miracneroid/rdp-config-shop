
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      
      toast({
        title: "Order Placed",
        description: "Your RDP is being provisioned. You'll receive access details shortly.",
      });
      
      navigate('/');
    }, 2000);
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
  
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-rdp-dark sm:text-4xl">Your Cart</h1>
            <p className="mt-4 text-xl text-gray-500">
              Review your RDP configurations before checkout.
            </p>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-rdp-dark mb-4">Your cart is empty</h3>
              <p className="text-gray-500 mb-8">Looks like you haven't added any RDP configurations yet.</p>
              <Link to="/configure" className="rdp-btn-primary inline-flex items-center">
                <span>Configure Your RDP</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="rdp-card overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Configuration
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-rdp-dark">{item.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 space-y-1">
                              {Object.entries(item.configuration).map(([key, value]) => (
                                <div key={key} className="flex">
                                  <span className="font-medium w-24 inline-block capitalize">{key}:</span>
                                  <span>{formatDetail(key, value)}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-rdp-dark">
                              ${item.price}
                              {item.configuration.duration > 1 && (
                                <span className="text-gray-500 text-xs ml-1">
                                  ({item.configuration.duration} months)
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
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
                  <Link to="/configure" className="rdp-btn-secondary flex items-center mb-4 md:mb-0 justify-center">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    <span>Continue Shopping</span>
                  </Link>
                  <button 
                    onClick={clearCart}
                    className="text-gray-500 hover:text-red-500 flex items-center ml-0 md:ml-4 justify-center"
                  >
                    <Trash2 className="mr-2 h-5 w-5" />
                    <span>Clear Cart</span>
                  </button>
                </div>
                
                <div className="mt-8 md:mt-0">
                  <div className="text-right mb-4">
                    <span className="text-lg text-gray-600">Total:</span>
                    <span className="text-2xl font-bold text-rdp-dark ml-2">${getTotal()}</span>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="rdp-btn-primary w-full md:w-auto"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Proceed to Checkout"}
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
