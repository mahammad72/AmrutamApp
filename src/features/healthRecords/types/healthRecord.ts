export type HealthRecordType =
  | 'lab_report'
  | 'prescription'
  | 'consultation'
  | 'vaccination'
  | 'allergy';

export type AttachmentType = 'image' | 'pdf';

export interface HealthRecordAttachment {
  id: string;

  name: string;

  uri: string;

  type: AttachmentType;

  thumbnailUri?: string;
}

export interface HealthRecord {
  id: string;

  title: string;

  description?: string;

  type: HealthRecordType;

  date: string;

  doctorName?: string;

  hospitalName?: string;

  tags: string[];

  attachments: HealthRecordAttachment[];

  createdAt: string;
}
