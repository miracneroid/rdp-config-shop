
import { Clock, Timer, CircleDollarSign } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <div className="w-full bg-white dark:bg-black/95 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-black dark:text-white">Results In </span>
          <span className="text-puzzle-blue">5 Minutes</span>
          <span className="text-gray-400">, Not 5 Days</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* With Puzzle */}
          <div className="bg-white dark:bg-black rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)] border border-gray-100 dark:border-white/10">
            <h3 className="text-2xl font-bold text-puzzle-blue mb-8">With Puzzle</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-black dark:text-white">
                <Timer className="w-5 h-5" />
                <span>3 - 5 Min</span>
              </div>
              <div className="flex items-center gap-4 text-black dark:text-white">
                <Clock className="w-5 h-5" />
                <span>4 Steps</span>
              </div>
              <div className="flex items-center gap-4 text-black dark:text-white">
                <CircleDollarSign className="w-5 h-5" />
                <span>Free</span>
              </div>
              <div className="bg-puzzle-blue/5 dark:bg-puzzle-blue/10 rounded-lg p-6">
                <div className="space-y-4">
                  <h4 className="text-black dark:text-white font-medium">Instant metrics and insights</h4>
                  <div className="bg-puzzle-blue/10 dark:bg-puzzle-blue/20 text-puzzle-blue text-sm px-3 py-1 rounded-full w-max">
                    Auto-generated results
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Without Puzzle */}
          <div className="bg-white dark:bg-black rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)] border border-gray-100 dark:border-white/10">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8">Without Puzzle</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <Timer className="w-5 h-5" />
                <span>5 Days</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5" />
                <span>15 Steps</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <CircleDollarSign className="w-5 h-5" />
                <span>$400 - $1500</span>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-6">
                <div className="space-y-4">
                  <h4 className="text-gray-600 dark:text-gray-400 font-medium">Manual process</h4>
                  <div className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 text-sm px-3 py-1 rounded-full w-max">
                    No automation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
