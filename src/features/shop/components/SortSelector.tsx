import React, { memo } from 'react';

import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import type { ProductSort } from '../types/product';
import { colors } from '../../../theme/colors';

interface Props {
  value: ProductSort;

  onChange: (value: ProductSort) => void;
}

const options: {
  value: ProductSort;
  label: string;
}[] = [
  {
    value: 'relevance',
    label: 'Relevance',
  },
  {
    value: 'price_low_high',
    label: 'Price: Low → High',
  },
  {
    value: 'price_high_low',
    label: 'Price: High → Low',
  },
  {
    value: 'rating',
    label: 'Top Rated',
  },
  {
    value: 'newest',
    label: 'Newest',
  },
];

const SortSelector = memo(({ value, onChange }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {options.map(option => {
        const selected = option.value === value;

        return (
          <Pressable
            key={option.value}
            style={[styles.option, selected && styles.selected]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.text, selected && styles.selectedText]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
});

SortSelector.displayName = 'SortSelector';

export default SortSelector;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },

  option: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.white,
    // height:35
  },

  selected: {
    backgroundColor: colors.primary,
  },

  text: {
    fontSize: 12,
    color: colors.text,
  },

  selectedText: {
    color: colors.white,
    fontWeight: '700',
  },
});
