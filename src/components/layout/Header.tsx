
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/dashboard/ProgressBar';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface HeaderProps {
  startupName: string;
  progressPercentage: number;
}

const Header: React.FC<HeaderProps> = ({ startupName, progressPercentage }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Ensure all user data is properly synced before signing out
      if (user) {
        // Update the user's last session timestamp
        const { error: profileUpdateError } = await supabase
          .from('profiles')
          .update({
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (profileUpdateError) {
          console.error('Error updating profile before logout:', profileUpdateError);
        }

        // Check if there are any pending step updates and force sync
        const { data: steps, error: stepsError } = await supabase
          .from('registration_steps')
          .select('*')
          .eq('profile_id', user.id);

        if (stepsError) {
          console.error('Error fetching steps before logout:', stepsError);
        }
      }

      // Proceed with sign out
      await signOut();
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح من النظام",
      });
      
      // Navigate to auth page after successful logout
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold text-primary">technoregiste</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <button 
                onClick={handleSignOut}
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <LogOut size={18} className="ml-1" />
                <span>تسجيل الخروج</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <ProgressBar percentage={progressPercentage} />
        </div>
      </div>
    </header>
  );
};

export default Header;
