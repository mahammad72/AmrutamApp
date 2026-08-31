import type { HealthRecord, HealthRecordType } from '../types/healthRecord';

export const filterRecords = (
  records: HealthRecord[],
  search: string,
  selectedType: HealthRecordType | 'all',
) => {
  const normalizedSearch = search.trim().toLowerCase();

  return records.filter(record => {
    const matchesType = selectedType === 'all' || record.type === selectedType;

    if (!matchesType) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const searchableText = [
      record.title,
      record.description,
      record.doctorName,
      record.hospitalName,
      ...record.tags,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedSearch);
  });
};
