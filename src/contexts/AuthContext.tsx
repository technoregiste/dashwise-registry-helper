
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  user: any | null;
  profile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
};

export type SignUpData = {
  email: string;
  password: string;
  founderName: string;
  companyName: string;
  companyNumber: string;
  phone: string;
  coFounders?: { name: string }[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبا بعودتك",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "حدث خطأ أثناء محاولة تسجيل الدخول",
        variant: "destructive",
      });
    }
  };

  const signUp = async (userData: SignUpData) => {
    try {
      // Sign up with Supabase Auth
      const { error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            founder_name: userData.founderName,
            company_name: userData.companyName,
            company_number: userData.companyNumber,
            phone: userData.phone,
          },
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "تم إنشاء حسابك بنجاح، يمكنك الآن تسجيل الدخول",
      });

      // Redirect to sign-in page
      navigate('/auth/signin');
    } catch (error: any) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: error.message || "حدث خطأ أثناء محاولة إنشاء الحساب",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      navigate('/');
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error.message || "حدث خطأ أثناء محاولة تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
