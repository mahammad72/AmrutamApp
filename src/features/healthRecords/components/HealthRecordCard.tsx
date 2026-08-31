import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { HealthRecord } from '../types/healthRecord';

import { getRecordTypeConfig } from '../constants/recordTypes';

import AttachmentPreview from './AttachmentPreview';

interface Props {
  record: HealthRecord;

  onPress: (record: HealthRecord) => void;
}

const HealthRecordCard = ({ record, onPress }: Props) => {
  const config = getRecordTypeConfig(record.type);

  const date = new Date(record.date);

  return (
    <Pressable style={styles.card} onPress={() => onPress(record)}>
      <View style={styles.timeline}>
        <View style={styles.dot} />

        <View style={styles.line} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.typeContainer}>
            <Text style={styles.icon}>{config.icon}</Text>

            <Text style={styles.type}>{config.label}</Text>
          </View>

          <Text style={styles.date}>
            {date.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
            })}
          </Text>
        </View>

        <Text style={styles.title}>{record.title}</Text>

        {record.description && (
          <Text numberOfLines={2} style={styles.description}>
            {record.description}
          </Text>
        )}

        {record.doctorName && (
          <Text style={styles.doctor}>{record.doctorName}</Text>
        )}

        <View style={styles.tags}>
          {record.tags.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        {record.attachments.length > 0 && (
          <View style={styles.attachments}>
            {record.attachments.slice(0, 3).map(attachment => (
              <AttachmentPreview key={attachment.id} attachment={attachment} />
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default HealthRecordCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  timeline: {
    width: 30,
    alignItems: 'center',
  },

  dot: {
    width: 12,
    height: 12,
    marginTop: 18,
    borderRadius: 6,
    backgroundColor: '#4F6F52',
  },

  line: {
    flex: 1,
    width: 1,
    marginTop: 3,
    backgroundColor: '#D1D5DB',
  },

  content: {
    flex: 1,
    padding: 15,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 18,
  },

  type: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '700',
    color: '#4F6F52',
  },

  date: {
    fontSize: 11,
    color: '#6B7280',
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '800',
  },

  description: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },

  doctor: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  tag: {
    marginRight: 5,
    marginBottom: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#F0F4ED',
  },

  tagText: {
    fontSize: 10,
    color: '#4F6F52',
  },

  attachments: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
