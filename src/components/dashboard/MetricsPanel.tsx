
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
      label: 'التقدم الإجمالي',
      value: `${completionPercentage}% مكتمل`,
      bgColor: 'bg-blue-50',
      iconBgColor: 'bg-white',
      iconColor: 'text-blue-500'
    },
    {
      icon: ClockIcon,
      label: 'الوقت المتبقي',
      value: estimatedTime,
      bgColor: 'bg-purple-50',
      iconBgColor: 'bg-white',
      iconColor: 'text-purple-500'
    },
    {
      icon: CalendarIcon,
      label: 'الأيام المتبقية',
      value: `${daysRemaining} يوم`,
      bgColor: 'bg-green-50',
      iconBgColor: 'bg-white',
      iconColor: daysRemaining <= 5 ? 'text-status-incomplete' : 'text-green-500'
    },
    {
      icon: DollarSign,
      label: 'التكلفة المتبقية',
      value: estimatedCost || '0 دج',
      bgColor: 'bg-amber-50',
      iconBgColor: 'bg-white',
      iconColor: 'text-amber-500'
    }
  ];

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-card p-6 animate-fade-in",
      className
    )}>
      <h2 className="text-lg font-semibold mb-4 text-center">تقدم التسجيل</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className={cn(
              "rounded-lg p-3 flex items-center",
              metric.bgColor
            )}
          >
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center mr-3",
              metric.iconBgColor, "shadow-subtle",
              metric.iconColor
            )}>
              <metric.icon size={18} />
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
