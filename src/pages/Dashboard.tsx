
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import RegistrationSteps from '@/components/dashboard/RegistrationSteps';
import RegistrationRoadmap from '@/components/dashboard/RegistrationRoadmap';
import AiAssistant from '@/components/ai/AiAssistant';
import { toast } from '@/hooks/use-toast';
import ProfileInfo from '@/components/dashboard/ProfileInfo';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import { useDashboardData } from '@/hooks/useDashboardData';
import { StepData } from '@/types/dashboard';
import StepCard from '@/components/dashboard/StepCard';

const Dashboard = () => {
  const {
    steps,
    profile,
    loading,
    handleDocumentToggle,
    handleChecklistToggle,
    handleStepClick
  } = useDashboardData();
  
  const [selectedStep, setSelectedStep] = useState<StepData | null>(null);
  const [viewMode, setViewMode] = useState<'roadmap' | 'cards'>('roadmap');

  useEffect(() => {
    if (!loading && profile) {
      setTimeout(() => {
        toast({
          title: `مرحباً ${profile.founder_name}`,
          description: "اتبع الخطوات المذكورة لإكمال تسجيل شركتك بنجاح",
        });
      }, 1000);
    }
  }, [loading, profile]);

  useEffect(() => {
    // Set first incomplete or in-progress step as selected by default
    if (steps.length > 0 && !selectedStep) {
      const currentStep = steps.find(step => step.status !== 'complete') || steps[0];
      setSelectedStep(currentStep);
    }
  }, [steps, selectedStep]);

  const handleStepSelection = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      setSelectedStep(step);
      handleStepClick(stepId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const calculateProgress = () => {
    if (steps.length === 0) return 0;
    
    const total = steps.length;
    const completed = steps.filter(step => step.status === 'complete').length;
    const inProgress = steps.filter(step => step.status === 'progress').length * 0.5;
    
    let progressPoints = 0;
    steps.filter(step => step.status === 'progress').forEach(step => {
      if (step.details?.documents && step.details.documents.length > 0) {
        const totalDocs = step.details.documents.length;
        const checkedDocs = step.details.documents.filter(doc => doc.checked).length;
        progressPoints += (checkedDocs / totalDocs) * 0.25 / total;
      }
      
      if (step.details?.checklistItems && step.details.checklistItems.length > 0) {
        const totalItems = step.details.checklistItems.length;
        const checkedItems = step.details.checklistItems.filter(item => item.checked).length;
        progressPoints += (checkedItems / totalItems) * 0.25 / total;
      }
    });
    
    return Math.round(((completed + inProgress + progressPoints) / total) * 100);
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header 
        startupName={profile?.company_name || "شركتك الناشئة"}
        progressPercentage={progressPercentage}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProfileInfo profile={profile} className="md:col-span-2" />
            <DashboardMetrics steps={steps} />
          </div>
          
          <div className="flex justify-end space-x-2 rtl:space-x-reverse">
            <button 
              onClick={() => setViewMode('roadmap')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${viewMode === 'roadmap' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
            >
              عرض كخريطة
            </button>
            <button 
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${viewMode === 'cards' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
            >
              عرض كبطاقات
            </button>
          </div>
          
          {viewMode === 'roadmap' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RegistrationRoadmap 
                  steps={steps}
                  onStepClick={handleStepSelection}
                />
              </div>
              
              {selectedStep && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-medium mb-4">تفاصيل الخطوة</h3>
                  <StepCard
                    number={selectedStep.id}
                    title={selectedStep.title}
                    status={selectedStep.status}
                    description={selectedStep.description}
                    error={selectedStep.error}
                    details={selectedStep.details}
                    onClick={() => {}}
                    onDocumentToggle={(e, docId) => handleDocumentToggle(selectedStep.id, docId, e.target.checked)}
                    onChecklistToggle={(e, itemId) => handleChecklistToggle(selectedStep.id, itemId, e.target.checked)}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          ) : (
            <RegistrationSteps 
              steps={steps}
              onStepClick={handleStepClick}
              onDocumentToggle={handleDocumentToggle}
              onChecklistToggle={handleChecklistToggle}
            />
          )}
        </div>
      </main>
      
      <AiAssistant />
    </div>
  );
};

export default Dashboard;
