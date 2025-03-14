
import React from 'react';
import { Document } from './StepCardTypes';
import StepProgressBar from './StepProgressBar';

interface DocumentsListProps {
  documents: Document[];
  onDocumentToggle: (e: React.ChangeEvent<HTMLInputElement>, docId: string) => void;
}

const DocumentsList: React.FC<DocumentsListProps> = ({ documents, onDocumentToggle }) => {
  if (!documents || documents.length === 0) return null;
  
  const getDocsProgress = () => {
    const checkedDocs = documents.filter(doc => doc.checked).length;
    return Math.round((checkedDocs / documents.length) * 100);
  };
  
  const docsProgress = getDocsProgress();
  
  return (
    <div className="bg-red-50 p-3 rounded-lg">
      <h4 className="text-red-700 font-medium text-sm mb-2">الوثائق المطلوبة</h4>
      <div className="space-y-2">
        {documents.map((doc) => (
          <label key={doc.id} className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={doc.checked} 
              onChange={(e) => onDocumentToggle(e, doc.id)}
              className="ml-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">{doc.name}</span>
          </label>
        ))}
        
        <StepProgressBar progress={docsProgress} />
      </div>
    </div>
  );
};

export default DocumentsList;
