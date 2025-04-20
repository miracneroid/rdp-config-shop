
import { Cpu } from 'lucide-react';

const processors = [
  { name: 'Basic', cores: '2 Cores' },
  { name: 'Standard', cores: '4 Cores' },
  { name: 'Premium', cores: '8 Cores' },
  { name: 'Enterprise', cores: '16 Cores' }
];

const ProcessorCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {processors.map((processor) => (
        <div key={processor.name} className="bg-white p-4 rounded-lg shadow-notion border border-notion-border animate-fade-in">
          <div className="flex items-center justify-center mb-2">
            <Cpu className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-center">{processor.name}</h3>
          <p className="text-sm text-gray-600 text-center">{processor.cores}</p>
        </div>
      ))}
    </div>
  );
};

export default ProcessorCards;
