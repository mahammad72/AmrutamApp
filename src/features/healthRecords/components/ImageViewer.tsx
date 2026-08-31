import React from 'react';

import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  visible: boolean;

  uri: string;

  onClose: () => void;
}

const ImageViewer = ({ visible, uri, onClose }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>

        <Image source={{ uri }} resizeMode="contain" style={styles.image} />
      </View>
    </Modal>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '80%',
  },

  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  closeText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
