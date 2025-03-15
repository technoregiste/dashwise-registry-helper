
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import RegistrationSteps from '@/components/dashboard/RegistrationSteps';
import AiAssistant from '@/components/ai/AiAssistant';
import { toast } from '@/hooks/use-toast';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { HomeIcon, ExternalLinkIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const {
    steps,
    profile,
    loading,
    handleDocumentToggle,
    handleChecklistToggle,
    handleStepClick
  } = useDashboardData();
  
  const [activeStepIndex, setActiveStepIndex] = useState(0);

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

  // Find the first in-progress step
  useEffect(() => {
    if (steps.length > 0) {
      const inProgressIndex = steps.findIndex(step => step.status === 'progress');
      const incompleteIndex = steps.findIndex(step => step.status === 'incomplete');
      
      if (inProgressIndex !== -1) {
        setActiveStepIndex(inProgressIndex);
      } else if (incompleteIndex !== -1) {
        setActiveStepIndex(incompleteIndex);
      }
    }
  }, [steps]);

  const handleStepNavigation = (index: number) => {
    setActiveStepIndex(index);
  };

  const handleReturnToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const progressPercentage = calculateProgress(steps);

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header 
        startupName={profile?.company_name || "شركتك الناشئة"}
        progressPercentage={progressPercentage}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <DashboardMetrics steps={steps} activeStepIndex={activeStepIndex} />
          </div>
          
          <RegistrationSteps 
            steps={steps}
            activeStepIndex={activeStepIndex}
            onStepClick={handleStepClick}
            onStepNavigation={handleStepNavigation}
            onDocumentToggle={handleDocumentToggle}
            onChecklistToggle={handleChecklistToggle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 bg-white shadow-card">
              <h3 className="text-xl font-semibold text-center mb-4">تخطي التسجيل</h3>
              <p className="text-sm text-muted-foreground mb-4">
                إذا كنت ترغب في العودة إلى الصفحة الرئيسية وإنهاء عملية التسجيل، يمكنك النقر على الزر أدناه.
              </p>
              <Button onClick={handleReturnToHome} className="w-full" variant="outline">
                <HomeIcon className="ml-2" size={16} />
                العودة إلى الصفحة الرئيسية
              </Button>
            </Card>

            <Card className="p-5 bg-white shadow-card">
              <h3 className="text-xl font-semibold text-center mb-4">لوحة مدير الحاضنة</h3>
              <p className="text-sm text-muted-foreground mb-4">
                هذا القسم مخصص لمديري الحاضنة فقط. يرجى تسجيل الدخول باستخدام بيانات الاعتماد المقدمة.
              </p>
              <Button 
                onClick={() => navigate('/admin')} 
                className="w-full"
                variant="secondary"
              >
                <ExternalLinkIcon className="ml-2" size={16} />
                الدخول إلى لوحة الإدارة
              </Button>
            </Card>
          </div>
        </div>
      </main>
      
      <AiAssistant />
    </div>
  );
};

// Helper function to calculate progress
const calculateProgress = (steps) => {
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

export default Dashboard;
