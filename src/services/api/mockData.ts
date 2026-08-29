import { Doctor, DoctorSlot } from '../../features/consultation/types/doctor';
import { Product } from '../../features/shop/types/product';
import {
  HealthRecord,
  HealthRecordType,
} from '../../features/healthRecords/types/record';

const doctorNames = [
  'Dr. Ananya Sharma',
  'Dr. Rahul Patel',
  'Dr. Meera Shah',
  'Dr. Arjun Mehta',
  'Dr. Priya Joshi',
  'Dr. Rohan Desai',
  'Dr. Neha Trivedi',
];

const specializations = [
  'Ayurvedic Physician',
  'Panchakarma Specialist',
  'Dermatology',
  'Digestive Health',
  'Women’s Health',
  'Stress Management',
  'Joint Care',
];

const productCategories = [
  'Herbal Supplements',
  'Digestive Care',
  'Skin Care',
  'Hair Care',
  'Immunity',
  'Wellness',
];

const recordTypes: HealthRecordType[] = [
  'lab-report',
  'prescription',
  'consultation',
  'vaccination',
  'allergy',
];

const createId = (prefix: string, index: number) =>
  `${prefix}-${index + 1}`;

export const generateDoctors = (count: number): Doctor[] => {
  return Array.from({ length: count }, (_, index) => {
    return {
      id: createId('doctor', index),
      name: doctorNames[index % doctorNames.length],
      specialization:
        specializations[index % specializations.length],
      experience: 3 + (index % 20),
      rating: Number((4 + ((index % 10) / 10)).toFixed(1)),
      consultationFee: 300 + (index % 10) * 50,
      avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
      languages: ['English', 'Hindi'],
      availableToday: index % 3 !== 0,
    };
  });
};

export const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, index) => {
    const price = 199 + (index % 20) * 50;

    return {
      id: createId('product', index),
      name: `Ayurvedic Wellness Product ${index + 1}`,
      category:
        productCategories[index % productCategories.length],
      description:
        'A wellness product designed for everyday Ayurvedic care.',
      price,
      originalPrice: price + 100,
      rating: Number((3.5 + ((index % 15) / 10)).toFixed(1)),
      image: `https://picsum.photos/seed/product-${index}/400/400`,
      inStock: index % 7 !== 0,
      tags: ['Ayurveda', 'Wellness'],
    };
  });
};

export const generateHealthRecords = (
  count: number,
): HealthRecord[] => {
  return Array.from({ length: count }, (_, index) => {
    const type = recordTypes[index % recordTypes.length];

    return {
      id: createId('record', index),
      type,
      title: `${type
        .replace('-', ' ')
        .replace(/\b\w/g, char => char.toUpperCase())} ${
        index + 1
      }`,
      description: 'Health record generated for demonstration.',
      date: new Date(
        2024,
        index % 12,
        (index % 28) + 1,
      ).toISOString(),
      doctorName:
        type === 'consultation' || type === 'prescription'
          ? doctorNames[index % doctorNames.length]
          : undefined,
      tags: [type, 'health'],
      attachmentUrl:
        index % 2 === 0
          ? `https://picsum.photos/seed/record-${index}/500/700`
          : undefined,
      attachmentType: index % 2 === 0 ? 'image' : undefined,
    };
  });
};