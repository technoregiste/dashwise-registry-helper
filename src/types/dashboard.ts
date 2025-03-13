
import { StatusType } from '@/components/dashboard/StatusBadge';

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

export interface StepData {
  id: number;
  title: string;
  status: StatusType;
  description: string;
  error?: string;
  details?: {
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
  };
}

export interface ProfileData {
  id: string;
  founder_name: string;
  company_name: string;
  company_number: string;
  phone: string;
}

export interface DbRegistrationStep {
  id: string;
  profile_id: string;
  step_id: number;
  status: 'pending' | 'incomplete' | 'progress' | 'complete';
  documents: Document[] | null;
  checklist_items: ChecklistItem[] | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}
