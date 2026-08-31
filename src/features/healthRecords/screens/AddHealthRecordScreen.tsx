import React, { useState } from 'react';

import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { RECORD_TYPES } from '../constants/recordTypes';

import type {
  AttachmentType,
  HealthRecordAttachment,
  HealthRecordType,
} from '../types/healthRecord';

import { launchImageLibrary } from 'react-native-image-picker';
import { pick, types } from '@react-native-documents/picker';
import { useCreateHealthRecordMutation } from '../../../services/api/baseApi';
import AttachmentPreview from '../components/AttachmentPreview';
import { validateAttachment } from '../utils/validateAttachment';

interface Props {
  navigation: any;
}

const AddHealthRecordScreen = ({ navigation }: Props) => {
  const [createHealthRecord, { isLoading: isSaving }] =
    useCreateHealthRecordMutation();

  const [recordType, setRecordType] = useState<HealthRecordType>('lab_report');

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [doctorName, setDoctorName] = useState('');

  const [hospitalName, setHospitalName] = useState('');

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const [tags, setTags] = useState('');

  const [attachments, setAttachments] = useState<HealthRecordAttachment[]>([]);

  const addMockAttachment = (type: AttachmentType) => {
    const attachment: HealthRecordAttachment = {
      id: `attachment-${Date.now()}`,

      name: type === 'image' ? 'medical-report.jpg' : 'medical-report.pdf',

      uri:
        type === 'image'
          ? 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae'
          : 'https://example.com/report.pdf',

      type,
    };

    setAttachments(current => [...current, attachment]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(current => current.filter(item => item.id !== id));
  };

  const validateRecord = () => {
    if (!title.trim()) {
      return 'Please enter a title.';
    }

    if (!date.trim()) {
      return 'Please select a date.';
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return 'Date must be YYYY-MM-DD.';
    }

    //   if (pincodeIsInvalid()) {
    //     return 'Invalid information.';
    //   }

    return null;
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Title Required', 'Please enter a record title.');

      return;
    }

    if (!date.trim()) {
      Alert.alert('Date Required', 'Please enter the record date.');

      return;
    }

    try {
      await createHealthRecord({
        title: title.trim(),

        description: description.trim(),

        type: recordType,

        date,

        doctorName: doctorName.trim(),

        hospitalName: hospitalName.trim(),

        tags: tags
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),

        attachments,
      }).unwrap();

      Alert.alert(
        'Record Saved',
        'Health record has been added successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error: any) {
      Alert.alert('Unable to Save', error?.message ?? 'Something went wrong.');
    }
  };

  const handlePickImage = async () => {
   
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
      quality: 0.8,
    });

    if (result.didCancel || !result.assets) {
      return;
    }

    const selected = result.assets
      .filter(asset => !!asset.uri)
      .map((asset, index) => ({
        id: `image-${Date.now()}-${index}`,
        name: asset.fileName ?? `image-${index}.jpg`,
        uri: asset.uri!,
        type: 'image' as const,
        mimeType: asset.type,
        size: asset.fileSize,
        thumbnailUri: asset.uri,
      }));

    setAttachments(current => [...current, ...selected]);
  };
  const handlePickPdf = async () => {
    try {
      const result = await pick({
        type: [types.pdf],
        allowMultiSelection: true,
      });

      const selected = result.map((file, index) => ({
        id: `pdf-${Date.now()}-${index}`,
        name: file.name ?? `document-${index}.pdf`,
        uri: file.uri,
        type: 'pdf' as const,
        mimeType: file.type,
        size: file.size,
      }));

      setAttachments((current: any) => [...current, ...selected]);
    } catch (error) {
      console.log('PDF picker cancelled');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.sectionTitle}>Health Records</Text>
          <Text style={styles.typeText}>Your complete medical history</Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('AddHealthRecord')}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </Pressable>
      </View>
      {/* ===================== */}
      {/* Record Type */}
      {/* ===================== */}

      <Text style={styles.sectionTitle}>Record Type</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeList}
      >
        {RECORD_TYPES.map(item => {
          const selected = recordType === item.type;

          return (
            <Pressable
              key={item.type}
              style={[styles.typeCard, selected && styles.selectedType]}
              onPress={() => setRecordType(item.type)}
            >
              <Text style={styles.typeIcon}>{item.icon}</Text>

              <Text
                style={[styles.typeText, selected && styles.selectedTypeText]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* ===================== */}
      {/* Basic Information */}
      {/* ===================== */}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <Text style={styles.label}>Title *</Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Blood Test Report"
          style={styles.input}
        />

        <Text style={styles.label}>Date *</Text>

        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          style={styles.input}
        />

        <Text style={styles.label}>Doctor</Text>

        <TextInput
          value={doctorName}
          onChangeText={setDoctorName}
          placeholder="Doctor name"
          style={styles.input}
        />

        <Text style={styles.label}>Hospital / Clinic</Text>

        <TextInput
          value={hospitalName}
          onChangeText={setHospitalName}
          placeholder="Hospital or clinic name"
          style={styles.input}
        />

        <Text style={styles.label}>Description</Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Add notes about this record..."
          multiline
          style={[styles.input, styles.textArea]}
        />

        <Text style={styles.label}>Tags</Text>

        <TextInput
          value={tags}
          onChangeText={setTags}
          placeholder="Blood Test, Routine, Important"
          style={styles.input}
        />

        <Text style={styles.helper}>Separate multiple tags with commas.</Text>
      </View>

      {/* ===================== */}
      {/* Attachments */}
      {/* ===================== */}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Attachments</Text>

        <View style={styles.uploadRow}>
          <Pressable style={styles.uploadButton} onPress={handlePickImage}>
            <Text style={styles.uploadIcon}>🖼️</Text>

            <Text style={styles.uploadText}>Add Image</Text>
          </Pressable>

          <Pressable style={styles.uploadButton} onPress={handlePickPdf}>
            <Text style={styles.uploadIcon}>📄</Text>

            <Text style={styles.uploadText}>Add PDF</Text>
          </Pressable>
        </View>

        {attachments.length > 0 && (
          <View style={styles.attachmentList}>
            {attachments.map(attachment => (
              <AttachmentPreview
                attachment={attachment}
                onDelete={() => removeAttachment(attachment.id)}
              />
            ))}
          </View>
        )}
      </View>

      {/* ===================== */}
      {/* Save */}
      {/* ===================== */}

      <Pressable
        style={[styles.saveButton, isSaving && styles.disabledButton]}
        disabled={isSaving}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Saving...' : 'Save Health Record'}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default AddHealthRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F3',
  },

  content: {
    padding: 15,
    paddingBottom: 40,
  },

  sectionTitle: {
    marginBottom: 12,
    fontSize: 17,
    fontWeight: '800',
  },

  typeList: {
    paddingBottom: 15,
  },

  typeCard: {
    width: 100,
    minHeight: 90,
    marginRight: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedType: {
    borderColor: '#4F6F52',
    backgroundColor: '#4F6F52',
  },

  typeIcon: {
    fontSize: 25,
  },

  typeText: {
    marginTop: 7,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },

  selectedTypeText: {
    color: '#FFFFFF',
  },

  card: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  label: {
    marginBottom: 6,
    fontSize: 12,
    fontWeight: '700',
  },

  input: {
    minHeight: 48,
    marginBottom: 12,
    paddingHorizontal: 13,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },

  textArea: {
    minHeight: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },

  helper: {
    marginTop: -5,
    marginBottom: 5,
    fontSize: 11,
    color: '#6B7280',
  },

  uploadRow: {
    flexDirection: 'row',
  },

  uploadButton: {
    flex: 1,
    minHeight: 100,
    marginRight: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadIcon: {
    fontSize: 25,
  },

  uploadText: {
    marginTop: 7,
    fontWeight: '700',
  },

  attachmentList: {
    marginTop: 15,
  },

  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#F8F8F3',
  },

  thumbnail: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },

  pdfThumbnail: {
    width: 55,
    height: 55,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
  },

  pdfText: {
    fontSize: 12,
    fontWeight: '900',
  },

  attachmentInfo: {
    flex: 1,
    marginHorizontal: 10,
  },

  fileName: {
    fontSize: 12,
    fontWeight: '700',
  },

  fileType: {
    marginTop: 3,
    fontSize: 10,
    color: '#6B7280',
  },

  remove: {
    padding: 5,
    fontSize: 11,
    fontWeight: '700',
    color: '#B42318',
  },

  saveButton: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#4F6F52',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },

  addButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#4F6F52',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
