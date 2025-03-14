
import React from 'react';
import { cn } from '@/lib/utils';
import StatusBadge, { StatusType } from './StatusBadge';

interface StepCardHeaderProps {
  number: number;
  title: string;
  status: StatusType;
}

const StepCardHeader: React.FC<StepCardHeaderProps> = ({ number, title, status }) => {
  return (
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
  );
};

export default StepCardHeader;
