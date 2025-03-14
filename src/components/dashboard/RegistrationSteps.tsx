
import React from 'react';
import { cn } from '@/lib/utils';
import StepCard from './StepCard';
import { StepData } from '@/types/dashboard';

interface RegistrationStepsProps {
  steps: StepData[];
  onStepClick: (stepId: number) => void;
  onDocumentToggle?: (stepId: number, docId: string, checked: boolean) => void;
  onChecklistToggle?: (stepId: number, itemId: string, checked: boolean) => void;
  className?: string;
}

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({
  steps,
  onStepClick,
  onDocumentToggle,
  onChecklistToggle,
  className
}) => {
  // Function to determine animation delay based on index
  const getAnimationDelay = (index: number) => ({
    animationDelay: `${index * 0.1}s`
  });

  // Create wrapper functions to convert between the different function signatures
  const handleDocumentToggle = (stepId: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
      if (onDocumentToggle) {
        onDocumentToggle(stepId, docId, e.target.checked);
      }
    };
  };

  const handleChecklistToggle = (stepId: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
      if (onChecklistToggle) {
        onChecklistToggle(stepId, itemId, e.target.checked);
      }
    };
  };

  return (
    <div className={cn(className)}>
      <h2 className="text-2xl font-semibold mb-6">خطوات التسجيل</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="animate-scale-up" 
            style={getAnimationDelay(index)}
          >
            <StepCard
              number={step.id}
              title={step.title}
              status={step.status}
              description={step.description}
              error={step.error}
              details={step.details}
              onClick={() => onStepClick(step.id)}
              onDocumentToggle={handleDocumentToggle(step.id)}
              onChecklistToggle={handleChecklistToggle(step.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationSteps;
