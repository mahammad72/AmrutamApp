import type { HealthRecordType } from '../types/healthRecord';

export interface RecordTypeConfig {
  type: HealthRecordType;

  label: string;

  icon: string;
}

export const RECORD_TYPES: RecordTypeConfig[] = [
  {
    type: 'lab_report',
    label: 'Lab Report',
    icon: '🧪',
  },
  {
    type: 'prescription',
    label: 'Prescription',
    icon: '💊',
  },
  {
    type: 'consultation',
    label: 'Consultation',
    icon: '🩺',
  },
  {
    type: 'vaccination',
    label: 'Vaccination',
    icon: '💉',
  },
  {
    type: 'allergy',
    label: 'Allergy',
    icon: '⚠️',
  },
];

export const getRecordTypeConfig = (type: HealthRecordType) =>
  RECORD_TYPES.find(item => item.type === type) ?? {
    type,
    label: type,
    icon: '📄',
  };
