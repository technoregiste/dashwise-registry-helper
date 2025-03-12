
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatusBadge, { StatusType } from './StatusBadge';

interface StepCardProps {
  number: number;
  title: string;
  status: StatusType;
  description: string;
  onClick: () => void;
  error?: string;
  details?: any;
  className?: string;
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  status,
  description,
  onClick,
  error,
  details,
  className
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

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
      
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      {error && (
        <div className="mb-4 p-3 bg-status-incomplete/10 border border-status-incomplete/20 rounded-md text-sm text-status-incomplete">
          <strong>خطأ:</strong> {error}
        </div>
      )}

      {details && (
        <div className="mb-4">
          <button 
            onClick={toggleExpand}
            className="flex items-center text-sm text-primary font-medium hover:underline"
          >
            {expanded ? (
              <>
                <ChevronUp size={16} className="mr-1" />
                إخفاء التفاصيل
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" />
                عرض التفاصيل
              </>
            )}
          </button>
          
          {expanded && (
            <div className="mt-3 p-3 bg-secondary/50 rounded-md text-sm">
              {details.cost && (
                <div className="mb-2">
                  <span className="font-medium">التكلفة:</span> {details.cost}
                </div>
              )}
              
              {details.timeframe && (
                <div className="mb-2">
                  <span className="font-medium">الإطار الزمني:</span> {details.timeframe}
                </div>
              )}
              
              {details.requirements && (
                <div className="mb-2">
                  <span className="font-medium">المتطلبات:</span>
                  <ul className="list-disc list-inside mt-1 mr-2">
                    {details.requirements.map((req: string, i: number) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {details.options && (
                <div className="mb-2">
                  <span className="font-medium">الخيارات:</span>
                  <ul className="list-disc list-inside mt-1 mr-2">
                    {details.options.map((opt: string, i: number) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {details.documents && (
                <div className="mb-2">
                  <span className="font-medium">المستندات المطلوبة:</span>
                  <ul className="list-disc list-inside mt-1 mr-2">
                    {details.documents.map((doc: string, i: number) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {details.authorities && (
                <div className="mb-2">
                  <span className="font-medium">الجهات الرسمية:</span>
                  <ul className="list-disc list-inside mt-1 mr-2">
                    {details.authorities.map((auth: string, i: number) => (
                      <li key={i}>{auth}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
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
        {status === 'complete' ? 'عرض التفاصيل' : 'إكمال الخطوة'}
        <ArrowRight size={16} className="mr-1.5" />
      </button>
    </div>
  );
};

export default StepCard;
