
import React from 'react';
import { ChecklistItem } from './StepCardTypes';
import StepProgressBar from './StepProgressBar';

interface ChecklistItemsProps {
  items: ChecklistItem[];
  onChecklistToggle: (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
}

const ChecklistItems: React.FC<ChecklistItemsProps> = ({ items, onChecklistToggle }) => {
  if (!items || items.length === 0) return null;
  
  const getChecklistProgress = () => {
    const checkedItems = items.filter(item => item.checked).length;
    return Math.round((checkedItems / items.length) * 100);
  };
  
  const checklistProgress = getChecklistProgress();
  
  return (
    <div className="bg-teal-50 p-3 rounded-lg">
      <h4 className="text-teal-700 font-medium text-sm mb-2">ميزة الشطب (تأكيد التقدم)</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={item.checked} 
              onChange={(e) => onChecklistToggle(e, item.id)}
              className="ml-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">{item.text}</span>
          </label>
        ))}
        
        <StepProgressBar progress={checklistProgress} />
      </div>
    </div>
  );
};

export default ChecklistItems;
