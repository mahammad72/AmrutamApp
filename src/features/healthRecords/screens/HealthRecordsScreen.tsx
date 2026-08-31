import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useGetHealthRecordsQuery } from '../../../services/api/baseApi';
import RecordSearch from '../components/RecordSearch';
import RecordFilters from '../components/RecordFilters';
import HealthRecordCard from '../components/HealthRecordCard';
import type { HealthRecord, HealthRecordType } from '../types/healthRecord';
import { filterRecords } from '../utils/healthRecordUtils';
import { groupRecordsByMonth } from '../utils/groupHealthRecords';

type ListItem = 
  | { type: 'HEADER'; title: string; id: string }
  | { type: 'RECORD'; data: HealthRecord; id: string };

const HealthRecordsScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<HealthRecordType | 'all'>('all');

  const { data, isLoading, isError } = useGetHealthRecordsQuery({
    page: 1,
    limit: 100,
  });

  const records = useMemo<HealthRecord[]>(
    () =>
      Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.items)
          ? (data as any).items
          : Array.isArray((data as any)?.data)
            ? (data as any).data
            : [],
    [data],
  );

  const filteredRecords = useMemo(
    () => filterRecords(records, search, selectedType),
    [records, search, selectedType],
  );

  // Safely generate sections and flatten them for FlashList to completely avoid length/undefined crashes
  const flatListData = useMemo<ListItem[]>(() => {
    const rawSections = groupRecordsByMonth(filteredRecords);
    if (!Array.isArray(rawSections)) return [];

    const items: ListItem[] = [];
    rawSections.forEach((section:any) => {
      if (section && section.title) {
        items.push({ type: 'HEADER', title: section.title, id: `header-${section.title}` });
      }
      if (Array.isArray(section?.data)) {
        section?.data.forEach((record:any) => {
          if (record && record.id) {
            items.push({ type: 'RECORD', data: record, id: record.id });
          }
        });
      }
    });
    return items;
  }, [filteredRecords]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Loading health records...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Unable to load health records.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Records</Text>
        <Text style={styles.subtitle}>Your complete medical history</Text>
      </View>

      <RecordSearch value={search} onChangeText={setSearch} />
      <RecordFilters selected={selectedType} onChange={setSelectedType} />

      <FlashList
        data={flatListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.type === 'HEADER') {
            return <Text style={styles.monthHeader}>{item.title}</Text>;
          }
          return (
            <HealthRecordCard
              record={item.data}
              onPress={(record) =>
                navigation.navigate('HealthRecordDetails', {
                  recordId: record.id,
                })
              }
            />
          );
        }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No Records Found</Text>
            <Text style={styles.emptyText}>
              Try changing your search or filter.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default HealthRecordsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F3',
  },
  header: {
    padding: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 4,
    color: '#6B7280',
  },
  list: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  monthHeader: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: '800',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#6B7280',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '800',
  },
  emptyText: {
    marginTop: 5,
    color: '#6B7280',
  },
});