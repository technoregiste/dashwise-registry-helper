
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { StepData, ProfileData } from '@/types/dashboard';
import { Json } from '@/integrations/supabase/types';

// Default steps data
const defaultSteps: StepData[] = [
  {
    id: 1,
    title: 'اختيار اسم الشركة',
    status: 'incomplete',
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
        { id: '1-1', name: 'لا توجد وثائق مطلوبة لتقديم الطلب', checked: false },
        { id: '1-2', name: '(بعد الحجز) شهادة حجز الاسم', checked: false }
      ],
      notes: [
        'إذا تم رفض الأسماء المقترحة، يمكن تقديم مجموعة جديدة من الأسماء وإعادة المحاولة',
        'يُفضل اختيار أسماء تعكس طبيعة نشاط الشركة وتكون سهلة التذكر والنطق',
        'بعد الحصول على شهادة حجز الاسم، يجب المحافظة عليها جيدا وانشاء نسخ لأنها مطلوبة في الخطوات القادمة'
      ],
      checklistItems: [
        { id: '1-cl-1', text: 'تم تقديم 4 أسماء مقترحة', checked: false },
        { id: '1-cl-2', text: 'تم التحقق من توفر الاسم في مركز CNRC', checked: false },
        { id: '1-cl-3', text: 'تم حجز الاسم رسميًا', checked: false },
        { id: '1-cl-4', text: 'تم استلام شهادة حجز الاسم', checked: false }
      ]
    }
  },
  {
    id: 2,
    title: 'اختيار الهيكل القانوني',
    status: 'incomplete',
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
        { id: '2-1', name: 'لا توجد وثائق مطلوبة', checked: false }
      ],
      notes: [
        'إذا كنت غير متأكد من الخيار المناسب، يُنصح باستشارة مختص قانوني أو محاسب',
        'يفضل معظم رواد الأعمال الجدد اختيار SARL/EURL نظرًا لمرونته وحماية الشركاء من المسؤولية المالية الشخصية',
        'بمجرد اختيار الهيكل القانوني، سيكون من الصعب تغييره دون إعادة هيكلة الشركة، لذا يجب اتخاذ القرار بعناية'
      ],
      checklistItems: [
        { id: '2-cl-1', text: 'تم الاطلاع على الخيارات القانونية المتاحة', checked: false },
        { id: '2-cl-2', text: 'تم اختيار الهيكل القانوني المناسب', checked: false },
        { id: '2-cl-3', text: 'تم إعداد الوثائق اللازمة لهذه المرحلة', checked: false }
      ]
    }
  },
  {
    id: 3,
    title: 'تحضير الوثائق الرسمية',
    status: 'incomplete',
    description: 'بعد اختيار اسم شركتك وهيكلها القانوني، تحتاج إلى تجهيز الوثائق المطلوبة لاستكمال عملية التسجيل. تأكد من أن جميع المستندات مستوفية للشروط القانونية لتجنب أي تأخير في الإجراءات. بعض هذه الوثائق تحتاج إلى تصديق رسمي لدى الموثق.',
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
        { id: '3-1', name: 'بطاقة التعريف الوطنية للمؤسسين والمسير', checked: false },
        { id: '3-2', name: 'شهادة حجز الاسم (من البطاقة 1)', checked: false },
        { id: '3-3', name: 'عقد الإيجار أو سند الملكية او شهادة الاستفادة للمقر الرسمي', checked: false },
        { id: '3-4', name: 'عقد التأسيس والنظام الأساسي من الموثق', checked: false }
      ],
      notes: [
        'عقد الإيجار يجب أن يكون باسم الشركة وليس باسم شخص طبيعي لضمان القبول القانوني',
        'يمكن للمؤسسين المسجلين في حاضنة الأعمال استخدام مقرها كمقر رسمي للشركة (حسب الاتفاق)',
        'عقد التأسيس والنظام الأساسي يحددان قواعد تشغيل الشركة، لذا يجب مراجعتهما جيدًا قبل التوقيع'
      ],
      checklistItems: [
        { id: '3-cl-1', text: 'تم استلام شهادة حجز الاسم', checked: false },
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
];

export function useDashboardData() {
  const { user } = useAuth();
  const [steps, setSteps] = useState<StepData[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const pendingSyncs = useRef<Record<number, NodeJS.Timeout>>({});
  const isMounted = useRef(true);

  // Create an immediate database sync function with debounce protection
  const syncToDatabase = useCallback(async (updatedSteps: StepData[]) => {
    if (!user || !isMounted.current) return;

    try {
      // Process and save each modified step to ensure data persistence
      const syncPromises = updatedSteps.map(step => updateStepInDatabase(step.id, step));
      await Promise.all(syncPromises);
      console.log('All steps synced to database successfully');
    } catch (error) {
      console.error('Error during batch sync to database:', error);
    }
  }, [user]);

  // Debounced sync function to avoid too many database calls
  const debouncedSync = useCallback((stepId: number, step: StepData) => {
    // Clear any pending sync for this step
    if (pendingSyncs.current[stepId]) {
      clearTimeout(pendingSyncs.current[stepId]);
    }

    // Set a new timeout for this step
    pendingSyncs.current[stepId] = setTimeout(() => {
      updateStepInDatabase(stepId, step);
      delete pendingSyncs.current[stepId];
    }, 500); // 500ms debounce
  }, []);

  // Immediate sync for critical changes
  const immediateSync = useCallback((stepId: number, step: StepData) => {
    if (pendingSyncs.current[stepId]) {
      clearTimeout(pendingSyncs.current[stepId]);
      delete pendingSyncs.current[stepId];
    }
    return updateStepInDatabase(stepId, step);
  }, []);

  // Initialize user data when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        
        setProfile(profileData);

        // Fetch user steps data
        const { data: stepsData, error: stepsError } = await supabase
          .from('registration_steps')
          .select('*')
          .eq('profile_id', user.id)
          .order('step_id', { ascending: true });

        if (stepsError) throw stepsError;

        if (stepsData && stepsData.length > 0) {
          // Process and format steps from database
          const formattedSteps = [];
          
          for (let i = 1; i <= 7; i++) {
            const dbStep = stepsData.find((step: any) => step.step_id === i);
            const defaultStep = defaultSteps.find(s => s.id === i) || defaultSteps[0];
            
            if (dbStep) {
              // Map database status to frontend status
              let frontendStatus = 'incomplete';
              if (dbStep.status === 'complete') {
                frontendStatus = 'complete';
              } else if (dbStep.status === 'progress' || dbStep.status === 'in_progress') {
                frontendStatus = 'progress';
              } else if (dbStep.status === 'pending' || dbStep.status === 'incomplete') {
                frontendStatus = 'incomplete';
              }
              
              // Create step with data from database, falling back to defaults when needed
              formattedSteps.push({
                ...defaultStep,
                id: i,
                status: frontendStatus as any,
                details: {
                  ...defaultStep.details,
                  documents: dbStep.documents || defaultStep.details?.documents,
                  checklistItems: dbStep.checklist_items || defaultStep.details?.checklistItems
                }
              });
            } else {
              // Create a new step in the database if it doesn't exist
              const newStep = {
                ...defaultStep,
                id: i,
                status: 'incomplete' as any
              };
              
              formattedSteps.push(newStep);
              
              // Initialize the step in the database
              initializeStepInDatabase(i, user.id, newStep);
            }
          }
          
          setSteps(formattedSteps);
        } else {
          // If no steps in database, use all default steps and initialize them
          setSteps(defaultSteps);
          
          // Initialize all steps in the database
          defaultSteps.forEach(step => {
            initializeStepInDatabase(step.id, user.id, step);
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "خطأ في تحميل البيانات",
          description: "حدث خطأ أثناء تحميل بياناتك، يرجى المحاولة مرة أخرى لاحقًا",
          variant: "destructive",
        });
        
        // If error, fallback to default steps
        setSteps(defaultSteps);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    
    return () => {
      // Cleanup function
      isMounted.current = false;
    };
  }, [user]);

  // Initialize a new step in the database
  const initializeStepInDatabase = async (stepId: number, profileId: string, step: StepData) => {
    try {
      // Map frontend status to database status
      let dbStatus = 'pending';
      if (step.status === 'complete') {
        dbStatus = 'complete';
      } else if (step.status === 'progress') {
        dbStatus = 'progress';
      } else if (step.status === 'incomplete') {
        dbStatus = 'pending';
      }

      // Fix: Convert documents and checklist items to valid JSON objects for the database
      const documents = step.details?.documents ? step.details.documents as unknown as Json : null;
      const checklistItems = step.details?.checklistItems ? step.details.checklistItems as unknown as Json : null;

      // Create new step in database - Pass an array with one properly typed object
      const { error } = await supabase
        .from('registration_steps')
        .upsert([{
          profile_id: profileId,
          step_id: stepId,
          status: dbStatus,
          documents: documents,
          checklist_items: checklistItems,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (error) throw error;
    } catch (error) {
      console.error(`Error initializing step ${stepId} in database:`, error);
    }
  };

  // Ensure data is synced when user navigates away or closes the browser
  useEffect(() => {
    const syncOnUnmount = () => {
      if (user && steps.length > 0) {
        syncToDatabase(steps);
      }
    };

    // Add event listener for beforeunload to capture page closes/refreshes
    window.addEventListener('beforeunload', syncOnUnmount);

    // Add event listener for visibilitychange to capture tab switching or closing
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        syncOnUnmount();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('beforeunload', syncOnUnmount);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Final sync on component unmount
      syncOnUnmount();
      
      // Clear all pending syncs
      Object.keys(pendingSyncs.current).forEach(key => {
        clearTimeout(pendingSyncs.current[parseInt(key)]);
      });
    };
  }, [user, steps, syncToDatabase]);

  // Update step in database with retries
  const updateStepInDatabase = async (stepId: number, updatedStep: any) => {
    if (!user || !isMounted.current) return;

    // Map frontend status to database status
    let dbStatus = 'pending';
    if (updatedStep.status === 'complete') {
      dbStatus = 'complete';
    } else if (updatedStep.status === 'progress') {
      dbStatus = 'progress';
    } else if (updatedStep.status === 'incomplete') {
      dbStatus = 'pending';
    }

    const maxRetries = 3;
    let retries = 0;
    let success = false;

    while (retries < maxRetries && !success) {
      try {
        // Fix: Convert documents and checklist items to valid JSON objects for the database
        const documents = updatedStep.details?.documents ? updatedStep.details.documents as unknown as Json : null;
        const checklistItems = updatedStep.details?.checklistItems ? updatedStep.details.checklistItems as unknown as Json : null;

        // Fix: Pass an array with one properly typed object to upsert
        const { error } = await supabase
          .from('registration_steps')
          .upsert([{
            profile_id: user.id,
            step_id: stepId,
            status: dbStatus,
            documents: documents,
            checklist_items: checklistItems,
            completed_at: updatedStep.status === 'complete' ? new Date().toISOString() : null,
            updated_at: new Date().toISOString()
          }]);

        if (error) throw error;
        success = true;
      } catch (error) {
        console.error(`Error updating step ${stepId} in database (retry ${retries + 1}/${maxRetries}):`, error);
        retries++;
        
        if (retries >= maxRetries) {
          if (isMounted.current) {
            toast({
              title: "خطأ في حفظ البيانات",
              description: "حدث خطأ أثناء حفظ تقدمك، يرجى المحاولة مرة أخرى",
              variant: "destructive",
            });
          }
          break;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
      }
    }

    return success;
  };

  // Handle document toggle
  const handleDocumentToggle = (stepId: number, docId: string, checked: boolean) => {
    setSteps(prevSteps => {
      const updatedSteps = prevSteps.map(step => {
        if (step.id === stepId && step.details?.documents) {
          const updatedStep = {
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
          
          const updatedStepWithStatus = updateStepStatus(updatedStep);
          
          // Debounced sync to database
          debouncedSync(stepId, updatedStepWithStatus);
          
          return updatedStepWithStatus;
        }
        return step;
      });
      
      return updatedSteps;
    });

    if (checked) {
      toast({
        title: "تم تحديث الوثائق",
        description: "تم تأكيد استلام وثيقة جديدة بنجاح",
      });
    }
  };

  // Handle checklist toggle
  const handleChecklistToggle = (stepId: number, itemId: string, checked: boolean) => {
    setSteps(prevSteps => {
      const updatedSteps = prevSteps.map(step => {
        if (step.id === stepId && step.details?.checklistItems) {
          const updatedStep = {
            ...step,
            details: {
              ...step.details,
              checklistItems: step.details.checklistItems.map(item => {
                if (item.id === itemId) {
                  return { ...item, checked };
                }
                return item;
              })
            }
          };
          
          const updatedStepWithStatus = updateStepStatus(updatedStep);
          
          // Debounced sync to database
          debouncedSync(stepId, updatedStepWithStatus);
          
          return updatedStepWithStatus;
        }
        return step;
      });
      
      return updatedSteps;
    });

    if (checked) {
      toast({
        title: "تم تحديث التقدم",
        description: "تم تأكيد إكمال خطوة جديدة بنجاح",
      });
    }
  };

  // Update step status based on completed items
  const updateStepStatus = (step: StepData): StepData => {
    const checklistComplete = step.details?.checklistItems?.every(item => item.checked) ?? false;
    const documentsComplete = step.details?.documents?.every(doc => doc.checked) ?? false;
    
    if (checklistComplete && documentsComplete) {
      return { ...step, status: 'complete' };
    } else if (step.details?.checklistItems?.some(item => item.checked) || 
              step.details?.documents?.some(doc => doc.checked)) {
      return { ...step, status: 'progress' };
    } else {
      return { ...step, status: 'incomplete' };
    }
  };

  // Handle step click
  const handleStepClick = useCallback((stepId: number) => {
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
  }, [steps]);

  return {
    steps,
    profile,
    loading,
    handleDocumentToggle,
    handleChecklistToggle,
    handleStepClick,
    syncToDatabase // Expose this to allow manual syncing from other components
  };
}
