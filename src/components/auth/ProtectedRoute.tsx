
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // If no user, redirect to auth page
        navigate('/auth');
      } else if (requireAdmin && !isAdmin) {
        // If admin route but user is not admin, redirect to dashboard
        navigate('/dashboard');
      } else if (isAdmin && location.pathname === '/dashboard') {
        // If admin user tries to access regular dashboard, redirect to admin dashboard
        navigate('/admin');
      }
    }
  }, [user, loading, navigate, requireAdmin, isAdmin, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render children if user is authenticated and has correct role
  return (user && (!requireAdmin || (requireAdmin && isAdmin))) ? <>{children}</> : null;
};

export default ProtectedRoute;
