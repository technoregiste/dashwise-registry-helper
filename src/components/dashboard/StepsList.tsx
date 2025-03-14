
import React from 'react';

interface StepsListProps {
  steps: string[];
}

const StepsList: React.FC<StepsListProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;
  
  return (
    <div className="bg-green-50 p-3 rounded-lg">
      <h4 className="text-green-700 font-medium text-sm mb-2">الخطوات التفصيلية</h4>
      <ol className="list-none mr-0 space-y-1.5">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start">
            <span className="inline-flex justify-center items-center bg-green-200 text-green-800 w-6 h-6 rounded-full text-xs ml-2">
              {i+1}
            </span>
            <span className="text-sm text-gray-700">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StepsList;
