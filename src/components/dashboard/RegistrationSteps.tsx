
import React from 'react';
import { cn } from '@/lib/utils';
import StepCard from './StepCard';
import { StatusType } from './StatusBadge';

export interface StepData {
  id: number;
  title: string;
  status: StatusType;
  description: string;
  error?: string;
  details?: {
    cost?: string;
    timeframe?: string;
    requirements?: string[];
    options?: string[];
    documents?: string[];
    authorities?: string[];
    [key: string]: any;
  };
}

interface RegistrationStepsProps {
  steps: StepData[];
  onStepClick: (stepId: number) => void;
  className?: string;
}

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({
  steps,
  onStepClick,
  className
}) => {
  // Function to determine animation delay based on index
  const getAnimationDelay = (index: number) => ({
    animationDelay: `${index * 0.1}s`
  });

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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationSteps;
