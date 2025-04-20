
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
      className={`relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 
        dark:border-gray-700 p-8 flex flex-col transition-all duration-300 
        group hover:border-rdp-blue hover:shadow-xl hover:shadow-rdp-blue/10 
        min-h-[600px] w-full`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rdp-blue text-white 
          py-1 px-4 text-sm font-medium rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-rdp-dark dark:text-white mt-4">{plan.name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-5xl font-bold text-rdp-dark dark:text-white">
          {settings.currency.symbol}{plan.price}
        </span>
        <span className="ml-2 text-gray-500 dark:text-gray-400">/month</span>
      </div>
      
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">CPU</span>
          <span className="text-sm font-semibold text-rdp-dark dark:text-white">{plan.cpu}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">RAM</span>
          <span className="text-sm font-semibold text-rdp-dark dark:text-white">{plan.ram}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Storage</span>
          <span className="text-sm font-semibold text-rdp-dark dark:text-white">{plan.storage}</span>
        </div>
      </div>
      
      <div className="mt-8 flex-grow">
        <ul className="space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <button 
        onClick={handleChoosePlan}
        className="mt-8 w-full py-4 px-6 rounded-lg text-base font-medium 
          bg-white dark:bg-gray-800 text-rdp-dark dark:text-white 
          border border-gray-200 dark:border-gray-700 
          transition-all duration-300
          group-hover:bg-rdp-blue group-hover:border-rdp-blue 
          group-hover:text-white dark:group-hover:bg-rdp-blue 
          dark:group-hover:border-rdp-blue"
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
