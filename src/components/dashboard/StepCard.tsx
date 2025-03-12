
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatusBadge, { StatusType } from './StatusBadge';

interface StepCardProps {
  number: number;
  title: string;
  status: StatusType;
  description: string;
  onClick: () => void;
  error?: string;
  className?: string;
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  status,
  description,
  onClick,
  error,
  className
}) => {
  return (
    <div 
      className={cn(
        "step-card p-5 rounded-xl bg-white border shadow-card",
        "flex flex-col h-full",
        status === 'complete' ? "border-status-complete/20" : 
        status === 'progress' ? "border-status-progress/20" : 
        "border-gray-200",
        className
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium",
            status === 'complete' ? "bg-status-complete text-white" :
            status === 'progress' ? "bg-status-progress text-white" :
            "bg-gray-100 text-gray-500"
          )}>
            {number}
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
      
      {error && (
        <div className="mb-4 p-3 bg-status-incomplete/10 border border-status-incomplete/20 rounded-md text-sm text-status-incomplete">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <button 
        onClick={onClick}
        className={cn(
          "w-full py-2.5 rounded-md font-medium flex items-center justify-center transition-all button-hover mt-auto",
          status === 'complete' 
            ? "bg-status-complete/10 text-status-complete hover:bg-status-complete/20" 
            : status === 'progress'
              ? "bg-status-progress text-white hover:bg-status-progress/90"
              : "bg-secondary text-foreground hover:bg-secondary/80"
        )}
      >
        {status === 'complete' ? 'View Details' : 'Complete Step'}
        <ArrowRight size={16} className="ml-1.5" />
      </button>
    </div>
  );
};

export default StepCard;
