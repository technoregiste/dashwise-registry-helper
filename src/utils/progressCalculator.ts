
import { StepData } from '@/types/dashboard';

/**
 * Calculates the progress percentage of registration steps
 */
export const calculateProgress = (steps: any[]) => {
  if (steps.length === 0) return 0;
  
  const total = steps.length;
  const completed = steps.filter(step => step.status === 'complete').length;
  const inProgress = steps.filter(step => step.status === 'progress').length * 0.5;
  
  let progressPoints = 0;
  steps.filter(step => step.status === 'progress').forEach(step => {
    if (step.details?.documents && step.details.documents.length > 0) {
      const totalDocs = step.details.documents.length;
      const checkedDocs = step.details.documents.filter(doc => doc.checked).length;
      progressPoints += (checkedDocs / totalDocs) * 0.25 / total;
    }
    
    if (step.details?.checklistItems && step.details.checklistItems.length > 0) {
      const totalItems = step.details.checklistItems.length;
      const checkedItems = step.details.checklistItems.filter(item => item.checked).length;
      progressPoints += (checkedItems / totalItems) * 0.25 / total;
    }
  });
  
  return Math.round(((completed + inProgress + progressPoints) / total) * 100);
};
