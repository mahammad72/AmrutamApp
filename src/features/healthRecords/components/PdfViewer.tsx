import React from 'react';

import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import Pdf from 'react-native-pdf';

interface Props {
  visible: boolean;

  uri: string;

  onClose: () => void;
}

const PdfViewer = ({ visible, uri, onClose }: Props) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Document</Text>

          <Pressable onPress={onClose}>
            <Text style={styles.close}>Close</Text>
          </Pressable>
        </View>

        <Pdf
          source={{ uri }}
          style={styles.pdf}
          trustAllCerts={false}
          onError={error => {
            console.log('PDF error:', error);
          }}
        />
      </View>
    </Modal>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 60,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
  },

  close: {
    fontSize: 14,
    fontWeight: '700',
  },

  pdf: {
    flex: 1,
  },
});
