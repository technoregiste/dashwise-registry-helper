
import React from 'react';
import { Check, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatusType = 'complete' | 'progress' | 'incomplete';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = {
    complete: {
      icon: Check,
      bgColor: 'bg-status-complete/10',
      textColor: 'text-status-complete',
      borderColor: 'border-status-complete/30',
      label: 'Completed'
    },
    progress: {
      icon: Clock,
      bgColor: 'bg-status-progress/10',
      textColor: 'text-status-progress',
      borderColor: 'border-status-progress/30',
      label: 'In Progress'
    },
    incomplete: {
      icon: X,
      bgColor: 'bg-status-incomplete/10',
      textColor: 'text-status-incomplete',
      borderColor: 'border-status-incomplete/30',
      label: 'Incomplete'
    }
  };

  const { icon: Icon, bgColor, textColor, borderColor, label } = config[status];

  return (
    <div className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full border status-badge',
      bgColor,
      textColor,
      borderColor,
      className
    )}>
      <Icon size={14} className="mr-1" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
};

export default StatusBadge;
