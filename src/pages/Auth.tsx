
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("startup");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Startup owner fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [founderName, setFounderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [phone, setPhone] = useState("");
  
  // Admin fields
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل الدخول بالفعل
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Check if user is an admin
        try {
          const { data: userData } = await supabase.auth.getUser();
          const isAdmin = userData?.user?.app_metadata?.role === 'admin';
          
          if (isAdmin) {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error checking user role:', error);
          navigate('/dashboard'); // Default to dashboard on error
        }
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleStartupAuth = async (e: React.FormEvent) => {
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
              role: 'startup',
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

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Admin login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });

      if (error) throw error;
      
      // Check if user has admin role
      const user = data.user;
      const isAdmin = user?.app_metadata?.role === 'admin';
      
      if (!isAdmin) {
        // Sign out if not admin
        await supabase.auth.signOut();
        throw new Error("لا تملك صلاحيات إدارية. يرجى تسجيل الدخول كمسؤول.");
      }
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم الإدارية",
      });
      
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "حدث خطأ أثناء تسجيل الدخول كمسؤول",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-secondary/30 p-6">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">ر</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">منصة تسجيل الشركات الناشئة</h1>
          <p className="text-muted-foreground">
            منصة لتسهيل إجراءات تسجيل الشركات الناشئة
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="startup" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="startup">صاحب شركة ناشئة</TabsTrigger>
              <TabsTrigger value="admin">مسؤول النظام</TabsTrigger>
            </TabsList>

            <TabsContent value="startup">
              <Card className="p-6">
                <form onSubmit={handleStartupAuth} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium mb-1">
                      البريد الإلكتروني
                    </Label>
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
                    <Label htmlFor="password" className="block text-sm font-medium mb-1">
                      كلمة المرور
                    </Label>
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
                        <Label htmlFor="founderName" className="block text-sm font-medium mb-1">
                          اسم المؤسس
                        </Label>
                        <Input
                          id="founderName"
                          value={founderName}
                          onChange={(e) => setFounderName(e.target.value)}
                          required
                          placeholder="أدخل اسم المؤسس"
                        />
                      </div>

                      <div>
                        <Label htmlFor="companyName" className="block text-sm font-medium mb-1">
                          اسم الشركة
                        </Label>
                        <Input
                          id="companyName"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                          placeholder="أدخل اسم الشركة"
                        />
                      </div>

                      <div>
                        <Label htmlFor="companyNumber" className="block text-sm font-medium mb-1">
                          رقم السجل التجاري
                        </Label>
                        <Input
                          id="companyNumber"
                          value={companyNumber}
                          onChange={(e) => setCompanyNumber(e.target.value)}
                          required
                          placeholder="أدخل رقم السجل التجاري"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="block text-sm font-medium mb-1">
                          رقم الهاتف
                        </Label>
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
            </TabsContent>

            <TabsContent value="admin">
              <Card className="p-6">
                <form onSubmit={handleAdminAuth} className="space-y-4">
                  <div>
                    <Label htmlFor="adminEmail" className="block text-sm font-medium mb-1">
                      البريد الإلكتروني للمسؤول
                    </Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                      placeholder="أدخل بريد المسؤول الإلكتروني"
                    />
                  </div>

                  <div>
                    <Label htmlFor="adminPassword" className="block text-sm font-medium mb-1">
                      كلمة المرور
                    </Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      placeholder="أدخل كلمة المرور"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "جاري التحميل..." : "تسجيل دخول المسؤول"}
                  </Button>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
