import React from 'react';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useGetHealthRecordsQuery } from '../../../services/api/baseApi';

import { getRecordTypeConfig } from '../constants/recordTypes';

import AttachmentPreview from '../components/AttachmentPreview';

const HealthRecordDetailsScreen = ({ route }: any) => {
  const { recordId } = route.params;

  const { data } = useGetHealthRecordsQuery({
    page: 1,
    limit: 100,
  });

  const records = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.items)
      ? (data as any).items
      : Array.isArray((data as any)?.records)
        ? (data as any).records
        : [];

  const record = records.find((item: any) => item.id === recordId);

  if (!record) {
    return (
      <View style={styles.center}>
        <Text>Record not found.</Text>
      </View>
    );
  }

  const config = getRecordTypeConfig(record.type);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.type}>
        <Text style={styles.icon}>{config.icon}</Text>

        <Text style={styles.typeText}>{config.label}</Text>
      </View>

      <Text style={styles.title}>{record.title}</Text>

      <Text style={styles.date}>
        {new Date(record.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Text>

      {record.description && (
        <View style={styles.section}>
          <Text style={styles.heading}>Description</Text>

          <Text style={styles.body}>{record.description}</Text>
        </View>
      )}

      {record.doctorName && (
        <View style={styles.section}>
          <Text style={styles.heading}>Doctor</Text>

          <Text style={styles.body}>{record.doctorName}</Text>

          {record.hospitalName && (
            <Text style={styles.secondary}>{record.hospitalName}</Text>
          )}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.heading}>Tags</Text>

        <View style={styles.tags}>
          {record.tags.map((tag:any) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {record.attachments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Attachments</Text>

          <View style={styles.attachments}>
            {record.attachments.map((attachment:any) => (
              <AttachmentPreview key={attachment.id} attachment={attachment} />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default HealthRecordDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F3',
  },

  content: {
    padding: 18,
  },

  type: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 25,
  },

  typeText: {
    marginLeft: 8,
    fontWeight: '700',
    color: '#4F6F52',
  },

  title: {
    marginTop: 12,
    fontSize: 25,
    fontWeight: '900',
  },

  date: {
    marginTop: 5,
    color: '#6B7280',
  },

  section: {
    marginTop: 20,
    padding: 15,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  heading: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '800',
  },

  body: {
    lineHeight: 21,
  },

  secondary: {
    marginTop: 5,
    color: '#6B7280',
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tag: {
    marginRight: 6,
    marginBottom: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#F0F4ED',
  },

  tagText: {
    color: '#4F6F52',
    fontSize: 11,
  },

  attachments: {
    flexDirection: 'row',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
