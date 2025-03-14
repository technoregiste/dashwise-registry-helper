
import React from 'react';
import InfoSection from './InfoSection';
import { List } from 'lucide-react';

interface StepsListProps {
  steps: string[];
  className?: string;
}

const StepsList: React.FC<StepsListProps> = ({ steps, className = '' }) => {
  if (!steps || steps.length === 0) return null;
  
  return (
    <InfoSection 
      title="الخطوات التفصيلية" 
      bgColor="bg-green-50" 
      textColor="text-green-700"
      icon={<List size={18} />}
      className={`transition-all duration-300 ${className}`}
    >
      <ol className="list-none mr-0 space-y-1.5">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start">
            <span className="inline-flex justify-center items-center bg-green-200 text-green-800 w-6 h-6 rounded-full text-xs ml-2 flex-shrink-0">
              {i+1}
            </span>
            <span className="text-sm text-gray-700">{step}</span>
          </li>
        ))}
      </ol>
    </InfoSection>
  );
};

export default StepsList;
