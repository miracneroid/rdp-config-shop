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
    <div className={`bg-white rounded-xl p-8 flex flex-col h-full transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 ${isSelected ? 'ring-2 ring-[#4285f4]' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#4285f4] text-white text-sm font-medium px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      
      <div className="relative">
        <h3 className="text-2xl font-bold text-[#1e2537] mb-4">{plan.name}</h3>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-[#1e2537]">{settings.currency.symbol}{plan.price}</span>
          <span className="ml-1 text-gray-500">/month</span>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">CPU</span>
            <span className="font-medium text-[#1e2537]">{plan.cpu}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">RAM</span>
            <span className="font-medium text-[#1e2537]">{plan.ram}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Storage</span>
            <span className="font-medium text-[#1e2537]">{plan.storage}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-3 flex-grow">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-600 text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleChoosePlan}
        className="mt-8 w-full py-3 px-6 rounded-lg font-medium text-[#1e2537] bg-white border border-gray-200 
          hover:border-[#4285f4] hover:text-[#4285f4] transition-all duration-300"
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
