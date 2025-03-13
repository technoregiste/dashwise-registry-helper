
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [founderName, setFounderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل الدخول بالفعل
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/dashboard');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // تسجيل الدخول
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك مرة أخرى في منصة تسجيل الشركات",
        });
        
        navigate('/dashboard');
      } else {
        // إنشاء حساب جديد
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              founder_name: founderName,
              company_name: companyName,
              company_number: companyNumber,
              phone: phone,
            },
          },
        });

        if (error) throw error;
        
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب",
        });
      }
    } catch (error: any) {
      toast({
        title: "خطأ في العملية",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-secondary/30 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">ر</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">منصة تسجيل الشركات الناشئة</h1>
          <p className="text-muted-foreground">
            {isLogin ? "تسجيل الدخول إلى حسابك" : "إنشاء حساب جديد"}
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                كلمة المرور
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="أدخل كلمة المرور"
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="founderName" className="block text-sm font-medium mb-1">
                    اسم المؤسس
                  </label>
                  <Input
                    id="founderName"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    required
                    placeholder="أدخل اسم المؤسس"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                    اسم الشركة
                  </label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="أدخل اسم الشركة"
                  />
                </div>

                <div>
                  <label htmlFor="companyNumber" className="block text-sm font-medium mb-1">
                    رقم السجل التجاري
                  </label>
                  <Input
                    id="companyNumber"
                    value={companyNumber}
                    onChange={(e) => setCompanyNumber(e.target.value)}
                    required
                    placeholder="أدخل رقم السجل التجاري"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    رقم الهاتف
                  </label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "جاري التحميل..."
                : isLogin
                ? "تسجيل الدخول"
                : "إنشاء حساب"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "ليس لديك حساب؟ إنشاء حساب جديد"
                : "لديك حساب بالفعل؟ تسجيل الدخول"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
