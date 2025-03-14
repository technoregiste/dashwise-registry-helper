
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
  error?: string;
  details?: StepCardDetails;
  onDocumentToggle?: (e: React.ChangeEvent<HTMLInputElement>, docId: string) => void;
  onChecklistToggle?: (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
  className?: string;
}
