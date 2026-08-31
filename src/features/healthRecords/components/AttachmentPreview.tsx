import React, { useState } from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { HealthRecordAttachment } from '../types/healthRecord';

import ImageViewer from './ImageViewer';

import PdfViewer from './PdfViewer';

interface Props {
  attachment: HealthRecordAttachment;

  onDelete?: () => void;
}

const AttachmentPreview = ({ attachment, onDelete }: Props) => {
  const [imageVisible, setImageVisible] = useState(false);

  const [pdfVisible, setPdfVisible] = useState(false);

  const handlePress = () => {
    if (attachment.type === 'image') {
      setImageVisible(true);
      return;
    }

    setPdfVisible(true);
  };

  return (
    <>
      <Pressable style={styles.container} onPress={handlePress}>
        {attachment.type === 'image' ? (
          <Image
            source={{
              uri: attachment.thumbnailUri ?? attachment.uri,
            }}
            style={styles.image}
          />
        ) : (
          <View style={styles.pdfContainer}>
            <Text style={styles.pdfIcon}>PDF</Text>

            <Text numberOfLines={2} style={styles.fileName}>
              {attachment.name}
            </Text>
          </View>
        )}

        {onDelete && (
          <Pressable style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteText}>×</Text>
          </Pressable>
        )}
      </Pressable>

      <ImageViewer
        visible={imageVisible}
        uri={attachment.uri}
        onClose={() => setImageVisible(false)}
      />

      <PdfViewer
        visible={pdfVisible}
        uri={attachment.uri}
        onClose={() => setPdfVisible(false)}
      />
    </>
  );
};

export default AttachmentPreview;

const styles = StyleSheet.create({
  container: {
    width: 85,
    height: 85,
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
    flex: 1,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pdfIcon: {
    fontSize: 14,
    fontWeight: '900',
  },

  fileName: {
    marginTop: 4,
    fontSize: 9,
    textAlign: 'center',
  },

  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  deleteText: {
    fontSize: 16,
    fontWeight: '800',
  },
});
