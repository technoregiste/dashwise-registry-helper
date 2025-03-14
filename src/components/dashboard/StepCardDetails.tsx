
import React from 'react';
import { StepCardDetails as StepCardDetailsType } from './StepCardTypes';
import StepsList from './StepsList';
import InfoSection from './InfoSection';
import DocumentsList from './DocumentsList';
import ChecklistItems from './ChecklistItems';

interface StepCardDetailsProps {
  details: StepCardDetailsType;
  onDocumentToggle: (e: React.ChangeEvent<HTMLInputElement>, docId: string) => void;
  onChecklistToggle: (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
}

const StepCardDetailsComponent: React.FC<StepCardDetailsProps> = ({ 
  details, 
  onDocumentToggle, 
  onChecklistToggle 
}) => {
  return (
    <div className="mt-3 space-y-3">
      {/* Steps List */}
      {details.steps && <StepsList steps={details.steps} />}
      
      {/* Costs Section */}
      {details.cost && (
        <InfoSection 
          title="التكاليف" 
          bgColor="bg-orange-50" 
          textColor="text-orange-700"
          icon="💰"
        >
          <span className="text-sm text-gray-700">{details.cost}</span>
        </InfoSection>
      )}
      
      {/* Timeframe Section */}
      {details.timeframe && (
        <InfoSection 
          title="الإطار الزمني" 
          bgColor="bg-purple-50" 
          textColor="text-purple-700"
          icon="⏱️"
        >
          <span className="text-sm text-gray-700">{details.timeframe}</span>
        </InfoSection>
      )}
      
      {/* Documents List */}
      {details.documents && details.documents.length > 0 && (
        <DocumentsList 
          documents={details.documents} 
          onDocumentToggle={onDocumentToggle} 
        />
      )}
      
      {/* Notes Section */}
      {details.notes && details.notes.length > 0 && (
        <InfoSection 
          title="ملاحظات إضافية" 
          bgColor="bg-yellow-50" 
          textColor="text-yellow-700"
        >
          <ul className="list-disc list-inside mr-1 space-y-1">
            {details.notes.map((note, i) => (
              <li key={i} className="text-sm text-gray-700">{note}</li>
            ))}
          </ul>
        </InfoSection>
      )}
      
      {/* Options Section */}
      {details.options && details.options.length > 0 && (
        <InfoSection 
          title="الخيارات المتاحة" 
          bgColor="bg-blue-50" 
          textColor="text-blue-700"
        >
          <ul className="list-none mr-0 space-y-1.5">
            {details.options.map((opt, i) => (
              <li key={i} className="flex items-start">
                <span className="inline-flex justify-center items-center bg-blue-200 text-blue-800 ml-2">☑</span>
                <span className="text-sm text-gray-700">{opt}</span>
              </li>
            ))}
          </ul>
        </InfoSection>
      )}
      
      {/* Checklist Items */}
      {details.checklistItems && details.checklistItems.length > 0 && (
        <ChecklistItems 
          items={details.checklistItems}
          onChecklistToggle={onChecklistToggle}
        />
      )}
    </div>
  );
};

export default StepCardDetailsComponent;
