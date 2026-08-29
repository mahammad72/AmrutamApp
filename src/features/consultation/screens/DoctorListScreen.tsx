import React, { useCallback, useMemo, useState } from 'react';

import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { FlashList, ListRenderItem } from '@shopify/flash-list';

import { useGetDoctorsQuery } from '../../../services/api/baseApi';

import DoctorCard from '../../../components/DoctorCard';
import DoctorFilters from '../../../components/DoctorFilters';

import type { Doctor } from '../types/doctor';

import { useDebounce } from '../../../hooks/useDebounce';
import { colors } from '../../../theme/colors';

const PAGE_SIZE = 20;

const DoctorListScreen = ({ navigation }: any) => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');

  const [specialization, setSpecialization] = useState('All');

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isFetching, isError, refetch } = useGetDoctorsQuery({
    page,
    limit: PAGE_SIZE,
  });

  const doctors = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    let result = data.data;

    if (specialization !== 'All') {
      result = result.filter(
        doctor => doctor.specialization === specialization,
      );
    }

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.trim().toLowerCase();

      result = result.filter(doctor =>
        [doctor.name, doctor.specialization].some(value =>
          value.toLowerCase().includes(query),
        ),
      );
    }

    return result;
  }, [data?.data, specialization, debouncedSearch]);

  const handleDoctorPress = useCallback(
    (doctor: Doctor) => {
      navigation.navigate('DoctorDetails', {
        doctor,
      });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<Doctor> = useCallback(
    ({ item }) => <DoctorCard doctor={item} onPress={handleDoctorPress} />,
    [handleDoctorPress],
  );

  const keyExtractor = useCallback((item: Doctor) => item.id, []);

  const handleRefresh = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  const handleEndReached = useCallback(() => {
    if (!isFetching && data?.hasNextPage) {
      setPage(current => current + 1);
    }
  }, [isFetching, data?.hasNextPage]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading doctors...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Unable to load doctors</Text>

        <Text style={styles.errorText}>
          Please check your connection and try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find an Ayurvedic Doctor</Text>

      <Pressable
        style={styles.myBookingButton}
        onPress={() => navigation.navigate('UpcomingConsultation')}
      >
        <Text style={styles.myBookingText}>My Consultation</Text>
      </Pressable>

      <Text style={styles.subtitle}>
        Choose from experienced Ayurvedic specialists
      </Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search doctors..."
        placeholderTextColor="#9CA3AF"
        style={styles.search}
      />

      <DoctorFilters selected={specialization} onChange={setSpecialization} />

      {doctors.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>No doctors found</Text>

          <Text style={styles.emptyText}>
            Try changing your search or filters.
          </Text>
        </View>
      ) : (
        <FlashList
          data={doctors}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && page === 1}
              onRefresh={handleRefresh}
            />
          }
          ListFooterComponent={
            isFetching && page > 1 ? (
              <ActivityIndicator style={styles.footer} />
            ) : null
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default DoctorListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F3',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 20,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 16,
  },

  search: {
    height: 48,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#1F2933',
  },

  listContent: {
    paddingBottom: 24,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  loadingText: {
    marginTop: 12,
    color: '#6B7280',
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  errorText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#6B7280',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  emptyText: {
    marginTop: 8,
    color: '#6B7280',
    textAlign: 'center',
  },

  footer: {
    marginVertical: 20,
  },
  myBookingButton: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#E8EFE5',
  },

  myBookingText: {
    color: colors.primary,
    fontWeight: '700',
  },
});
