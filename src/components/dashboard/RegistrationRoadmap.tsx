
import React from 'react';
import { cn } from '@/lib/utils';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { StepData } from '@/types/dashboard';
import StepsList from './StepsList';
import { toast } from '@/hooks/use-toast';

interface RegistrationRoadmapProps {
  steps: StepData[];
  onStepClick: (stepId: number) => void;
  className?: string;
}

const RegistrationRoadmap: React.FC<RegistrationRoadmapProps> = ({
  steps,
  onStepClick,
  className
}) => {
  const handleStepClick = (step: StepData) => {
    if (step.status === 'incomplete') {
      // Check if previous step is completed
      const prevStep = steps.find(s => s.id === step.id - 1);
      if (prevStep && prevStep.status !== 'complete') {
        toast({
          title: "⚠️ لا يمكن تخطي الخطوات",
          description: "يجب إكمال الخطوة السابقة أولاً للانتقال إلى هذه الخطوة!",
          variant: "destructive",
        });
        return;
      }
    }
    
    onStepClick(step.id);
  };

  // Icons for each step
  const stepIcons = [
    '🚀', // Choose company name
    '📜', // Choose legal structure
    '📑', // Prepare official documents
    '🏛️', // Register in commercial register
    '🛡️', // Register with social security
    '💰', // Obtain tax number
    '📊', // Obtain statistical number
  ];

  return (
    <div className={cn("mb-8", className)}>
      <h2 className="text-2xl font-semibold mb-6 text-center">رحلة تسجيل شركتك</h2>
      
      <div className="relative pb-8">
        {/* Progress Line */}
        <div className="absolute top-10 right-6 w-[calc(100%-48px)] h-1 bg-gray-200 z-0">
          <div 
            className="h-full bg-primary transition-all duration-700" 
            style={{ 
              width: `${Math.max(0, Math.min(100, (steps.filter(s => s.status === 'complete').length / (steps.length - 1)) * 100))}%` 
            }}
          />
        </div>
        
        {/* Checkpoint Stations */}
        <div className="relative z-10 flex flex-col space-y-16">
          {steps.map((step, index) => {
            const isCompleted = step.status === 'complete';
            const isActive = step.status === 'progress' || isCompleted;
            const isDisabled = !isActive && step.status === 'incomplete';
            
            // Determine if this step is accessible (is active or previous step is complete)
            const isPreviousComplete = index === 0 || steps[index - 1].status === 'complete';
            const isAccessible = isActive || isPreviousComplete;
            
            return (
              <div key={step.id} className="relative">
                {/* Checkpoint */}
                <div 
                  className={cn(
                    "roadmap-checkpoint flex items-start transition-all duration-300 cursor-pointer",
                    isActive ? "opacity-100" : "opacity-70",
                    !isAccessible && "cursor-not-allowed"
                  )}
                  onClick={() => isAccessible ? handleStepClick(step) : null}
                >
                  {/* Station Icon */}
                  <div 
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md transition-all",
                      isCompleted ? "bg-status-complete text-white" :
                      isActive ? "bg-status-progress text-white" :
                      "bg-white border-2 border-gray-200"
                    )}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : 
                     isDisabled && !isPreviousComplete ? <Lock className="w-5 h-5 text-gray-400" /> : 
                     <span>{stepIcons[index] || '📌'}</span>}
                  </div>
                  
                  {/* Step Content */}
                  <div className={cn(
                    "flex-grow mr-4 bg-white rounded-lg p-4 border transition-all shadow-card hover:shadow-lg",
                    isCompleted ? "border-status-complete/20" :
                    isActive ? "border-status-progress/20" :
                    "border-gray-200"
                  )}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <div className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        isCompleted ? "bg-status-complete/10 text-status-complete" :
                        isActive ? "bg-status-progress/10 text-status-progress" :
                        "bg-gray-100 text-gray-500"
                      )}>
                        {isCompleted ? "مكتمل" : isActive ? "قيد التنفيذ" : "غير مكتمل"}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">{step.description.substring(0, 120)}...</p>
                    
                    {isActive && step.details?.steps && (
                      <div className="mt-3">
                        <StepsList steps={step.details.steps.slice(0, 2)} />
                        {step.details.steps.length > 2 && (
                          <p className="text-xs text-blue-500 mt-1">+{step.details.steps.length - 2} خطوات إضافية...</p>
                        )}
                      </div>
                    )}
                    
                    {/* Next button for completed steps */}
                    {isCompleted && index < steps.length - 1 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStepClick(steps[index + 1]);
                        }}
                        className="mt-3 text-sm flex items-center text-primary hover:text-primary/80 transition-colors"
                      >
                        الانتقال للخطوة التالية
                        <ChevronRight className="w-4 h-4 mr-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RegistrationRoadmap;
