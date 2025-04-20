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
  selected?: boolean;
  onClick?: () => void;
}

const PricingCard = ({ plan, selected = false, onClick }: PricingCardProps) => {
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
      onClick={onClick}
      className={`
        bg-white rounded-xl p-8 flex flex-col h-full transition-all duration-300 
        shadow-sm hover:shadow-xl border border-transparent
        ${selected 
          ? 'border-blue-500 ring-2 ring-blue-300' 
          : 'hover:border-blue-500 hover:ring-1 hover:ring-blue-300'}
        group relative cursor-pointer
      `}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-[#4285f4] text-white text-sm font-medium px-4 py-1 rounded-tr-xl rounded-bl-xl">
          Most Popular
        </div>
      )}

      <div className="relative">
        <h3 className="text-2xl font-bold text-[#1e2537] mb-4">{plan.name}</h3>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-[#1e2537]">
            {settings.currency.symbol}{plan.price}
          </span>
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
            <span className="text-gray-600 text-sm truncate">{feature}</span>
          </div>
        ))}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleChoosePlan();
        }}
        className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-all duration-300
          ${selected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white text-[#1e2537] border border-gray-200 group-hover:border-blue-500 group-hover:text-blue-600 hover:bg-gray-50'
          }`}
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
