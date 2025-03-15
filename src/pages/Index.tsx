
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
import { motion } from 'framer-motion';

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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      {/* Header with Logo */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-4 px-6 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex justify-center">
          <h1 className="text-2xl font-bold text-primary">technoregiste</h1>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-20 pb-16 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            ابدأ شركتك الناشئة بسهولة – خطوات تسجيل شركتك في السجل التجاري
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            نقدم لك دليلاً شاملاً لتسجيل شركتك الناشئة في الجزائر خطوة بخطوة
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              onClick={handleCTA}
              className="text-lg px-8 py-6 rounded-xl shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300"
            >
              ابدأ الآن
              <ArrowRight size={20} />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Why This Site Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-16 px-6 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6 relative inline-block"
            variants={fadeIn}
          >
            لماذا هذا الموقع؟
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            تبسيط عملية التسجيل للشركات الناشئة في الجزائر – دليل عملي خطوة بخطوة لمساعدتك على الانطلاق بسرعة.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-8"
            variants={staggerContainer}
          >
            <motion.div 
              className="flex flex-col items-center max-w-xs transform transition-all duration-300 hover:scale-105"
              variants={itemAnimation}
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 shadow-md">
                <Timer className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">سريع وفعال</h3>
              <p className="text-muted-foreground text-center">توفير الوقت من خلال إرشادات واضحة</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center max-w-xs transform transition-all duration-300 hover:scale-105"
              variants={itemAnimation}
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 shadow-md">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">شفافية كاملة</h3>
              <p className="text-muted-foreground text-center">معلومات دقيقة عن جميع الإجراءات</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center max-w-xs transform transition-all duration-300 hover:scale-105"
              variants={itemAnimation}
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 shadow-md">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">دعم متكامل</h3>
              <p className="text-muted-foreground text-center">مساعدة مستمرة في كل مرحلة من مراحل التسجيل</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-16 px-6 bg-secondary/20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold mb-8 text-center relative inline-block mx-auto"
          >
            فوائد تسجيل شركتك رسميًا
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              variants={itemAnimation}
            >
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">الوصول إلى السوق القانوني</h3>
                  <p className="text-muted-foreground">يمكنك العمل بشكل رسمي والتعامل مع الشركات الأخرى.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              variants={itemAnimation}
            >
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">فتح حساب بنكي تجاري</h3>
                  <p className="text-muted-foreground">يسهل عليك تلقي المدفوعات وإدارة أموالك.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              variants={itemAnimation}
            >
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <FileSignature className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">إمكانية التعاقد مع الشركات الكبرى</h3>
                  <p className="text-muted-foreground">العديد من الجهات لا تتعامل إلا مع الشركات المسجلة.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              variants={itemAnimation}
            >
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">الحصول على تمويل ودعم حكومي</h3>
                  <p className="text-muted-foreground">الشركات الناشئة المسجلة يمكنها الاستفادة من برامج الدعم.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              variants={itemAnimation}
            >
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">حماية قانونية وملكية رسمية</h3>
                  <p className="text-muted-foreground">تسجيل الشركة يمنحك الحماية القانونية لعلامتك التجارية وأعمالك.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              variants={itemAnimation}
            >
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg ml-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">الاستفادة من خدمات المسرعة</h3>
                  <p className="text-muted-foreground">بمجرد تسجيل شركتك، يمكنك الانضمام إلى المسرعة والحصول على الإرشاد والمساحات المكتبية.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Countdown Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-16 px-6 bg-white"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold mb-6"
          >
            العد التنازلي لأجل التسجيل
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-muted-foreground mb-8"
          >
            ⏳ الموعد النهائي للتسجيل ينتهي خلال:
          </motion.p>
          
          <motion.div 
            className="flex justify-center gap-4 mb-8"
            variants={staggerContainer}
          >
            <motion.div 
              variants={itemAnimation}
              className="bg-secondary p-4 rounded-xl w-20 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <div className="text-3xl font-bold text-primary">{countdownTime.days}</div>
              <div className="text-sm text-muted-foreground">أيام</div>
            </motion.div>
            <motion.div 
              variants={itemAnimation}
              className="bg-secondary p-4 rounded-xl w-20 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <div className="text-3xl font-bold text-primary">{countdownTime.hours}</div>
              <div className="text-sm text-muted-foreground">ساعات</div>
            </motion.div>
            <motion.div 
              variants={itemAnimation}
              className="bg-secondary p-4 rounded-xl w-20 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <div className="text-3xl font-bold text-primary">{countdownTime.minutes}</div>
              <div className="text-sm text-muted-foreground">دقائق</div>
            </motion.div>
            <motion.div 
              variants={itemAnimation}
              className="bg-secondary p-4 rounded-xl w-20 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <div className="text-3xl font-bold text-primary">{countdownTime.seconds}</div>
              <div className="text-sm text-muted-foreground">ثواني</div>
            </motion.div>
          </motion.div>
          
          <motion.p 
            variants={fadeIn}
            className="text-lg mb-6"
          >
            لا تفوّت فرصتك! قدّم طلبك قبل انتهاء المهلة.
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleCTA}
              size="lg"
              className="px-8 shadow-md hover:shadow-lg transition-all duration-300"
            >
              سجّل الآن
              <ArrowRight size={20} />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Steps Preview Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-16 px-6 bg-secondary/20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold mb-8 text-center"
          >
            الخطوات الرئيسية
          </motion.h2>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            <motion.div 
              variants={itemAnimation}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-card text-center transform transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">تحضير المستندات المطلوبة</h3>
              <p className="text-sm text-muted-foreground">جمع كافة الوثائق اللازمة للتسجيل</p>
            </motion.div>
            
            <motion.div 
              variants={itemAnimation}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-card text-center transform transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">إيداع الطلب عبر الجهات الرسمية</h3>
              <p className="text-sm text-muted-foreground">تقديم الطلب للجهات المختصة</p>
            </motion.div>
            
            <motion.div 
              variants={itemAnimation}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-card text-center transform transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">مراجعة الملفات والموافقة</h3>
              <p className="text-sm text-muted-foreground">انتظار المراجعة والموافقة على الطلب</p>
            </motion.div>
            
            <motion.div 
              variants={itemAnimation}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-card text-center transform transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Rocket className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">استلام السجل التجاري والانطلاق!</h3>
              <p className="text-sm text-muted-foreground">بدء العمل رسميًا بعد استلام السجل</p>
            </motion.div>
          </motion.div>
          
          <div className="text-center mt-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleCTA}
                variant="outline" 
                size="lg"
                className="hover:shadow-md transition-all duration-300"
              >
                عرض الدليل الكامل
                <ArrowRight size={20} />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="py-20 px-6 bg-primary/5 border-t border-primary/10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold mb-6"
          >
            لا تضيع وقتك في الإجراءات المعقدة
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-muted-foreground mb-8"
          >
            دعنا نرشدك خطوة بخطوة في عملية تسجيل شركتك الناشئة
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleCTA}
              size="lg" 
              className="px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              ابدأ الآن
              <ArrowRight size={20} />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
