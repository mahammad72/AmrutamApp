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

const getPageIndexes = (
  page: number,
  limit: number,
  total: number,
) => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);

  const start = (safePage - 1) * safeLimit;
  const end = Math.min(start + safeLimit, total);

  if (start >= total) {
    return [];
  }

  return Array.from(
    { length: end - start },
    (_, index) => start + index,
  );
};

const createId = (
  prefix: string,
  index: number,
) => `${prefix}-${index + 1}`;

// ----------------------------------------
// Doctors
// ----------------------------------------

export const generateDoctorsPage = (
  page: number,
  limit: number,
): Doctor[] => {
  const indexes = getPageIndexes(
    page,
    limit,
    5000,
  );

  return indexes.map(index => ({
    id: createId('doctor', index),

    name: doctorNames[
      index % doctorNames.length
    ],

    specialization:
      specializations[
        index % specializations.length
      ],

    experience: 3 + (index % 20),

    rating: Number(
      (4 + ((index % 10) / 10)).toFixed(1),
    ),

    consultationFee:
      300 + (index % 10) * 50,

    avatar: `https://i.pravatar.cc/150?img=${
      (index % 70) + 1
    }`,

    languages: ['English', 'Hindi'],

    availableToday: index % 3 !== 0,
  }));
};

// ----------------------------------------
// Products
// ----------------------------------------

export const generateProductsPage = (
  page: number,
  limit: number,
): Product[] => {
  const indexes = getPageIndexes(
    page,
    limit,
    20000,
  );

  return indexes.map(index => {
    const price =
      199 + (index % 20) * 50;

    return {
      id: createId('product', index),

      name: `Ayurvedic Wellness Product ${
        index + 1
      }`,

      category:
        productCategories[
          index % productCategories.length
        ],

      description:
        'A wellness product designed for everyday Ayurvedic care.',

      price,

      originalPrice: price + 100,

      rating: Number(
        (
          3.5 +
          ((index % 15) / 10)
        ).toFixed(1),
      ),

      image: `https://picsum.photos/seed/product-${index}/400/400`,

      inStock: index % 7 !== 0,

      tags: ['Ayurveda', 'Wellness'],
    };
  });
};

// ----------------------------------------
// Health Records
// ----------------------------------------

export const generateHealthRecordsPage = (
  page: number,
  limit: number,
): HealthRecord[] => {
  const indexes = getPageIndexes(
    page,
    limit,
    10000,
  );

  return indexes.map(index => {
    const type =
      recordTypes[
        index % recordTypes.length
      ];

    return {
      id: createId('record', index),

      type,

      title: `${type
        .replace('-', ' ')
        .replace(/\b\w/g, char =>
          char.toUpperCase(),
        )} ${index + 1}`,

      description:
        'Health record generated for demonstration.',

      date: new Date(
        2024,
        index % 12,
        (index % 28) + 1,
      ).toISOString(),

      doctorName:
        type === 'consultation' ||
        type === 'prescription'
          ? doctorNames[
              index % doctorNames.length
            ]
          : undefined,

      tags: [type, 'health'],

      attachmentUrl:
        index % 2 === 0
          ? `https://picsum.photos/seed/record-${index}/500/700`
          : undefined,

      attachmentType:
        index % 2 === 0
          ? 'image'
          : undefined,
    };
  });
};


export const generateDoctorSlots = (
  doctorId: string,
): DoctorSlot[] => {
  const slots: DoctorSlot[] = [];

  const today = new Date();

  for (let day = 0; day < 7; day++) {
    const date = new Date(today);

    date.setDate(
      today.getDate() + day,
    );

    const dateString =
      date.toISOString().split('T')[0];

    for (
      let hour = 9;
      hour <= 17;
      hour++
    ) {
      const slotIndex =
        day * 9 + hour;

      slots.push({
        id: `${doctorId}-slot-${slotIndex}`,

        doctorId,

        date: dateString,

        startTime: `${String(hour).padStart(
          2,
          '0',
        )}:00`,

        endTime: `${String(hour).padStart(
          2,
          '0',
        )}:30`,

        isBooked:
          slotIndex % 7 === 0,
      });
    }
  }

  return slots;
};