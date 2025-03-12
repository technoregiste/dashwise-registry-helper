
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import RegistrationSteps, { StepData, Document } from '@/components/dashboard/RegistrationSteps';
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
        steps: [
          'تقديم 4 أسماء مقترحة',
          'التحقق من توفر الاسم عبر النظام',
          'تأكيد حجز الاسم رسميًا'
        ],
        cost: '490 دج',
        timeframe: '24 ساعة',
        requirements: ['يجب أن يكون فريداً', 'تجنب التشابه مع العلامات التجارية الموجودة']
      }
    },
    {
      id: 2,
      title: 'اختيار الهيكل القانوني',
      status: 'progress',
      description: 'اختر الهيكل القانوني المناسب لشركتك الناشئة بناءً على حجم النشاط وعدد المؤسسين.',
      details: {
        steps: [
          'استعراض الخيارات المتاحة',
          'مقارنة المزايا والتكاليف لكل نوع',
          'اتخاذ القرار المناسب وإبلاغ الموثق'
        ],
        options: [
          'شركة ذات مسؤولية محدودة (SARL) - الأنسب للشركات الناشئة',
          'شركة مساهمة (SPA)',
          'مؤسسة فردية (EI)',
          'شركة تضامن (SNC)'
        ],
        cost: '5,000 - 20,000 دج (رسوم الموثق)',
        timeframe: '2-5 أيام',
        documents: [
          { id: '2-1', name: 'نسخة من بطاقة الهوية', checked: true },
          { id: '2-2', name: 'شهادة حجز الاسم', checked: false }
        ]
      }
    },
    {
      id: 3,
      title: 'تحضير الوثائق المطلوبة',
      status: 'incomplete',
      description: 'تجهيز جميع المستندات اللازمة للتسجيل وصياغة عقد التأسيس والنظام الأساسي.',
      error: 'عقد إيجار مقر الشركة مفقود',
      details: {
        steps: [
          'استخراج بطاقة التعريف الوطنية للمسير',
          'الحصول على شهادة حجز الاسم',
          'إعداد عقد الإيجار أو إثبات الملكية',
          'صياغة عقد التأسيس والنظام الأساسي من الموثق'
        ],
        cost: 'تعتمد على تعرفة الموثق',
        timeframe: '3-7 أيام',
        documents: [
          { id: '3-1', name: 'بطاقة التعريف الوطنية', checked: true },
          { id: '3-2', name: 'شهادة حجز الاسم', checked: true },
          { id: '3-3', name: 'عقد الإيجار أو إثبات الملكية', checked: false },
          { id: '3-4', name: 'عقد التأسيس والنظام الأساسي', checked: false }
        ]
      }
    },
    {
      id: 4,
      title: 'تسجيل الشركة في السجل التجاري',
      status: 'incomplete',
      description: 'تقديم الملف الكامل إلى المركز الوطني للسجل التجاري (CNRC) لاستصدار السجل التجاري.',
      details: {
        steps: [
          'تجهيز ملف التسجيل الكامل',
          'تقديم الملف إلى CNRC',
          'دفع رسوم التسجيل',
          'انتظار استلام شهادة السجل التجاري (خلال 24 ساعة)'
        ],
        cost: '9,000 - 12,000 دج',
        timeframe: '24 ساعة',
        documents: [
          { id: '4-1', name: 'شهادة حجز الاسم', checked: false },
          { id: '4-2', name: 'عقد التأسيس والنظام الأساسي', checked: false },
          { id: '4-3', name: 'بطاقة التعريف الوطنية', checked: false },
          { id: '4-4', name: 'عقد الإيجار أو إثبات الملكية', checked: false },
          { id: '4-5', name: 'استمارة التسجيل من CNRC', checked: false }
        ]
      }
    },
    {
      id: 5,
      title: 'التسجيل في الضمان الاجتماعي',
      status: 'incomplete',
      description: 'تسجيل المسير في الصندوق الاجتماعي (CNAS أو CASNOS) لضمان الحماية الاجتماعية.',
      details: {
        steps: [
          'تجهيز ملف التسجيل للضمان الاجتماعي',
          'تقديم الملف للجهة المختصة (CNAS للأجراء أو CASNOS لغير الأجراء)',
          'دفع الاشتراكات السنوية'
        ],
        cost: 'حوالي 32,000 دج سنويًا',
        timeframe: '48 ساعة',
        documents: [
          { id: '5-1', name: 'نسخة من السجل التجاري', checked: false },
          { id: '5-2', name: 'بطاقة التعريف الوطنية', checked: false },
          { id: '5-3', name: 'استمارة التسجيل من CNAS أو CASNOS', checked: false }
        ]
      }
    },
    {
      id: 6,
      title: 'الحصول على الرقم الجبائي',
      status: 'incomplete',
      description: 'الحصول على الرقم الجبائي من مديرية الضرائب لتسهيل المعاملات المالية والقانونية.',
      details: {
        steps: [
          'تقديم طلب الحصول على الرقم الجبائي عبر مديرية الضرائب',
          'حضور مفتشية الضرائب لتأكيد التسجيل',
          'استلام الرقم الجبائي (خلال 2-3 أيام)'
        ],
        cost: 'مجانية',
        timeframe: '2-3 أيام',
        documents: [
          { id: '6-1', name: 'بطاقة التعريف الوطنية', checked: false },
          { id: '6-2', name: 'نسخة من السجل التجاري', checked: false },
          { id: '6-3', name: 'عقد الإيجار أو إثبات الملكية', checked: false }
        ]
      }
    },
    {
      id: 7,
      title: 'الحصول على الرقم الإحصائي',
      status: 'incomplete',
      description: 'إتمام التسجيل لدى الديوان الوطني للإحصائيات والحصول على الرقم الإحصائي.',
      details: {
        steps: [
          'تجهيز الوثائق المطلوبة',
          'تقديم طلب التسجيل لدى الديوان الوطني للإحصائيات',
          'استلام الرقم الإحصائي (خلال 1-2 يوم)'
        ],
        cost: '2,000 دج',
        timeframe: '1-2 يوم',
        documents: [
          { id: '7-1', name: 'بطاقة التعريف الوطنية', checked: false },
          { id: '7-2', name: 'الرقم الجبائي', checked: false },
          { id: '7-3', name: 'نسخة من السجل التجاري', checked: false }
        ]
      }
    }
  ]);

  // Function to handle document checkbox toggle
  const handleDocumentToggle = (stepId: number, docId: string, checked: boolean) => {
    setSteps(prevSteps => 
      prevSteps.map(step => {
        if (step.id === stepId && step.details?.documents) {
          return {
            ...step,
            details: {
              ...step.details,
              documents: step.details.documents.map(doc => {
                if (doc.id === docId) {
                  return { ...doc, checked };
                }
                return doc;
              })
            }
          };
        }
        return step;
      })
    );

    // Display toast notification
    if (checked) {
      toast({
        title: "تم تحديث الوثائق",
        description: "تم تأكيد استلام وثيقة جديدة بنجاح",
      });
    }

    // Update step status if all documents are checked
    updateStepStatusBasedOnDocuments(stepId);
  };

  // Function to update step status based on document completion
  const updateStepStatusBasedOnDocuments = (stepId: number) => {
    setSteps(prevSteps => 
      prevSteps.map(step => {
        if (step.id === stepId && step.details?.documents && step.details.documents.length > 0) {
          const allChecked = step.details.documents.every(doc => doc.checked);
          
          if (allChecked && step.status !== 'complete') {
            return { ...step, status: 'complete' };
          } else if (!allChecked && step.status === 'complete') {
            return { ...step, status: 'progress' };
          }
        }
        return step;
      })
    );
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const total = steps.length;
    const completed = steps.filter(step => step.status === 'complete').length;
    const inProgress = steps.filter(step => step.status === 'progress').length * 0.5;
    
    // Calculate document completion for in-progress steps
    let documentProgress = 0;
    steps.filter(step => step.status === 'progress').forEach(step => {
      if (step.details?.documents && step.details.documents.length > 0) {
        const totalDocs = step.details.documents.length;
        const checkedDocs = step.details.documents.filter(doc => doc.checked).length;
        documentProgress += (checkedDocs / totalDocs) * 0.5 / total;
      }
    });
    
    return Math.round(((completed + inProgress + documentProgress) / total) * 100);
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

  // Calculate total estimated cost
  const calculateTotalCost = () => {
    let totalMin = 0;
    let totalMax = 0;
    
    steps.forEach(step => {
      if (step.details?.cost) {
        const costText = step.details.cost;
        
        // Extract numbers from cost string
        const matches = costText.match(/\d{1,3}(,\d{3})*(\.\d+)?/g);
        
        if (matches) {
          // Handle range (e.g., "5,000 - 20,000 دج")
          if (matches.length >= 2) {
            const min = parseFloat(matches[0].replace(/,/g, ''));
            const max = parseFloat(matches[1].replace(/,/g, ''));
            totalMin += min;
            totalMax += max;
          } 
          // Handle single value (e.g., "490 دج")
          else if (matches.length === 1) {
            const value = parseFloat(matches[0].replace(/,/g, ''));
            totalMin += value;
            totalMax += value;
          }
        }
      }
    });
    
    if (totalMin === totalMax) {
      return `${totalMin.toLocaleString()} دج`;
    } else {
      return `${totalMin.toLocaleString()} - ${totalMax.toLocaleString()} دج`;
    }
  };

  // Calculate total estimated time
  const calculateTotalTime = () => {
    let minDays = 0;
    let maxDays = 0;
    
    steps.forEach(step => {
      if (step.details?.timeframe) {
        const timeText = step.details.timeframe;
        
        // Check for hours
        if (timeText.includes('ساعة')) {
          const hours = parseInt(timeText.match(/\d+/)?.[0] || '0');
          minDays += hours / 24;
          maxDays += hours / 24;
        }
        // Check for days range (e.g., "2-5 أيام")
        else if (timeText.match(/(\d+)-(\d+)\s+أيام?/)) {
          const matches = timeText.match(/(\d+)-(\d+)\s+أيام?/);
          if (matches && matches.length >= 3) {
            minDays += parseInt(matches[1]);
            maxDays += parseInt(matches[2]);
          }
        }
        // Check for single day value (e.g., "2 أيام")
        else if (timeText.match(/(\d+)\s+أيام?/)) {
          const days = parseInt(timeText.match(/(\d+)/)?.[0] || '0');
          minDays += days;
          maxDays += days;
        }
      }
    });
    
    const minDaysRounded = Math.ceil(minDays);
    const maxDaysRounded = Math.ceil(maxDays);
    
    if (minDaysRounded === maxDaysRounded) {
      return `${minDaysRounded} يوم`;
    } else {
      return `${minDaysRounded} - ${maxDaysRounded} يوم`;
    }
  };
  
  const estimatedCost = calculateTotalCost();
  const estimatedTime = calculateTotalTime();

  // Show welcome toast on initial render
  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "مرحباً بك في لوحة تسجيل الشركة الناشئة",
        description: "اتبع الخطوات المذكورة لإكمال تسجيل شركتك بنجاح",
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
            estimatedTime={estimatedTime}
            daysRemaining={14}
            estimatedCost={estimatedCost}
          />
          
          <RegistrationSteps 
            steps={steps}
            onStepClick={handleStepClick}
            onDocumentToggle={handleDocumentToggle}
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
