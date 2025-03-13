
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-secondary/30 rtl">
      <header className="bg-white shadow-subtle py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-semibold text-lg">ت</span>
            </div>
            <h1 className="text-xl font-semibold">تكنوريجستر</h1>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/dashboard">لوحة التحكم</Link>
                </Button>
                <Button variant="ghost" onClick={signOut}>
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/auth/signin">تسجيل الدخول</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth/signup">انشاء حساب</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">منصة تكنوريجستر لتسجيل الشركات الناشئة</h1>
          <p className="text-xl text-muted-foreground mb-8">
            المنصة الأولى في الجزائر لتسهيل وتسريع عملية تسجيل الشركات الناشئة وفقًا للقوانين الجزائرية
          </p>
          
          {user ? (
            <Button size="lg" asChild>
              <Link to="/dashboard">الذهاب إلى لوحة التحكم</Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link to="/auth/signup">ابدأ تسجيل شركتك الآن</Link>
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-xl font-semibold mb-3">سهل الاستخدام</h3>
            <p className="text-muted-foreground">
              واجهة سهلة الاستخدام تساعدك على تتبع خطوات التسجيل والوثائق المطلوبة بكل وضوح
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-xl font-semibold mb-3">توفير الوقت</h3>
            <p className="text-muted-foreground">
              وفر وقتك وجهدك من خلال معرفة كل الإجراءات والمتطلبات القانونية في مكان واحد
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h3 className="text-xl font-semibold mb-3">دعم متواصل</h3>
            <p className="text-muted-foreground">
              استفد من الدعم المستمر والإجابات عن أسئلتك الشائعة حول عملية التسجيل
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-16 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2023 تكنوريجستر - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
