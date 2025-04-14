
import { CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
      className={`relative overflow-hidden rounded-2xl border ${
        plan.popular 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-gray-800 bg-gray-900/50'
      } p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105`}
    >
      {plan.popular && (
        <div className="absolute top-5 right-5">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
            Most Popular
          </span>
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
      <div className="mt-4 flex items-baseline text-white">
        <span className="text-4xl font-bold">{settings.currency.symbol}{plan.price}</span>
        <span className="ml-1 text-gray-400">/month</span>
      </div>
      
      <div className="mt-6 border-t border-gray-800 pt-6">
        <div className="space-y-4">
          <div className="flex items-center text-gray-300">
            <span className="text-sm font-medium w-20">CPU</span>
            <span className="text-sm font-semibold">{plan.cpu}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <span className="text-sm font-medium w-20">RAM</span>
            <span className="text-sm font-semibold">{plan.ram}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <span className="text-sm font-medium w-20">Storage</span>
            <span className="text-sm font-semibold">{plan.storage}</span>
          </div>
        </div>
      </div>
      
      <ul className="mt-6 space-y-3 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-300">
            <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mr-2" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={handleChoosePlan}
        className={`mt-8 w-full rounded-lg px-4 py-3 text-center font-medium transition-all duration-300 ${
          plan.popular 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
