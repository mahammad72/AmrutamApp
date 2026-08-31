// attachment.ts
export const ATTACHMENT_CONFIG = {
  image: {
    maxSizeMB: 10,
    allowedExtensions: [
      'jpg',
      'jpeg',
      'png',
      'webp',
    ],
  },

  pdf: {
    maxSizeMB: 20,
    allowedExtensions: ['pdf'],
  },
} as const;