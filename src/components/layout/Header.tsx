
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/dashboard/ProgressBar';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface HeaderProps {
  startupName: string;
  progressPercentage: number;
}

const Header: React.FC<HeaderProps> = ({ startupName, progressPercentage }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح من النظام",
      });
      navigate('/');
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
              <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ml-2">
                ر
              </div>
              <span className="text-xl font-semibold">{startupName}</span>
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
            <button className="lg:hidden">
              <Menu size={20} />
            </button>
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
