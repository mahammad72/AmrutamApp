import React from 'react';

import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { RECORD_TYPES } from '../constants/recordTypes';

import type { HealthRecordType } from '../types/healthRecord';

interface Props {
  selected: HealthRecordType | 'all';

  onChange: (value: HealthRecordType | 'all') => void;
}

const RecordFilters = ({ selected, onChange }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Pressable
        style={[styles.filter, selected === 'all' && styles.active]}
        onPress={() => onChange('all')}
      >
        <Text style={[styles.text, selected === 'all' && styles.activeText]}>
          All
        </Text>
      </Pressable>

      {RECORD_TYPES.map(item => (
        <Pressable
          key={item.type}
          style={[styles.filter, selected === item.type && styles.active]}
          onPress={() => onChange(item.type)}
        >
          <Text
            style={[styles.text, selected === item.type && styles.activeText]}
          >
            {item.icon} {item.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default RecordFilters;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 12,
  },

  filter: {
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },

  active: {
    borderColor: '#4F6F52',
    backgroundColor: '#4F6F52',
  },

  text: {
    fontSize: 12,
    fontWeight: '600',
  },

  activeText: {
    color: '#FFFFFF',
  },
});
