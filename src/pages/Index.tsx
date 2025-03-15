
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Timer, 
  FileText, 
  Globe, 
  FileCheck, 
  CheckCircle2, 
  Building2,
  Briefcase,
  Wallet,
  FileSignature,
  Shield,
  Rocket
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [countdownTime, setCountdownTime] = useState({
    days: 15,
    hours: 8,
    minutes: 30,
    seconds: 0
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // Reset countdown when it reaches zero
                days = 15;
                hours = 8;
                minutes = 30;
                seconds = 0;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleCTA = () => {
    navigate(user ? '/dashboard' : '/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">ر</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ابدأ شركتك الناشئة بسهولة – خطوات تسجيل شركتك في السجل التجاري
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            نقدم لك دليلاً شاملاً لتسجيل شركتك الناشئة في الجزائر خطوة بخطوة
          </p>
          <Button 
            size="lg" 
            onClick={handleCTA}
            className="text-lg px-8 py-6 rounded-xl button-hover"
          >
            ابدأ الآن
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>

      {/* Why This Site Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">لماذا هذا الموقع؟</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            تبسيط عملية التسجيل للشركات الناشئة في الجزائر – دليل عملي خطوة بخطوة لمساعدتك على الانطلاق بسرعة.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Timer className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">سريع وفعال</h3>
              <p className="text-muted-foreground text-center">توفير الوقت من خلال إرشادات واضحة</p>
            </div>
            
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">شفافية كاملة</h3>
              <p className="text-muted-foreground text-center">معلومات دقيقة عن جميع الإجراءات</p>
            </div>
            
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">دعم متكامل</h3>
              <p className="text-muted-foreground text-center">مساعدة مستمرة في كل مرحلة من مراحل التسجيل</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">فوائد تسجيل شركتك رسميًا</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">الوصول إلى السوق القانوني</h3>
                  <p className="text-muted-foreground">يمكنك العمل بشكل رسمي والتعامل مع الشركات الأخرى.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">فتح حساب بنكي تجاري</h3>
                  <p className="text-muted-foreground">يسهل عليك تلقي المدفوعات وإدارة أموالك.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <FileSignature className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">إمكانية التعاقد مع الشركات الكبرى</h3>
                  <p className="text-muted-foreground">العديد من الجهات لا تتعامل إلا مع الشركات المسجلة.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">الحصول على تمويل ودعم حكومي</h3>
                  <p className="text-muted-foreground">الشركات الناشئة المسجلة يمكنها الاستفادة من برامج الدعم.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">حماية قانونية وملكية رسمية</h3>
                  <p className="text-muted-foreground">تسجيل الشركة يمنحك الحماية القانونية لعلامتك التجارية وأعمالك.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">الاستفادة من خدمات المسرعة</h3>
                  <p className="text-muted-foreground">بمجرد تسجيل شركتك، يمكنك الانضمام إلى المسرعة والحصول على الإرشاد والمساحات المكتبية.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">العد التنازلي لأجل التسجيل</h2>
          <p className="text-xl text-muted-foreground mb-8">
            ⏳ الموعد النهائي للتسجيل ينتهي خلال:
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-secondary p-4 rounded-xl w-20">
              <div className="text-3xl font-bold">{countdownTime.days}</div>
              <div className="text-sm text-muted-foreground">أيام</div>
            </div>
            <div className="bg-secondary p-4 rounded-xl w-20">
              <div className="text-3xl font-bold">{countdownTime.hours}</div>
              <div className="text-sm text-muted-foreground">ساعات</div>
            </div>
            <div className="bg-secondary p-4 rounded-xl w-20">
              <div className="text-3xl font-bold">{countdownTime.minutes}</div>
              <div className="text-sm text-muted-foreground">دقائق</div>
            </div>
            <div className="bg-secondary p-4 rounded-xl w-20">
              <div className="text-3xl font-bold">{countdownTime.seconds}</div>
              <div className="text-sm text-muted-foreground">ثواني</div>
            </div>
          </div>
          
          <p className="text-lg mb-6">لا تفوّت فرصتك! قدّم طلبك قبل انتهاء المهلة.</p>
          
          <Button 
            onClick={handleCTA}
            size="lg"
            className="px-8"
          >
            سجّل الآن
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>

      {/* Steps Preview Section */}
      <section className="py-16 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">الخطوات الرئيسية</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">تحضير المستندات المطلوبة</h3>
              <p className="text-sm text-muted-foreground">جمع كافة الوثائق اللازمة للتسجيل</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">إيداع الطلب عبر الجهات الرسمية</h3>
              <p className="text-sm text-muted-foreground">تقديم الطلب للجهات المختصة</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">مراجعة الملفات والموافقة</h3>
              <p className="text-sm text-muted-foreground">انتظار المراجعة والموافقة على الطلب</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-card text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Rocket className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">استلام السجل التجاري والانطلاق!</h3>
              <p className="text-sm text-muted-foreground">بدء العمل رسميًا بعد استلام السجل</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button 
              onClick={handleCTA}
              variant="outline" 
              size="lg"
            >
              عرض الدليل الكامل
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-primary/5 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">لا تضيع وقتك في الإجراءات المعقدة</h2>
          <p className="text-xl text-muted-foreground mb-8">
            دعنا نرشدك خطوة بخطوة في عملية تسجيل شركتك الناشئة
          </p>
          
          <Button 
            onClick={handleCTA}
            size="lg" 
            className="px-10 py-6 text-lg rounded-xl"
          >
            ابدأ الآن
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
