
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import RegistrationSteps, { StepData, Document, ChecklistItem } from '@/components/dashboard/RegistrationSteps';
import MetricsPanel from '@/components/dashboard/MetricsPanel';
import AiAssistant from '@/components/ai/AiAssistant';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  // Enhanced data for the Algerian Startup Registration process
  const [steps, setSteps] = useState<StepData[]>([
    {
      id: 1,
      title: 'اختيار اسم الشركة',
      status: 'complete',
      description: 'يعد اختيار اسم فريد ومميز لشركتك أول خطوة نحو تسجيلها رسميًا. يجب أن يكون الاسم متاحًا وغير مستخدم من قبل، لذا ستحتاج إلى اقتراح أربعة أسماء مختلفة والتحقق من توفرها قبل الحجز رسميًا. اختيار اسم مناسب يساعد في بناء هوية قوية لشركتك الناشئة.',
      details: {
        steps: [
          'اقتراح 4 أسماء محتملة لشركتك الناشئة',
          'التحقق من توفر الاسم عبر المركز الوطني للسجل التجاري (CNRC)',
          'حجز الاسم رسميًا إذا كان متاحًا لضمان عدم استخدامه من قبل شركات أخرى',
          'الحصول على شهادة حجز الاسم كوثيقة رسمية مطلوبة للخطوات التالية'
        ],
        cost: 'رسوم حجز الاسم: 490 دج',
        timeframe: '24 ساعة',
        documents: [
          { id: '1-1', name: 'لا توجد وثائق مطلوبة لتقديم الطلب', checked: true },
          { id: '1-2', name: '(بعد الحجز) شهادة حجز الاسم', checked: true }
        ],
        notes: [
          'إذا تم رفض الأسماء المقترحة، يمكن تقديم مجموعة جديدة من الأسماء وإعادة المحاولة',
          'يُفضل اختيار أسماء تعكس طبيعة نشاط الشركة وتكون سهلة التذكر والنطق',
          'بعد الحصول على شهادة حجز الاسم، يجب المحافظة عليها جيدا وانشاء نسخ لأنها مطلوبة في الخطوات القادمة'
        ],
        checklistItems: [
          { id: '1-cl-1', text: 'تم تقديم 4 أسماء مقترحة', checked: true },
          { id: '1-cl-2', text: 'تم التحقق من توفر الاسم في مركز CNRC', checked: true },
          { id: '1-cl-3', text: 'تم حجز الاسم رسميًا', checked: true },
          { id: '1-cl-4', text: 'تم استلام شهادة حجز الاسم', checked: true }
        ]
      }
    },
    {
      id: 2,
      title: 'اختيار الهيكل القانوني',
      status: 'progress',
      description: 'يحدد الهيكل القانوني لشركتك كيفية إدارتها ومسؤولياتك المالية والقانونية. يجب عليك اختيار الشكل القانوني الذي يناسب حجم نشاطك، عدد المؤسسين، ومستوى المسؤولية التي ترغب في تحملها. هذا القرار يؤثر على طبيعة الضرائب، الالتزامات المالية، وسهولة التوسع مستقبلًا.',
      details: {
        steps: [
          'الاطلاع على الخيارات القانونية المتاحة واختيار ما يناسب طبيعة عملك',
          'مقارنة الميزات والتكاليف لكل نوع لضمان توافقها مع خططك التجارية',
          'تحديد الهيكل القانوني النهائي والاحتفاظ به لاستخدامه في إعداد الوثائق الرسمية'
        ],
        options: [
          'Entreprise Individuelle (EI) – مؤسسة فردية، يتحمل صاحبها المسؤولية الكاملة عن الديون والالتزامات',
          'SARL/EURL (شركة ذات مسؤولية محدودة) – الأنسب للشركات الناشئة، حيث تكون مسؤولية الشركاء محدودة برأس المال المستثمر',
          'SPA (شركة مساهمة) – مناسبة للشركات الكبرى التي تحتاج إلى رأس مال كبير ولديها عدة مساهمين',
          'SNC (شركة تضامنية) – شراكة بين شخصين أو أكثر، يتحمل الشركاء المسؤولية الكاملة عن الديون'
        ],
        cost: 'لا يوجد تكلفة خاصة باختيار نوع الشركة',
        timeframe: '24 ساعة',
        documents: [
          { id: '2-1', name: 'لا توجد وثائق مطلوبة', checked: true }
        ],
        notes: [
          'إذا كنت غير متأكد من الخيار المناسب، يُنصح باستشارة مختص قانوني أو محاسب',
          'يفضل معظم رواد الأعمال الجدد اختيار SARL/EURL نظرًا لمرونته وحماية الشركاء من المسؤولية المالية الشخصية',
          'بمجرد اختيار الهيكل القانوني، سيكون من الصعب تغييره دون إعادة هيكلة الشركة، لذا يجب اتخاذ القرار بعناية'
        ],
        checklistItems: [
          { id: '2-cl-1', text: 'تم الاطلاع على الخيارات القانونية المتاحة', checked: true },
          { id: '2-cl-2', text: 'تم اختيار الهيكل القانوني المناسب', checked: true },
          { id: '2-cl-3', text: 'تم إعداد الوثائق اللازمة لهذه المرحلة', checked: false }
        ]
      }
    },
    {
      id: 3,
      title: 'تحضير الوثائق الرسمية',
      status: 'incomplete',
      description: 'بعد اختيار اسم شركتك وهيكلها القانوني، تحتاج إلى تجهيز الوثائق المطلوبة لاستكمال عملية التسجيل. تأكد من أن جميع المستندات مستوفية للشروط القانونية لتجنب أي تأخير في الإجراءات. بعض هذه الوثائق تحتاج إلى تصديق رسمي لدى الموثق.',
      error: 'عقد إيجار مقر الشركة مفقود',
      details: {
        steps: [
          'بطاقة التعريف الوطنية للمؤسسين والمسير',
          'الحصول على شهادة حجز الاسم من المركز الوطني للسجل التجاري (CNRC)',
          'إعداد عقد الإيجار أو إثبات الملكية او شهادة الاستفادة لمقر في المسرعة للشركتك',
          'صياغة عقد التأسيس والنظام الأساسي وتوثيقه لدى الموثق',
          'التأكد من أن جميع الوثائق مكتملة وصحيحة قبل المتابعة إلى تسجيل الشركة رسميًا'
        ],
        cost: 'تعتمد تكلفة هذه المرحلة على نوع الشركة و رسوم الموثق المختار بين (5,000 دج و20,000 دج)',
        timeframe: '3-7 أيام',
        documents: [
          { id: '3-1', name: 'بطاقة التعريف الوطنية للمؤسسين والمسير', checked: true },
          { id: '3-2', name: 'شهادة حجز الاسم (من البطاقة 1)', checked: true },
          { id: '3-3', name: 'عقد الإيجار أو سند الملكية او الاستفادة للمقر الرسمي', checked: false },
          { id: '3-4', name: 'عقد التأسيس والنظام الأساسي من الموثق', checked: false }
        ],
        notes: [
          'عقد الإيجار يجب أن يكون باسم الشركة وليس باسم شخص طبيعي لضمان القبول القانوني',
          'يمكن للمؤسسين المسجلين في حاضنة الأعمال استخدام مقرها كمقر رسمي للشركة (حسب الاتفاق)',
          'عقد التأسيس والنظام الأساسي يحددان قواعد تشغيل الشركة، لذا يجب مراجعتهما جيدًا قبل التوقيع'
        ],
        checklistItems: [
          { id: '3-cl-1', text: 'تم استلام شهادة حجز الاسم', checked: true },
          { id: '3-cl-2', text: 'تم إعداد عقد الإيجار أو إثبات الملكية او الحصول على شهادة الاستفادة', checked: false },
          { id: '3-cl-3', text: 'تم توثيق عقد التأسيس والنظام الأساسي لدى الموثق', checked: false }
        ]
      }
    },
    {
      id: 4,
      title: 'تسجيل الشركة في السجل التجاري',
      status: 'incomplete',
      description: 'يُعد تسجيل شركتك في المركز الوطني للسجل التجاري (CNRC) خطوة أساسية لاكتساب الشخصية القانونية وبدء النشاط رسميًا. بمجرد إكمال هذه المرحلة، ستحصل على السجل التجاري الذي يتيح لك إجراء المعاملات التجارية والتعامل مع الجهات الرسمية.',
      details: {
        steps: [
          'تجهيز ملف التسجيل الذي يحتوي على جميع الوثائق المطلوبة',
          'تقديم الملف إلى المركز الوطني للسجل التجاري (CNRC) في ولايتك',
          'دفع رسوم التسجيل وإتمام الإجراءات الإدارية',
          'استلام شهادة السجل التجاري خلال 24 ساعة بعد الموافقة'
        ],
        cost: 'رسوم تسجيل الشركة: تتراوح بين 9,000 دج و12,000 دج حسب نوع الشركة',
        timeframe: '24 ساعة',
        documents: [
          { id: '4-1', name: 'شهادة حجز الاسم (من البطاقة 1)', checked: false },
          { id: '4-2', name: 'عقد التأسيس والنظام الأساسي الموثق (من البطاقة 3)', checked: false },
          { id: '4-3', name: 'بطاقة التعريف الوطنية للمسير', checked: false },
          { id: '4-4', name: 'عقد الإيجار أو سند الملكية او شهادة الاستفادة للمقر الرسمي', checked: false },
          { id: '4-5', name: 'استمارة التسجيل من CNRC (تُستخرج من المركز عند تقديم الطلب)', checked: false }
        ],
        notes: [
          'يجب تقديم الملف كاملًا، حيث أن أي نقص في الوثائق قد يؤدي إلى تأخير في التسجيل',
          'السجل التجاري هو الوثيقة الرسمية التي تثبت قانونية الشركة، لذا يجب الاحتفاظ به في مكان آمن',
          'يمكن استخراج نسخ إضافية من السجل التجاري لاحقًا لاستخدامها في التعاملات الرسمية والمصرفية'
        ],
        checklistItems: [
          { id: '4-cl-1', text: 'تم تجهيز جميع الوثائق المطلوبة', checked: false },
          { id: '4-cl-2', text: 'تم تقديم الملف إلى CNRC', checked: false },
          { id: '4-cl-3', text: 'تم دفع رسوم التسجيل', checked: false },
          { id: '4-cl-4', text: 'تم استلام شهادة السجل التجاري', checked: false }
        ]
      }
    },
    {
      id: 5,
      title: 'التسجيل في الضمان الاجتماعي',
      status: 'incomplete',
      description: 'يُعد تسجيل الشركة والمسير في صندوق الضمان الاجتماعي (CNAS أو CASNOS) خطوة ضرورية لضمان الحقوق الاجتماعية والتأمينية. يجب على المسير والعاملين (إن وُجدوا) الاشتراك في أحد الصندوقين، وفقًا لوضعهم القانوني، لضمان التغطية الصحية والحقوق التقاعدية.',
      details: {
        steps: [
          'تحديد ما إذا كان المسير أجيرًا أو غير أجير لاختيار الصندوق المناسب',
          'جمع الوثائق المطلوبة وتعبئة استمارة التسجيل الخاصة بـ CNAS أو CASNOS',
          'تقديم الملف إلى مكتب CNAS أو CASNOS في الولاية التابعة لنشاط الشركة',
          'دفع الاشتراك السنوي والحصول على شهادة التسجيل في الضمان الاجتماعي'
        ],
        cost: 'رسوم الاشتراك السنوي في CASNOS: حوالي 32,000 دج (قد تتغير حسب القوانين السارية)\nرسوم CNAS تختلف حسب نسبة الاقتطاع من أجور الموظفين',
        timeframe: '48 ساعة',
        documents: [
          { id: '5-1', name: 'نسخة من السجل التجاري (من البطاقة 4)', checked: false },
          { id: '5-2', name: 'بطاقة التعريف الوطنية للمسير', checked: false },
          { id: '5-3', name: 'استمارة التسجيل في CNAS أو CASNOS (تُستخرج من المكتب المعني)', checked: false }
        ],
        notes: [
          'إذا كنت مسيرًا غير أجير يجب التسجيل في CASNOS ودفع الاشتراك السنوي بشكل دوري',
          'في حالة توظيف موظفين، يجب تسجيلهم في CNAS والالتزام بدفع الاقتطاعات الشهرية',
          'شهادة التسجيل في الضمان الاجتماعي ضرورية في التعاملات الرسمية، مثل فتح حساب بنكي أو التقديم على مشاريع دعم الدولة'
        ],
        checklistItems: [
          { id: '5-cl-1', text: 'تم تحديد نوع التسجيل (CNAS أو CASNOS)', checked: false },
          { id: '5-cl-2', text: 'تم تجهيز جميع الوثائق المطلوبة', checked: false },
          { id: '5-cl-3', text: 'تم تقديم الملف إلى الصندوق المختص', checked: false },
          { id: '5-cl-4', text: 'تم دفع رسوم الاشتراك السنوي', checked: false },
          { id: '5-cl-5', text: 'تم استلام شهادة التسجيل في الضمان الاجتماعي', checked: false }
        ]
      }
    },
    {
      id: 6,
      title: 'الحصول على الرقم الجبائي',
      status: 'incomplete',
      description: 'الرقم الجبائي هو معرف ضريبي ضروري لكل شركة مسجلة، ويُستخدم في جميع المعاملات المالية والقانونية، مثل الفواتير، التصريحات الضريبية، والتعامل مع البنوك والإدارات الرسمية. بمجرد تسجيل شركتك في مديرية الضرائب، ستحصل على الرقم الجبائي الخاص بها، مما يتيح لك بدء النشاط التجاري رسميًا وفقًا للقوانين الجبائية.',
      details: {
        steps: [
          'تجهيز الملف الضريبي الذي يحتوي على جميع الوثائق المطلوبة',
          'تقديم الملف إلى مديرية الضرائب المحلية التابعة لمقر الشركة',
          'انتظار معالجة الطلب من طرف مصلحة الضرائب',
          'استلام الرقم الجبائي الخاص بالشركة خلال 2-3 أيام'
        ],
        cost: 'هذه الخدمة مجانية ولا تتطلب أي رسوم إضافية',
        timeframe: '2-3 أيام',
        documents: [
          { id: '6-1', name: 'بطاقة التعريف الوطنية للمسير', checked: false },
          { id: '6-2', name: 'نسخة من السجل التجاري (من البطاقة 4)', checked: false },
          { id: '6-3', name: 'عقد الإيجار أو سند الملكية للمقر الرسمي', checked: false }
        ],
        notes: [
          'الرقم الجبائي ضروري لإصدار الفواتير وإجراء أي معاملة مالية باسم الشركة',
          'يجب تسجيل الرقم الجبائي في جميع العقود والفواتير الرسمية لتجنب المخالفات الضريبية',
          'يمكن لاحقًا طلب شهادة الترقيم الجبائي عند الحاجة إلى إثبات التسجيل الضريبي'
        ],
        checklistItems: [
          { id: '6-cl-1', text: 'تم تجهيز جميع الوثائق المطلوبة', checked: false },
          { id: '6-cl-2', text: 'تم تقديم الملف إلى مديرية الضرائب', checked: false },
          { id: '6-cl-3', text: 'تم استلام الرقم الجبائي', checked: false }
        ]
      }
    },
    {
      id: 7,
      title: 'الحصول على الرقم الإحصائي',
      status: 'incomplete',
      description: 'الرقم الإحصائي هو معرف يمنحه الديوان الوطني للإحصائيات (ONS) لكل شركة مسجلة في الجزائر، وهو ضروري لإنشاء التقارير الإدارية والمالية الخاصة بالشركة. يتم استخدامه في الإحصائيات الوطنية، التصريحات السنوية، وبعض الإجراءات القانونية.',
      details: {
        steps: [
          'تجهيز ملف التسجيل الإحصائي بجميع الوثائق المطلوبة',
          'تقديم الملف إلى الديوان الوطني للإحصائيات (ONS) في الولاية التابعة لنشاط الشركة',
          'انتظار معالجة الطلب من طرف ONS',
          'استلام شهادة الرقم الإحصائي خلال 1-2 يوم'
        ],
        cost: 'رسوم التسجيل الإحصائي: 2,000 دج تقريبًا',
        timeframe: '1-2 يوم',
        documents: [
          { id: '7-1', name: 'بطاقة التعريف الوطنية للمسير', checked: false },
          { id: '7-2', name: 'الرقم الجبائي (من البطاقة 6)', checked: false },
          { id: '7-3', name: 'نسخة من السجل التجاري (من البطاقة 4)', checked: false }
        ],
        notes: [
          'الرقم الإحصائي ضروري لإجراء بعض الإجراءات الإدارية والتقارير السنوية الخاصة بالشركة',
          'يمكن لاحقًا طلب شهادة التسجيل الإحصائي عند الحاجة إلى إثبات الوضع القانوني للشركة أمام الإدارات الأخرى',
          'هذا الرقم يستخدم أيضًا في بعض المعاملات التجارية والمناقصات الحكومية'
        ],
        checklistItems: [
          { id: '7-cl-1', text: 'تم تجهيز جميع الوثائق المطلوبة', checked: false },
          { id: '7-cl-2', text: 'تم تقديم الملف إلى ONS', checked: false },
          { id: '7-cl-3', text: 'تم دفع رسوم التسجيل', checked: false },
          { id: '7-cl-4', text: 'تم استلام شهادة الرقم الإحصائي', checked: false }
        ]
      }
    }
  ]);

  // Fetch registration steps from database when user profile is loaded
  useEffect(() => {
    if (user && profile) {
      fetchRegistrationSteps();
    }
  }, [user, profile]);

  const fetchRegistrationSteps = async () => {
    try {
      const { data, error } = await supabase
        .from('registration_steps')
        .select('*')
        .eq('profile_id', user?.id)
        .order('step_id', { ascending: true });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Map database data to our steps format
        setSteps(prevSteps => 
          prevSteps.map(step => {
            const dbStep = data.find(d => d.step_id === step.id);
            if (dbStep) {
              return {
                ...step,
                status: dbStep.status as 'complete' | 'progress' | 'incomplete',
                details: {
                  ...step.details,
                  documents: dbStep.documents as Document[] || step.details?.documents,
                  checklistItems: dbStep.checklist_items as ChecklistItem[] || step.details?.checklistItems,
                }
              };
            }
            return step;
          })
        );
      }
    } catch (error) {
      console.error('Error fetching registration steps:', error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء محاولة تحميل خطوات التسجيل",
        variant: "destructive",
      });
    }
  };

  // Function to handle document checkbox toggle
  const handleDocumentToggle = async (stepId: number, docId: string, checked: boolean) => {
    setSteps(prevSteps => 
      prevSteps.map(step => {
        if (step.id === stepId && step.details?.documents) {
          const updatedDocs = step.details.documents.map(doc => {
            if (doc.id === docId) {
              return { ...doc, checked };
            }
            return doc;
          });
          
          return {
            ...step,
            details: {
              ...step.details,
              documents: updatedDocs
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

    // Update step status based on documents and checklist
    await updateStepStatus(stepId);
  };

  // Function to handle checklist item toggle
  const handleChecklistToggle = async (stepId: number, itemId: string, checked: boolean) => {
    setSteps(prevSteps => 
      prevSteps.map(step => {
        if (step.id === stepId && step.details?.checklistItems) {
          const updatedItems = step.details.checklistItems.map(item => {
            if (item.id === itemId) {
              return { ...item, checked };
            }
            return item;
          });
          
          return {
            ...step,
            details: {
              ...step.details,
              checklistItems: updatedItems
            }
          };
        }
        return step;
      })
    );

    // Display toast notification
    if (checked) {
      toast({
        title: "تم تحديث التقدم",
        description: "تم تأكيد إكمال خطوة جديدة بنجاح",
      });
    }

    // Update step status based on documents and checklist
    await updateStepStatus(stepId);
  };

  // Function to update step status based on checklist and document completion
  const updateStepStatus = async (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return;

    const checklistComplete = step.details?.checklistItems?.every(item => item.checked) ?? false;
    const documentsComplete = step.details?.documents?.every(doc => doc.checked) ?? false;
    
    let newStatus: 'complete' | 'progress' | 'incomplete';
    
    // Only mark as complete if both checklist and documents are complete
    if (checklistComplete && documentsComplete) {
      newStatus = 'complete';
    } else if (step.details?.checklistItems?.some(item => item.checked) || 
              step.details?.documents?.some(doc => doc.checked)) {
      newStatus = 'progress';
    } else {
      newStatus = 'incomplete';
    }

    // Update state
    setSteps(prevSteps => 
      prevSteps.map(s => {
        if (s.id === stepId) {
          return { ...s, status: newStatus };
        }
        return s;
      })
    );

    // Save to database
    try {
      const stepToUpdate = steps.find(s => s.id === stepId);
      if (stepToUpdate && user) {
        const { error } = await supabase
          .from('registration_steps')
          .upsert({
            profile_id: user.id,
            step_id: stepId,
            status: newStatus,
            documents: stepToUpdate.details?.documents || null,
            checklist_items: stepToUpdate.details?.checklistItems || null,
            updated_at: new Date().toISOString(),
            completed_at: newStatus === 'complete' ? new Date().toISOString() : null
          })
          .eq('profile_id', user.id)
          .eq('step_id', stepId);

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error updating registration step:', error);
    }
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const total = steps.length;
    const completed = steps.filter(step => step.status === 'complete').length;
    const inProgress = steps.filter(step => step.status === 'progress').length * 0.5;
    
    // Calculate document and checklist completion for in-progress steps
    let progressPoints = 0;
    steps.filter(step => step.status === 'progress').forEach(step => {
      // Document progress
      if (step.details?.documents && step.details.documents.length > 0) {
        const totalDocs = step.details.documents.length;
        const checkedDocs = step.details.documents.filter(doc => doc.checked).length;
        progressPoints += (checkedDocs / totalDocs) * 0.25 / total;
      }
      
      // Checklist progress
      if (step.details?.checklistItems && step.details.checklistItems.length > 0) {
        const totalItems = step.details.checklistItems.length;
        const checkedItems = step.details.checklistItems.filter(item => item.checked).length;
        progressPoints += (checkedItems / totalItems) * 0.25 / total;
      }
    });
    
    return Math.round(((completed + inProgress + progressPoints) / total) * 100);
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

  // Startup information
  const startupInfo = {
    name: profile?.company_name || "شركة ناشئة",
    founderName: profile?.founder_name || "المؤسس",
    phone: profile?.phone || "0000000000",
    email: user?.email || "info@example.com"
  };

  // Show welcome toast on initial render
  useEffect(() => {
    if (profile) {
      setTimeout(() => {
        toast({
          title: `مرحباً بك ${profile.founder_name}`,
          description: "اتبع الخطوات المذكورة لإكمال تسجيل شركتك بنجاح",
        });
      }, 1000);
    }
  }, [profile]);

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header 
        startupName={startupInfo.name}
        progressPercentage={progressPercentage}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* بطاقة المعلومات الشخصية */}
            <div className="bg-white rounded-xl shadow-card p-6 animate-fade-in">
              <h2 className="text-lg font-semibold mb-4">المعلومات الشخصية</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">اسم الشركة:</span>
                  <span className="font-medium">{startupInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">اسم المؤسس:</span>
                  <span className="font-medium">{startupInfo.founderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الهاتف:</span>
                  <span className="font-medium ltr">{startupInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">البريد الإلكتروني:</span>
                  <span className="font-medium ltr">{startupInfo.email}</span>
                </div>
              </div>
            </div>
            
            {/* بطاقة تقدم التسجيل */}
            <MetricsPanel
              completionPercentage={progressPercentage}
              estimatedTime={estimatedTime}
              daysRemaining={14}
              estimatedCost={estimatedCost}
            />
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
