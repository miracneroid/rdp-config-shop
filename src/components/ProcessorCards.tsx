
import { Server, BarChart, Clock } from 'lucide-react';

const stats = [
  { 
    icon: Server,
    value: '147k+',
    label: 'deployed servers'
  },
  { 
    icon: BarChart,
    value: '99.9%',
    label: 'uptime'
  },
  {
    icon: Clock,
    value: '5min',
    label: 'setup time'
  }
];

const ProcessorCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-notion border border-notion-border animate-fade-in flex items-center gap-4">
            <IconComponent className="w-6 h-6 text-blue-500 shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessorCards;
