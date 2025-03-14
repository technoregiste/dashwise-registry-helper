
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import RegistrationSteps from '@/components/dashboard/RegistrationSteps';
import AiAssistant from '@/components/ai/AiAssistant';
import { toast } from '@/hooks/use-toast';
import ProfileInfo from '@/components/dashboard/ProfileInfo';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import { useDashboardData } from '@/hooks/useDashboardData';

const Dashboard = () => {
  const {
    steps,
    profile,
    loading,
    handleDocumentToggle,
    handleChecklistToggle,
    handleStepClick
  } = useDashboardData();

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

  // Create wrapper functions to handle the event objects
  const handleDocumentToggleWithEvent = (stepId: number, docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    handleDocumentToggle(stepId, docId, e.target.checked);
  };
  
  const handleChecklistToggleWithEvent = (stepId: number, itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    handleChecklistToggle(stepId, itemId, e.target.checked);
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

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header 
        startupName={profile?.company_name || "شركتك الناشئة"}
        progressPercentage={calculateProgress()}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProfileInfo profile={profile} className="md:col-span-2" />
            <DashboardMetrics steps={steps} />
          </div>
          
          <RegistrationSteps 
            steps={steps}
            onStepClick={handleStepClick}
            onDocumentToggle={handleDocumentToggle}
            onChecklistToggle={handleChecklistToggle}
          />
        </div>
      </main>
      
      <AiAssistant />
    </div>
  );
};

export default Dashboard;
