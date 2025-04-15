
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';

export interface PricingPlan {
  name: string;
  price: number;
  cpu: string;
  ram: string;
  storage: string;
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { settings } = useSettings();
  
  const handleChoosePlan = () => {
    // Extract numeric values for CPU cores and RAM
    const cpuCores = parseInt(plan.cpu.split(' ')[0]) || 2;
    const ramGB = parseInt(plan.ram.split(' ')[0]) || 4;
    const storageGB = parseInt(plan.storage.split(' ')[0]) || 64;
    
    // Create a configured RDP item based on the plan
    const rdpItem = {
      id: `plan-${plan.name.toLowerCase().replace(' ', '-')}`,
      name: `${plan.name} RDP`,
      price: plan.price,
      configuration: {
        cpu: cpuCores,
        ram: ramGB,
        storage: storageGB,
        os: "Windows 10 Pro",
        region: "India",
        applications: [],
        duration: 1 // 1 month duration
      }
    };
    
    // Add to cart and navigate to cart page
    addToCart(rdpItem);
    navigate('/cart');
  };
  
  return (
    <div 
      className={`rdp-card p-6 flex flex-col transition-all duration-300 hover:border-rdp-blue hover:shadow-lg relative
        ${plan.popular ? 'border-rdp-blue ring-2 ring-rdp-blue' : 'border-gray-200 dark:border-gray-700'}`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-rdp-blue text-white py-1 px-4 text-sm font-medium rounded-bl-lg rounded-tr-lg">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-bold text-rdp-dark dark:text-white">{plan.name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold text-rdp-dark dark:text-white">{settings.currency.symbol}{plan.price}</span>
        <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
      </div>
      
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">CPU</span>
            <span className="text-sm font-semibold text-rdp-dark dark:text-white">{plan.cpu}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">RAM</span>
            <span className="text-sm font-semibold text-rdp-dark dark:text-white">{plan.ram}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Storage</span>
            <span className="text-sm font-semibold text-rdp-dark dark:text-white">{plan.storage}</span>
          </div>
        </div>
      </div>
      
      <ul className="mt-6 space-y-3 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={handleChoosePlan}
        className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-all duration-300
          ${plan.popular 
            ? 'bg-rdp-blue text-white hover:bg-rdp-blue-light' 
            : 'bg-white dark:bg-gray-800 text-rdp-dark dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-rdp-blue hover:text-white hover:border-transparent'}`}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
