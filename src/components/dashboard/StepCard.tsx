
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatusBadge, { StatusType } from './StatusBadge';

interface Document {
  id: string;
  name: string;
  checked: boolean;
}

interface StepCardProps {
  number: number;
  title: string;
  status: StatusType;
  description: string;
  onClick: () => void;
  error?: string;
  details?: {
    cost?: string;
    timeframe?: string;
    requirements?: string[];
    options?: string[];
    documents?: Document[];
    steps?: string[];
    authorities?: string[];
    [key: string]: any;
  };
  onDocumentToggle?: (stepId: number, docId: string, checked: boolean) => void;
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
  onDocumentToggle,
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

  const getDocsProgress = () => {
    if (!details?.documents || details.documents.length === 0) return 0;
    const checkedDocs = details.documents.filter(doc => doc.checked).length;
    return Math.round((checkedDocs / details.documents.length) * 100);
  };

  const docsProgress = getDocsProgress();

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
            <div className="mt-3 p-3 bg-secondary/50 rounded-md text-sm space-y-3">
              {details.steps && (
                <div className="mb-2">
                  <span className="font-medium mb-1 block">الخطوات:</span>
                  <ol className="list-decimal list-inside mr-2 space-y-1">
                    {details.steps.map((step: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
              
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
              
              {details.documents && details.documents.length > 0 && (
                <div className="mb-2">
                  <span className="font-medium block mb-2">الوثائق المطلوبة:</span>
                  <div className="space-y-2 bg-white p-3 rounded-md border border-gray-200">
                    {details.documents.map((doc) => (
                      <label key={doc.id} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={doc.checked} 
                          onChange={(e) => handleDocumentToggle(e, doc.id)}
                          className="ml-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm">{doc.name}</span>
                      </label>
                    ))}
                    
                    {docsProgress > 0 && (
                      <div className="mt-3">
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full",
                              docsProgress === 100 ? "bg-status-complete" : "bg-status-progress"
                            )}
                            style={{ width: `${docsProgress}%` }}
                          />
                        </div>
                        <div className="text-xs text-right mt-1 text-muted-foreground">
                          {docsProgress}% مكتمل
                        </div>
                      </div>
                    )}
                  </div>
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
