
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AuthLayout from '@/components/auth/AuthLayout';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [founderName, setFounderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [adminName, setAdminName] = useState("");

  const handleAccountTypeToggle = (checked: boolean) => {
    setIsAdmin(checked);
    // Reset form fields when switching account types
    if (checked) {
      setCompanyName("");
      setCompanyNumber("");
      setPhone("");
      setFounderName("");
    } else {
      setAdminName("");
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // If user is admin, redirect to admin dashboard
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
          
        if (!error && profileData?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Starting sign up process");
      
      // Create metadata based on account type
      const metadata = isAdmin 
        ? { 
            founder_name: adminName,
            role: 'admin' 
          }
        : {
            founder_name: founderName,
            company_name: companyName,
            company_number: companyNumber,
            phone: phone,
            role: 'user'
          };
      
      console.log("Sign up metadata:", metadata);
      
      // Step 1: Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        console.error("Supabase signup error:", error);
        throw error;
      }

      console.log("Sign up response:", data);
      
      if (data.user) {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب",
        });
        
        // Auto login the user
        console.log("Attempting auto-login");
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (loginError) {
          console.error("Auto-login error:", loginError);
          throw loginError;
        }
        
        console.log("Auto-login successful");
        
        // Redirect based on role
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Error in signup:', error);
      toast({
        title: "خطأ في العملية",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك مرة أخرى في منصة تسجيل الشركات",
      });
      
      // Redirect based on role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user?.id)
        .single();
        
      if (!profileError && profileData?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Error in login:', error);
      toast({
        title: "خطأ في العملية",
        description: error.message || "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignUp(e);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <AuthLayout>
      <AuthHeader />
      <AuthCard>
        {isLogin ? (
          <LoginForm 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            onSubmit={handleAuth}
            toggleForm={toggleForm}
          />
        ) : (
          <SignupForm 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            founderName={founderName}
            setFounderName={setFounderName}
            companyName={companyName}
            setCompanyName={setCompanyName}
            companyNumber={companyNumber}
            setCompanyNumber={setCompanyNumber}
            phone={phone}
            setPhone={setPhone}
            adminName={adminName}
            setAdminName={setAdminName}
            loading={loading}
            onSubmit={handleAuth}
            toggleForm={toggleForm}
            handleAccountTypeToggle={handleAccountTypeToggle}
          />
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default Auth;
