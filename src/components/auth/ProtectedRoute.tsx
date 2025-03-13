
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="sr-only">جاري التحميل...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
