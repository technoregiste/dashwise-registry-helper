
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import RegistrationSteps, { StepData } from '@/components/dashboard/RegistrationSteps';
import MetricsPanel from '@/components/dashboard/MetricsPanel';
import AiAssistant from '@/components/ai/AiAssistant';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  // Enhanced data for the Algerian Startup Registration process
  const [steps, setSteps] = useState<StepData[]>([
    {
      id: 1,
      title: 'Choosing a Company Name',
      status: 'complete',
      description: 'Check name availability through the CNRC. The name must be unique.',
      details: {
        cost: '490 DZD',
        timeframe: '24 hours',
        requirements: ['Must be unique', 'Avoid resemblance to existing trademarks']
      }
    },
    {
      id: 2,
      title: 'Choose a Legal Structure',
      status: 'progress',
      description: 'Select the appropriate legal structure for your startup.',
      details: {
        options: [
          'SARL (Limited Liability Company) - Most suitable for startups',
          'SPA (Joint-Stock Company)',
          'EI (Entreprise Individuelle)',
          'SNC (Partnership)'
        ],
        cost: '5,000 - 20,000 DZD (notary fees)',
        timeframe: '2-5 days'
      }
    },
    {
      id: 3,
      title: 'Prepare Required Documents',
      status: 'incomplete',
      description: 'Gather all necessary documents for registration.',
      error: 'Missing lease contract for company headquarters',
      details: {
        documents: [
          'National ID card',
          'Name reservation certificate (from CNRC)',
          'Lease contract or proof of headquarters ownership',
          'Articles of Association and Bylaws'
        ]
      }
    },
    {
      id: 4,
      title: 'Prepare Articles of Association',
      status: 'incomplete',
      description: 'Draft the Articles of Association and Bylaws for your startup.',
      details: {
        requirements: [
          'Company name and address',
          'Purpose of the company',
          'Capital and share distribution',
          'Management structure',
          'Consider legal assistance if needed'
        ]
      }
    },
    {
      id: 5,
      title: 'Register with Authorities',
      status: 'incomplete',
      description: 'Submit documents to CNRC, CNAS/CASNOS, and Tax Directorate.',
      details: {
        authorities: [
          'CNRC: Commercial registry certificate',
          'CNAS/CASNOS: Social security registration',
          'Tax Directorate: Tax identification number'
        ],
        cost: '32,000 DZD (annual CASNOS subscription)',
        timeframe: '24-48 hours per procedure'
      }
    },
    {
      id: 6,
      title: 'Receive Official Documents',
      status: 'incomplete',
      description: 'Confirm completion and receive all official registration documents.',
      details: {
        documents: [
          'Commercial Registration Certificate',
          'Tax Identification Card',
          'Statistical Identification Certificate',
          'Social Security Registration Certificate'
        ]
      }
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
            estimatedTime="5 days, 12 hours"
            daysRemaining={14}
            estimatedCost="38,000 DZD"
          />
          
          <RegistrationSteps 
            steps={steps}
            onStepClick={handleStepClick}
          />

          <div className="bg-white rounded-xl shadow-card p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Tips and Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-primary mb-2">Choosing a Name</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Ensure uniqueness to avoid rejection</li>
                  <li>Verify trademark conflicts beforehand</li>
                  <li>Choose a name that reflects your brand identity</li>
                </ul>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-primary mb-2">Legal Structure</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>SARL is recommended for most startups</li>
                  <li>Minimum capital requirements vary by structure</li>
                  <li>Consider tax implications of each structure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <AiAssistant />
    </div>
  );
};

export default Dashboard;
