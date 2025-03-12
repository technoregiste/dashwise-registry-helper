
import React from 'react';
import { cn } from '@/lib/utils';
import { PercentIcon, ClockIcon, CalendarIcon, DollarSign } from 'lucide-react';

interface MetricsPanelProps {
  completionPercentage: number;
  estimatedTime: string;
  daysRemaining: number;
  estimatedCost?: string;
  className?: string;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({
  completionPercentage,
  estimatedTime,
  daysRemaining,
  estimatedCost,
  className
}) => {
  const metrics = [
    {
      icon: PercentIcon,
      label: 'Overall Progress',
      value: `${completionPercentage}% Complete`,
      color: 'text-status-progress'
    },
    {
      icon: ClockIcon,
      label: 'Estimated Time',
      value: estimatedTime,
      color: 'text-indigo-500'
    },
    {
      icon: CalendarIcon,
      label: 'Days Remaining',
      value: `${daysRemaining} Days`,
      color: daysRemaining <= 5 ? 'text-status-incomplete' : 'text-status-complete'
    }
  ];

  // Add estimated cost if provided
  if (estimatedCost) {
    metrics.push({
      icon: DollarSign,
      label: 'Estimated Cost',
      value: estimatedCost,
      color: 'text-amber-500'
    });
  }

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-card p-6 animate-fade-in",
      className
    )}>
      <h2 className="text-lg font-semibold mb-4">Registration Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-secondary/50 rounded-lg p-4 flex items-center"
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mr-3",
              "bg-white shadow-subtle",
              metric.color
            )}>
              <metric.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="font-medium">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsPanel;
