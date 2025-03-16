
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // تحميل الجلسة الحالية عند تحميل التطبيق
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        // Check if user is admin
        if (data.session?.user) {
          setIsAdmin(data.session.user.app_metadata?.role === 'admin' || false);
        }
      } catch (error) {
        console.error('خطأ في تحميل حالة المصادقة:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // الاستماع إلى تغييرات حالة المصادقة
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Check if user is admin
        if (newSession?.user) {
          setIsAdmin(newSession.user.app_metadata?.role === 'admin' || false);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      // Signal that signout is starting
      console.log('Signing out user...');
      
      // Perform the signout
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Clear local state
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error during sign out:', error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
      throw error; // Re-throw to allow handling in components
    }
  };

  const value = {
    session,
    user,
    loading,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
