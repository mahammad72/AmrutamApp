export type HealthRecordType =
  | 'lab-report'
  | 'prescription'
  | 'consultation'
  | 'vaccination'
  | 'allergy';

export interface HealthRecord {
  id: string;
  type: HealthRecordType;
  title: string;
  description: string;
  date: string;
  doctorName?: string;
  tags: string[];
  attachmentUrl?: string;
  attachmentType?: 'image' | 'pdf';
}