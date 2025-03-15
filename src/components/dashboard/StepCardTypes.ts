
import { StatusType } from './StatusBadge';

export interface Document {
  id: string;
  name: string;
  checked: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface StepCardDetails {
  cost?: string;
  timeframe?: string;
  requirements?: string[];
  options?: string[];
  documents?: Document[];
  steps?: string[];
  authorities?: string[];
  checklistItems?: ChecklistItem[];
  notes?: string[];
  [key: string]: any;
}

export interface StepCardProps {
  number: number;
  title: string;
  status: StatusType;
  description: string;
  onClick: () => void;
  details?: StepCardDetails;
  onDocumentToggle?: (stepId: number, docId: string, checked: boolean) => void;
  onChecklistToggle?: (stepId: number, itemId: string, checked: boolean) => void;
  className?: string;
}
