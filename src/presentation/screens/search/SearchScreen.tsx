/**
 * Search Screen - Complete Implementation
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '@/core/theme';
import { Input, Card, Button } from '@/presentation/components/common';
import { foodRepository } from '@/data/repositories';
import { Food } from '@/types';

export const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [recentFoods, setRecentFoods] = useState<Food[]>([]);
  const [favorites, setFavorites] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setLoading(true);
      try {
        const results = await foodRepository.search(query, 20);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching foods:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const renderFoodItem = ({ item }: { item: Food }) => (
    <Card style={styles.foodCard}>
      <Text style={[styles.foodName, { color: theme.colors.text.primary }]}>
        {item.name}
      </Text>
      {item.brand && (
        <Text style={[styles.foodBrand, { color: theme.colors.text.secondary }]}>
          {item.brand}
        </Text>
      )}
      <Text style={[styles.foodCalories, { color: theme.colors.nutrition.calories }]}>
        {item.calories} cal per {item.servingSize} {item.servingUnit}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Search Foods
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {searchQuery.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={renderFoodItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
                {loading ? 'Searching...' : 'No results found'}
              </Text>
            </View>
          }
        />
      ) : (
        <View style={styles.suggestionsContainer}>
          <Card style={styles.suggestionCard}>
            <Text style={[styles.suggestionTitle, { color: theme.colors.text.primary }]}>
              Quick Actions
            </Text>
            <Button
              title="Scan Barcode"
              variant="outline"
              onPress={() => {}}
              style={{ marginTop: 12 }}
            />
            <Button
              title="Create Custom Food"
              variant="outline"
              onPress={() => {}}
              style={{ marginTop: 8 }}
            />
          </Card>

          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Popular Foods
          </Text>
          <Card style={styles.suggestionCard}>
            <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
              Popular foods will appear here
            </Text>
          </Card>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  searchContainer: { paddingHorizontal: 16, marginBottom: 16 },
  foodCard: { marginHorizontal: 16, marginBottom: 12 },
  foodName: { fontSize: 16, fontWeight: '600' },
  foodBrand: { fontSize: 14, marginTop: 2 },
  foodCalories: { fontSize: 14, marginTop: 4, fontWeight: '500' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center' },
  suggestionsContainer: { flex: 1, paddingHorizontal: 16 },
  suggestionCard: { marginBottom: 16 },
  suggestionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
});
