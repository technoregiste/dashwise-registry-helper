
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ProgressBar from '@/components/dashboard/ProgressBar';

interface HeaderProps {
  startupName: string;
  progressPercentage: number;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  startupName, 
  progressPercentage,
  className
}) => {
  const navigate = useNavigate();

  return (
    <header className={cn(
      "w-full py-4 px-6 flex flex-col bg-white shadow-subtle z-10 animate-slide-down",
      className
    )}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-semibold text-lg">R</span>
          </div>
          <h1 className="text-xl font-semibold">
            Registry Helper
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right hidden md:block">
            <p className="text-sm text-muted-foreground">Startup</p>
            <p className="font-medium">{startupName}</p>
          </div>
          <button 
            onClick={() => {}} 
            className="btn px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors button-hover"
          >
            Help
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <ProgressBar percentage={progressPercentage} />
      </div>
    </header>
  );
};

export default Header;
