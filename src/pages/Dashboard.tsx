
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import RegistrationSteps, { StepData } from '@/components/dashboard/RegistrationSteps';
import MetricsPanel from '@/components/dashboard/MetricsPanel';
import AiAssistant from '@/components/ai/AiAssistant';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  // Mock data for the dashboard
  const [steps, setSteps] = useState<StepData[]>([
    {
      id: 1,
      title: 'Select Company Type',
      status: 'complete',
      description: 'Choose the type of company that best suits your business model and goals.'
    },
    {
      id: 2,
      title: 'Add Founder Information',
      status: 'progress',
      description: 'Add personal and contact details for all company founders.'
    },
    {
      id: 3,
      title: 'Upload Required Documents',
      status: 'incomplete',
      description: 'Upload all required legal documents and business plans.',
      error: 'Business registration certificate is missing'
    },
    {
      id: 4,
      title: 'Review Data and Confirm',
      status: 'progress',
      description: 'Review all entered information and confirm its accuracy.'
    },
    {
      id: 5,
      title: 'Complete Payment',
      status: 'progress',
      description: 'Pay registration fees and any additional service charges.'
    },
    {
      id: 6,
      title: 'Submit Application',
      status: 'incomplete',
      description: 'Submit your completed application for processing.'
    }
  ]);

  // Calculate progress percentage
  const calculateProgress = () => {
    const total = steps.length;
    const completed = steps.filter(step => step.status === 'complete').length;
    const inProgress = steps.filter(step => step.status === 'progress').length * 0.5;
    return Math.round(((completed + inProgress) / total) * 100);
  };

  const progressPercentage = calculateProgress();

  // Handle step click
  const handleStepClick = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      if (step.status === 'complete') {
        toast({
          title: `Step ${stepId}: ${step.title}`,
          description: "This step has been completed. You can review or edit your information.",
        });
      } else {
        toast({
          title: `Step ${stepId}: ${step.title}`,
          description: "Let's complete this step now.",
        });
      }
    }
  };

  // Show welcome toast on initial render
  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "Welcome to Your Dashboard",
        description: "Continue your registration process. You're making good progress!",
      });
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header 
        startupName="TechVista Labs"
        progressPercentage={progressPercentage}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <MetricsPanel
            completionPercentage={progressPercentage}
            estimatedTime="2 hours, 30 minutes"
            daysRemaining={14}
          />
          
          <RegistrationSteps 
            steps={steps}
            onStepClick={handleStepClick}
          />
        </div>
      </main>
      
      <AiAssistant />
    </div>
  );
};

export default Dashboard;
