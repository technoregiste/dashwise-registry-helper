
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandButtonProps {
  expanded: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({ expanded, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center text-sm text-primary font-medium hover:underline"
    >
      {expanded ? (
        <>
          <ChevronUp size={16} className="mr-1" />
          إخفاء التفاصيل
        </>
      ) : (
        <>
          <ChevronDown size={16} className="mr-1" />
          عرض التفاصيل
        </>
      )}
    </button>
  );
};

export default ExpandButton;
