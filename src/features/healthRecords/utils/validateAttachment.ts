import { ATTACHMENT_CONFIG } from '../constants/attachment';

import type { AttachmentType } from '../types/healthRecord';

interface FileInput {
  name?: string;

  size?: number;

  type?: string;
}

export const validateAttachment = (
  file: FileInput,
  attachmentType: AttachmentType,
) => {
  const config = ATTACHMENT_CONFIG[attachmentType];

  const extension = file.name?.split('.').pop()?.toLowerCase();

  if (!extension || !config.allowedExtensions.includes(extension as never)) {
    return `Unsupported ${attachmentType} file.`;
  }

  if (file.size) {
    const maxBytes = config.maxSizeMB * 1024 * 1024;

    if (file.size > maxBytes) {
      return `${file.name} exceeds the ${config.maxSizeMB}MB limit.`;
    }
  }

  return null;
};
