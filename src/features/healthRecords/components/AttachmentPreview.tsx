import React from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { HealthRecordAttachment } from '../types/healthRecord';

interface Props {
  attachment: HealthRecordAttachment;

  onPress?: (attachment: HealthRecordAttachment) => void;
}

const AttachmentPreview = ({ attachment, onPress }: Props) => {
  if (attachment.type === 'image') {
    return (
      <Pressable style={styles.container} onPress={() => onPress?.(attachment)}>
        <Image
          source={{
            uri: attachment.thumbnailUri ?? attachment.uri,
          }}
          style={styles.image}
        />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.container, styles.pdfContainer]}
      onPress={() => onPress?.(attachment)}
    >
      <Text style={styles.pdfIcon}>PDF</Text>

      <Text numberOfLines={2} style={styles.fileName}>
        {attachment.name}
      </Text>
    </Pressable>
  );
};

export default AttachmentPreview;

const styles = StyleSheet.create({
  container: {
    width: 72,
    height: 72,
    marginRight: 8,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  pdfContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },

  pdfIcon: {
    fontSize: 13,
    fontWeight: '900',
  },

  fileName: {
    marginTop: 5,
    fontSize: 9,
    textAlign: 'center',
  },
});
