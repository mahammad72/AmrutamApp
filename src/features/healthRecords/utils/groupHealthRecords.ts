import type { HealthRecord } from '../types/healthRecord';

export interface HealthRecordGroup {
  title: string;

  records: HealthRecord[];
}

export const groupRecordsByMonth = (
  records: HealthRecord[],
): HealthRecordGroup[] => {
  const groups = new Map<string, HealthRecord[]>();

  const sorted = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  sorted.forEach(record => {
    const date = new Date(record.date);

    const title = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    if (!groups.has(title)) {
      groups.set(title, []);
    }

    groups.get(title)!.push(record);
  });

  return Array.from(groups.entries()).map(([title, records]) => ({
    title,
    records,
  }));
};
