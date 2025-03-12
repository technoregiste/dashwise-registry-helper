
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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

  return (
    <div className={cn(
      "w-full h-2 bg-secondary rounded-full overflow-hidden",
      className
    )}>
      <div 
        className={cn(
          "h-full progress-bar-animation",
          getColorClass()
        )}
        style={{ width: `${width}%` }}
      />
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>{percentage}% مكتمل</span>
        <span>{Math.round((100 - percentage) / 16.67)} خطوات متبقية</span>
      </div>
    </div>
  );
};

export default ProgressBar;
