
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import StepCardHeader from './StepCardHeader';
import ExpandButton from './ExpandButton';
import StepCardDetailsComponent from './StepCardDetails';
import { StepCardProps } from './StepCardTypes';

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  status,
  description,
  onClick,
  error,
  details,
  onDocumentToggle,
  onChecklistToggle,
  className
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleDocumentToggle = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    e.stopPropagation();
    if (onDocumentToggle) {
      onDocumentToggle(number, docId, e.target.checked);
    }
  };

  const handleChecklistToggle = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    e.stopPropagation();
    if (onChecklistToggle) {
      onChecklistToggle(number, itemId, e.target.checked);
    }
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
      <StepCardHeader number={number} title={title} status={status} />
      
      {/* Description - Light Blue */}
      <div className="bg-blue-50 p-3 rounded-lg mb-3">
        <h4 className="text-blue-700 font-medium text-sm mb-1">فقرة توضيحية</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-status-incomplete/10 border border-status-incomplete/20 rounded-md text-sm text-status-incomplete">
          <strong>خطأ:</strong> {error}
        </div>
      )}

      {details && (
        <div className="mb-4">
          <ExpandButton expanded={expanded} onClick={toggleExpand} />
          
          {expanded && (
            <StepCardDetailsComponent 
              details={details}
              onDocumentToggle={handleDocumentToggle}
              onChecklistToggle={handleChecklistToggle}
            />
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
