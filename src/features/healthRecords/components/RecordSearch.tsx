import React from 'react';

import { StyleSheet, TextInput } from 'react-native';

interface Props {
  value: string;

  onChangeText: (value: string) => void;
}

const RecordSearch = ({ value, onChangeText }: Props) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Search health records..."
      placeholderTextColor="#9CA3AF"
      style={styles.input}
    />
  );
};

export default RecordSearch;

const styles = StyleSheet.create({
  input: {
    height: 48,
    marginHorizontal: 15,
    marginBottom: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
