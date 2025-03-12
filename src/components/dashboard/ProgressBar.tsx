
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  className 
}) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Delay to allow animation
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [percentage]);

  // Determine color based on percentage
  const getColorClass = () => {
    if (percentage >= 75) return 'bg-status-complete';
    if (percentage >= 30) return 'bg-status-progress';
    return 'bg-status-incomplete';
  };

  // Calculate remaining steps (out of 7 total steps)
  const remainingSteps = Math.round((100 - percentage) / (100 / 7));

  return (
    <div className={cn(
      "w-full bg-secondary rounded-full overflow-hidden",
      className
    )}>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-2 flex">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className="flex-1 flex justify-center"
            >
              <div 
                className={cn(
                  "w-2.5 h-2.5 rounded-full z-10 transition-colors duration-300 -mt-0.25 border-2 border-white",
                  percentage >= (i + 1) * (100 / 7) ? 'bg-status-complete' : 'bg-gray-300'
                )}
              >
                {percentage >= (i + 1) * (100 / 7) && (
                  <Check size={10} className="text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div 
          className={cn(
            "h-2 progress-bar-animation",
            getColorClass()
          )}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="flex justify-between mt-4 text-sm text-muted-foreground">
        <span className="flex items-center">
          <span className={cn(
            "inline-block w-3 h-3 rounded-full mr-1.5",
            getColorClass()
          )}></span>
          {percentage}% مكتمل
        </span>
        <span>{remainingSteps} خطوات متبقية</span>
      </div>
    </div>
  );
};

export default ProgressBar;
