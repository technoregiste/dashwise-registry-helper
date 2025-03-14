
import React from 'react';
import { cn } from '@/lib/utils';

interface StepProgressBarProps {
  progress: number;
  label?: string;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ progress, label }) => {
  if (progress <= 0) return null;
  
  return (
    <div className="mt-3">
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full",
            progress === 100 ? "bg-status-complete" : "bg-status-progress"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-right mt-1 text-muted-foreground">
        {progress}% {label || 'مكتمل'}
      </div>
    </div>
  );
};

export default StepProgressBar;
