
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatusBadge, { StatusType } from './StatusBadge';

interface Document {
  id: string;
  name: string;
  checked: boolean;
}

interface ChecklistItem {
  id: string;
  text: string;
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
    checklistItems?: ChecklistItem[];
    notes?: string[];
    [key: string]: any;
  };
  onDocumentToggle?: (stepId: number, docId: string, checked: boolean) => void;
  onChecklistToggle?: (stepId: number, itemId: string, checked: boolean) => void;
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

  const getDocsProgress = () => {
    if (!details?.documents || details.documents.length === 0) return 0;
    const checkedDocs = details.documents.filter(doc => doc.checked).length;
    return Math.round((checkedDocs / details.documents.length) * 100);
  };

  const getChecklistProgress = () => {
    if (!details?.checklistItems || details.checklistItems.length === 0) return 0;
    const checkedItems = details.checklistItems.filter(item => item.checked).length;
    return Math.round((checkedItems / details.checklistItems.length) * 100);
  };

  const docsProgress = getDocsProgress();
  const checklistProgress = getChecklistProgress();

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
      
      {/* Section 1: Description - Light Blue */}
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
            <div className="mt-3 space-y-3">
              {/* Section 2: Steps - Light Green */}
              {details.steps && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="text-green-700 font-medium text-sm mb-2">الخطوات التفصيلية</h4>
                  <ol className="list-none mr-0 space-y-1.5">
                    {details.steps.map((step: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-flex justify-center items-center bg-green-200 text-green-800 w-6 h-6 rounded-full text-xs ml-2">
                          {i+1}
                        </span>
                        <span className="text-sm text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              
              {/* Section 3: Costs - Light Orange */}
              {details.cost && (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="text-orange-700 font-medium text-sm mb-1">التكاليف</h4>
                  <div className="flex items-center">
                    <span className="text-xl text-orange-600 ml-2">💰</span>
                    <span className="text-sm text-gray-700">{details.cost}</span>
                  </div>
                </div>
              )}
              
              {/* Section 4: Timeframe - Light Purple */}
              {details.timeframe && (
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="text-purple-700 font-medium text-sm mb-1">الإطار الزمني</h4>
                  <div className="flex items-center">
                    <span className="text-xl text-purple-600 ml-2">⏱️</span>
                    <span className="text-sm text-gray-700">{details.timeframe}</span>
                  </div>
                </div>
              )}
              
              {/* Section 5: Required Documents - Light Red */}
              {details.documents && details.documents.length > 0 && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="text-red-700 font-medium text-sm mb-2">الوثائق المطلوبة</h4>
                  <div className="space-y-2">
                    {details.documents.map((doc) => (
                      <label key={doc.id} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={doc.checked} 
                          onChange={(e) => handleDocumentToggle(e, doc.id)}
                          className="ml-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">{doc.name}</span>
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
              
              {/* Section 6: Additional Notes - Light Yellow */}
              {details.notes && details.notes.length > 0 && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="text-yellow-700 font-medium text-sm mb-2">ملاحظات إضافية</h4>
                  <ul className="list-disc list-inside mr-1 space-y-1">
                    {details.notes.map((note: string, i: number) => (
                      <li key={i} className="text-sm text-gray-700">{note}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Options (using light blue again if needed) */}
              {details.options && details.options.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="text-blue-700 font-medium text-sm mb-2">الخيارات المتاحة</h4>
                  <ul className="list-none mr-0 space-y-1.5">
                    {details.options.map((opt: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-flex justify-center items-center bg-blue-200 text-blue-800 ml-2">☑</span>
                        <span className="text-sm text-gray-700">{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Progress Checklist - Light Teal */}
              {details.checklistItems && details.checklistItems.length > 0 && (
                <div className="bg-teal-50 p-3 rounded-lg">
                  <h4 className="text-teal-700 font-medium text-sm mb-2">ميزة الشطب (تأكيد التقدم)</h4>
                  <div className="space-y-2">
                    {details.checklistItems.map((item) => (
                      <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={item.checked} 
                          onChange={(e) => handleChecklistToggle(e, item.id)}
                          className="ml-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">{item.text}</span>
                      </label>
                    ))}
                    
                    {checklistProgress > 0 && (
                      <div className="mt-3">
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full",
                              checklistProgress === 100 ? "bg-status-complete" : "bg-status-progress"
                            )}
                            style={{ width: `${checklistProgress}%` }}
                          />
                        </div>
                        <div className="text-xs text-right mt-1 text-muted-foreground">
                          {checklistProgress}% مكتمل
                        </div>
                      </div>
                    )}
                  </div>
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
