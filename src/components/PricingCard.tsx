
import React from 'react';
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
  isSelected?: boolean;
}

const PricingCard = ({ plan, isSelected = false }: PricingCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { settings } = useSettings();
  
  const handleChoosePlan = () => {
    const cpuCores = parseInt(plan.cpu.split(' ')[0]) || 2;
    const ramGB = parseInt(plan.ram.split(' ')[0]) || 4;
    const storageGB = parseInt(plan.storage.split(' ')[0]) || 64;
    
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
        duration: 1
      }
    };
    
    addToCart(rdpItem);
    navigate('/cart');
  };
  
  return (
    <div 
      className={`rdp-card h-full p-8 flex flex-col transition-all duration-300 hover:scale-105 
        group hover:border-rdp-blue hover:shadow-lg hover:shadow-rdp-blue/20 min-h-[500px] w-full`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-rdp-blue text-white dark:bg-rdp-blue dark:text-white py-1 px-4 text-sm font-medium rounded-bl-lg rounded-tr-lg">
          Most Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-rdp-dark dark:text-white">{plan.name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-5xl font-bold text-rdp-dark dark:text-white">{settings.currency.symbol}{plan.price}</span>
        <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
      </div>
      
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
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
      
      <ul className="mt-8 space-y-4 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={handleChoosePlan}
        className="mt-8 w-full py-4 px-6 rounded-lg font-medium text-lg transition-all duration-300
          bg-white dark:bg-gray-800 text-rdp-dark dark:text-white 
          border border-gray-200 dark:border-gray-700 
          group-hover:bg-gray-100 group-hover:text-gray-700
          dark:group-hover:bg-gray-700 dark:group-hover:text-gray-100
          dark:hover:border-rdp-blue"
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
