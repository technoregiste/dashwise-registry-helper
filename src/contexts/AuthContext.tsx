
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

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return profileData?.role === 'admin' || false;
    } catch (error) {
      console.error('Exception checking admin status:', error);
      return false;
    }
  };

  useEffect(() => {
    // Load current session on app initialization
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        // Check if user is admin
        if (data.session?.user) {
          const isUserAdmin = await checkAdminStatus(data.session.user.id);
          setIsAdmin(isUserAdmin);
          console.log('User admin status:', isUserAdmin);
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Check if user is admin
        if (newSession?.user) {
          const isUserAdmin = await checkAdminStatus(newSession.user.id);
          setIsAdmin(isUserAdmin);
          console.log('User admin status updated:', isUserAdmin);
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
