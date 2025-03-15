
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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

  // Calculate remaining steps (out of 7 total steps)
  const remainingSteps = Math.round((100 - percentage) / (100 / 7));

  return (
    <div className={cn(
      "w-full rounded-xl bg-secondary/50 p-4",
      className
    )}>
      <div className="text-center mb-3">
        <h3 className="text-lg font-semibold">تقدمك في عملية التسجيل</h3>
      </div>

      <div className="relative mt-2">
        <Progress value={width} className="h-3" />
        
        <div className="absolute top-0 left-0 w-full h-3 flex justify-between px-1">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-2.5 h-2.5 rounded-full z-10 transition-colors duration-300 -mt-0.25 border",
                percentage >= ((i + 1) * (100 / 7)) 
                  ? 'bg-primary border-white' 
                  : 'bg-gray-200 border-gray-100'
              )}
            >
              {percentage >= ((i + 1) * (100 / 7)) && (
                <Check size={8} className="text-white" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-4 text-sm text-muted-foreground">
        <span className="flex items-center">
          <span className={cn(
            "inline-block w-3 h-3 rounded-full mr-1.5",
            percentage >= 75 ? "bg-status-complete" : 
            percentage >= 30 ? "bg-status-progress" : 
            "bg-status-incomplete"
          )}></span>
          {percentage}% مكتمل
        </span>
        <span>{remainingSteps} خطوات متبقية</span>
      </div>
    </div>
  );
};

export default ProgressBar;
