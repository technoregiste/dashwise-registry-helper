
import React from 'react';
import { cn } from '@/lib/utils';
import StepCard from './StepCard';
import { StepData } from '@/types/dashboard';
import { 
  FileText, 
  Building2, 
  FileCheck, 
  BookOpen, 
  Shield, 
  FileBadge, 
  BarChart3
} from 'lucide-react';

interface RegistrationStepsProps {
  steps: StepData[];
  activeStepIndex: number;
  onStepClick: (stepId: number) => void;
  onStepNavigation: (index: number) => void;
  onDocumentToggle?: (stepId: number, docId: string, checked: boolean) => void;
  onChecklistToggle?: (stepId: number, itemId: string, checked: boolean) => void;
  className?: string;
}

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({
  steps,
  activeStepIndex,
  onStepClick,
  onStepNavigation,
  onDocumentToggle,
  onChecklistToggle,
  className
}) => {
  const stepIcons = [
    { icon: FileText, label: 'اختيار اسم الشركة' },
    { icon: Building2, label: 'اختيار الهيكل القانوني' },
    { icon: FileCheck, label: 'تحضير الوثائق الرسمية' },
    { icon: BookOpen, label: 'تسجيل الشركة في السجل التجاري' },
    { icon: Shield, label: 'التسجيل في الضمان الاجتماعي' },
    { icon: FileBadge, label: 'الحصول على الرقم الجبائي' },
    { icon: BarChart3, label: 'الحصول على الرقم الإحصائي' }
  ];

  const activeStep = steps[activeStepIndex] || steps[0];

  return (
    <div className={cn(className, "registration-steps")}>
      <h2 className="text-2xl font-semibold mb-4 text-center">خطوات التسجيل</h2>
      
      {/* Navigation Bar - Smaller Size */}
      <div className="bg-white rounded-xl p-3 mb-6 shadow-card overflow-x-auto">
        <div className="flex justify-between items-center min-w-max max-w-3xl mx-auto">
          {steps.map((step, index) => {
            const StepIcon = stepIcons[index]?.icon || FileText;
            return (
              <div key={step.id} className="relative flex flex-col items-center px-2">
                <button
                  onClick={() => onStepNavigation(index)}
                  className={cn(
                    "w-10 h-10 rounded-full mb-2 flex items-center justify-center transition-all",
                    step.status === 'complete' ? "bg-status-complete text-white" :
                    step.status === 'progress' ? "bg-status-progress text-white" :
                    "bg-gray-100 text-gray-500",
                    activeStepIndex === index ? "ring-2 ring-primary ring-offset-2" : ""
                  )}
                >
                  <StepIcon size={16} />
                </button>
                <span className="text-xs text-muted-foreground w-16 text-center truncate">{step.title}</span>
                
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute top-5 right-10 h-0.5 w-[calc(100%-0.5rem)]",
                      step.status === 'complete' ? "bg-status-complete" : "bg-gray-200"
                    )}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current Step Card */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl animate-fade-in">
          {activeStep && (
            <StepCard
              number={activeStep.id}
              title={activeStep.title}
              status={activeStep.status}
              description={activeStep.description}
              details={activeStep.details}
              onClick={() => onStepClick(activeStep.id)}
              onDocumentToggle={onDocumentToggle}
              onChecklistToggle={onChecklistToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationSteps;
