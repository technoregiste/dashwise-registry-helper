import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("startup");
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(true);
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
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
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
      if (isAdminLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword,
        });

        if (error) throw error;
        
        const user = data.user;
        const isAdmin = user?.app_metadata?.role === 'admin';
        
        if (!isAdmin) {
          await supabase.auth.signOut();
          throw new Error("لا تملك صلاحيات إدارية. يرجى تسجيل الدخول كمسؤول.");
        }
        
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة التحكم الإدارية",
        });
        
        navigate('/admin');
      } else {
        const { error } = await supabase.auth.signUp({
          email: adminEmail,
          password: adminPassword,
          options: {
            data: {
              name: adminName,
              role: 'admin',
            },
          },
        });

        if (error) throw error;
        
        toast({
          title: "تم إنشاء حساب المسؤول بنجاح",
          description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب",
        });
      }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-secondary/30 p-6 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-6 z-30"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          العودة للصفحة الرئيسية
        </Button>
      </motion.div>
      
      <div className="w-full max-w-md relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-3"
          >
            <span className="text-white font-bold text-3xl">ت</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold mb-2"
          >
            منصة تسجيل الشركات الناشئة
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground"
          >
            منصة لتسهيل إجراءات تسجيل الشركات الناشئة
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="startup" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="startup" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                صاحب شركة ناشئة
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                مسؤول النظام
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === "startup" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === "startup" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="startup">
                  <Card className="p-6 shadow-lg border-0">
                    <form onSubmit={handleStartupAuth} className="space-y-4">
                      <motion.div variants={itemVariants}>
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
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
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
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </motion.div>

                      <AnimatePresence>
                        {!isLogin && (
                          <>
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Label htmlFor="founderName" className="block text-sm font-medium mb-1">
                                اسم المؤسس
                              </Label>
                              <Input
                                id="founderName"
                                value={founderName}
                                onChange={(e) => setFounderName(e.target.value)}
                                required
                                placeholder="أدخل اسم المؤسس"
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              <Label htmlFor="companyName" className="block text-sm font-medium mb-1">
                                اسم الشركة
                              </Label>
                              <Input
                                id="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                                placeholder="أدخل اسم الشركة"
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            >
                              <Label htmlFor="companyNumber" className="block text-sm font-medium mb-1">
                                رقم السجل التجاري
                              </Label>
                              <Input
                                id="companyNumber"
                                value={companyNumber}
                                onChange={(e) => setCompanyNumber(e.target.value)}
                                required
                                placeholder="أدخل رقم السجل التجاري"
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                            >
                              <Label htmlFor="phone" className="block text-sm font-medium mb-1">
                                رقم الهاتف
                              </Label>
                              <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="أدخل رقم الهاتف"
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>

                      <motion.div 
                        variants={itemVariants}
                        className="pt-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg shadow-md transition-all duration-200"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              جاري التحميل...
                            </>
                          ) : isLogin ? (
                            "تسجيل الدخول"
                          ) : (
                            "إنشاء حساب"
                          )}
                        </Button>
                      </motion.div>

                      <motion.div 
                        className="mt-4 text-center"
                        variants={itemVariants}
                      >
                        <button
                          type="button"
                          className="text-sm text-primary hover:underline"
                          onClick={() => setIsLogin(!isLogin)}
                        >
                          {isLogin
                            ? "ليس لديك حساب؟ إنشاء حساب جديد"
                            : "لديك حساب بالفعل؟ تسجيل الدخول"}
                        </button>
                      </motion.div>
                    </form>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === "admin" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === "admin" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="admin">
                  <Card className="p-6 shadow-lg border-0">
                    <form onSubmit={handleAdminAuth} className="space-y-4">
                      <motion.div variants={itemVariants}>
                        <Label htmlFor="adminEmail" className="block text-sm font-medium mb-1">
                          البريد الإلكتروني للمسؤول
                        </Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          required
                          placeholder="technoregiste@gmail.com"
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Label htmlFor="adminPassword" className="block text-sm font-medium mb-1">
                          كلمة المرور
                        </Label>
                        <Input
                          id="adminPassword"
                          type="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          required
                          placeholder="••••••••••••"
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </motion.div>

                      <AnimatePresence>
                        {!isAdminLogin && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Label htmlFor="adminName" className="block text-sm font-medium mb-1">
                              اسم المسؤول
                            </Label>
                            <Input
                              id="adminName"
                              value={adminName}
                              onChange={(e) => setAdminName(e.target.value)}
                              required
                              placeholder="أدخل اسم المسؤول"
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div 
                        variants={itemVariants}
                        className="pt-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg shadow-md transition-all duration-200"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              جاري التحميل...
                            </>
                          ) : (
                            isAdminLogin ? "تسجيل دخول المسؤول" : "إنشاء حساب مسؤول"
                          )}
                        </Button>
                      </motion.div>

                      <motion.div 
                        className="mt-4 text-center"
                        variants={itemVariants}
                      >
                        <button
                          type="button"
                          className="text-sm text-primary hover:underline"
                          onClick={() => setIsAdminLogin(!isAdminLogin)}
                        >
                          {isAdminLogin
                            ? "ليس لديك حساب مسؤول؟ أنشئ حساب جديد"
                            : "لديك حساب مسؤول بالفعل؟ تسجيل الدخول"}
                        </button>
                      </motion.div>
                    </form>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
