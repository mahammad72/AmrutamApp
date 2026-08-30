import React, { memo } from 'react';

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { ProductCategory } from '../types/product';

interface Props {
  selectedCategories: ProductCategory[];

  minRating?: number;

  onToggleCategory: (category: ProductCategory) => void;

  onRatingChange: (rating?: number) => void;

  onClear: () => void;
}

const categories: ProductCategory[] = [
  'Herbal',
  'Supplements',
  'Oils',
  'Skin Care',
  'Hair Care',
  'Digestive Care',
];

const ProductFilters = memo(
  ({
    selectedCategories,
    minRating,
    onToggleCategory,
    onRatingChange,
    onClear,
  }: Props) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>

          <Pressable onPress={onClear}>
            <Text style={styles.clear}>Clear</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Category</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => {
            const selected = selectedCategories.includes(category);

            return (
              <Pressable
                key={category}
                style={[styles.chip, selected && styles.selectedChip]}
                onPress={() => onToggleCategory(category)}
              >
                <Text
                  style={[styles.chipText, selected && styles.selectedText]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={[styles.label, styles.ratingLabel]}>Minimum Rating</Text>

        <View style={styles.ratingRow}>
          {[4, 3, 2].map(rating => {
            const selected = minRating === rating;

            return (
              <Pressable
                key={rating}
                style={[styles.ratingButton, selected && styles.selectedChip]}
                onPress={() => onRatingChange(selected ? undefined : rating)}
              >
                <Text
                  style={[styles.chipText, selected && styles.selectedText]}
                >
                  {rating}+ ★
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  },
);

ProductFilters.displayName = 'ProductFilters';

export default ProductFilters;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
  },

  clear: {
    color: '#4F6F52',
    fontWeight: '700',
  },

  label: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
  },

  chip: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },

  selectedChip: {
    backgroundColor: '#4F6F52',
  },

  chipText: {
    fontSize: 12,
    color: '#374151',
  },

  selectedText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  ratingLabel: {
    marginTop: 15,
  },

  ratingRow: {
    flexDirection: 'row',
  },

  ratingButton: {
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
});
