import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SPECIALIZATIONS = [
  'All',
  'Ayurvedic Physician',
  'Panchakarma Specialist',
  'Dermatology',
  'Digestive Health',
  'Women’s Health',
  'Stress Management',
  'Joint Care',
];

interface DoctorFiltersProps {
  selected: string;
  onChange: (value: string) => void;
}

const DoctorFilters = ({
  selected,
  onChange,
}: DoctorFiltersProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {SPECIALIZATIONS.map(item => {
          const active = item === selected;

          return (
            <Pressable
              key={item}
              onPress={() => onChange(item)}
              style={[
                styles.filter,
                active && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  active && styles.activeText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DoctorFilters;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },

  content: {
    paddingHorizontal: 16,
  },

  filter: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F1F3EE',
  },

  activeFilter: {
    backgroundColor: '#4F6F52',
  },

  text: {
    fontSize: 13,
    color: '#374151',
  },

  activeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});