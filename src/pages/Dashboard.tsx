
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
      title: 'اختيار اسم الشركة',
      status: 'complete',
      description: 'التحقق من توفر الاسم من خلال المركز الوطني للسجل التجاري. يجب أن يكون الاسم فريدًا.',
      details: {
        cost: '490 دج',
        timeframe: '24 ساعة',
        requirements: ['يجب أن يكون فريداً', 'تجنب التشابه مع العلامات التجارية الموجودة']
      }
    },
    {
      id: 2,
      title: 'اختيار الهيكل القانوني',
      status: 'progress',
      description: 'اختر الهيكل القانوني المناسب لشركتك الناشئة.',
      details: {
        options: [
          'شركة ذات مسؤولية محدودة (SARL) - الأنسب للشركات الناشئة',
          'شركة مساهمة (SPA)',
          'مؤسسة فردية (EI)',
          'شركة تضامن (SNC)'
        ],
        cost: '5,000 - 20,000 دج (رسوم التوثيق)',
        timeframe: '2-5 أيام'
      }
    },
    {
      id: 3,
      title: 'تجهيز المستندات المطلوبة',
      status: 'incomplete',
      description: 'جمع جميع المستندات اللازمة للتسجيل.',
      error: 'عقد إيجار مقر الشركة مفقود',
      details: {
        documents: [
          'بطاقة الهوية الوطنية',
          'شهادة حجز الاسم (من المركز الوطني للسجل التجاري)',
          'عقد إيجار أو إثبات ملكية مقر الشركة',
          'القانون الأساسي للشركة'
        ]
      }
    },
    {
      id: 4,
      title: 'إعداد القانون الأساسي',
      status: 'incomplete',
      description: 'صياغة القانون الأساسي والنظام الداخلي لشركتك الناشئة.',
      details: {
        requirements: [
          'اسم وعنوان الشركة',
          'غرض الشركة',
          'رأس المال وتوزيع الحصص',
          'هيكل الإدارة',
          'الاستعانة بالمساعدة القانونية إذا لزم الأمر'
        ]
      }
    },
    {
      id: 5,
      title: 'التسجيل لدى الجهات الرسمية',
      status: 'incomplete',
      description: 'تقديم المستندات إلى المركز الوطني للسجل التجاري، كناس/كاسنوس، ومديرية الضرائب.',
      details: {
        authorities: [
          'المركز الوطني للسجل التجاري: شهادة التسجيل التجاري',
          'كناس/كاسنوس: التسجيل في الضمان الاجتماعي',
          'مديرية الضرائب: رقم التعريف الضريبي'
        ],
        cost: '32,000 دج (اشتراك كاسنوس السنوي)',
        timeframe: '24-48 ساعة لكل إجراء'
      }
    },
    {
      id: 6,
      title: 'استلام المستندات الرسمية',
      status: 'incomplete',
      description: 'تأكيد الانتهاء واستلام جميع مستندات التسجيل الرسمية.',
      details: {
        documents: [
          'شهادة التسجيل التجاري',
          'بطاقة التعريف الضريبي',
          'شهادة التعريف الإحصائي',
          'شهادة التسجيل في الضمان الاجتماعي'
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
          title: `الخطوة ${stepId}: ${step.title}`,
          description: "تم إكمال هذه الخطوة. يمكنك مراجعة أو تعديل المعلومات الخاصة بك.",
        });
      } else {
        toast({
          title: `الخطوة ${stepId}: ${step.title}`,
          description: "لنكمل هذه الخطوة الآن.",
        });
      }
    }
  };

  // Show welcome toast on initial render
  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "مرحباً بك في لوحة التحكم",
        description: "استمر في عملية التسجيل. أنت تحرز تقدماً جيداً!",
      });
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header 
        startupName="تك فيستا لابز"
        progressPercentage={progressPercentage}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <MetricsPanel
            completionPercentage={progressPercentage}
            estimatedTime="5 أيام، 12 ساعة"
            daysRemaining={14}
            estimatedCost="38,000 دج"
          />
          
          <RegistrationSteps 
            steps={steps}
            onStepClick={handleStepClick}
          />

          <div className="bg-white rounded-xl shadow-card p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">نصائح وإرشادات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-primary mb-2">اختيار الاسم</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>تأكد من فرادة الاسم لتجنب الرفض</li>
                  <li>تحقق من تعارضات العلامات التجارية مسبقاً</li>
                  <li>اختر اسماً يعكس هوية علامتك التجارية</li>
                </ul>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-primary mb-2">الهيكل القانوني</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>يوصى بشركة ذات مسؤولية محدودة (SARL) لمعظم الشركات الناشئة</li>
                  <li>تختلف متطلبات الحد الأدنى لرأس المال حسب الهيكل</li>
                  <li>ضع في اعتبارك الآثار الضريبية لكل هيكل</li>
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
