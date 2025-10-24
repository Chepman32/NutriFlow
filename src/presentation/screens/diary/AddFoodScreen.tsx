/**
 * Add Food Screen
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '@/core/theme';
import { Input, Card, Button } from '@/presentation/components/common';
import { foodRepository } from '@/data/repositories';
import { useDiaryStore, useUserStore } from '@/presentation/stores';
import { useNavigation, useRoute } from '@react-navigation/native';

export const AddFoodScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { mealType } = route.params as any;
  const { currentUser } = useUserStore();
  const { addEntry } = useDiaryStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [servings, setServings] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = await foodRepository.search(query, 20);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectFood = (food: any) => {
    setSelectedFood(food);
  };

  const handleAddFood = async () => {
    if (!selectedFood || !currentUser) return;

    setLoading(true);
    try {
      await addEntry(
        currentUser.id,
        selectedFood.id,
        mealType,
        parseFloat(servings) || 1
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error adding food:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>

      {selectedFood ? (
        <View style={styles.selectedContainer}>
          <Card>
            <Text style={[styles.foodName, { color: theme.colors.text.primary }]}>
              {selectedFood.name}
            </Text>
            <Text style={[styles.foodBrand, { color: theme.colors.text.secondary }]}>
              {selectedFood.brand}
            </Text>
            <Text style={[styles.foodServing, { color: theme.colors.text.secondary }]}>
              {selectedFood.servingSize} {selectedFood.servingUnit} = {selectedFood.calories} cal
            </Text>

            <Input
              label="Servings"
              value={servings}
              onChangeText={setServings}
              keyboardType="numeric"
              style={{ marginTop: 16 }}
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setSelectedFood(null)}
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Add to Diary"
                onPress={handleAddFood}
                loading={loading}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </Card>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.resultCard} onPress={() => handleSelectFood(item)}>
              <Text style={[styles.resultName, { color: theme.colors.text.primary }]}>
                {item.name}
              </Text>
              {item.brand && (
                <Text style={[styles.resultBrand, { color: theme.colors.text.secondary }]}>
                  {item.brand}
                </Text>
              )}
              <Text style={[styles.resultCalories, { color: theme.colors.nutrition.calories }]}>
                {item.calories} cal per {item.servingSize} {item.servingUnit}
              </Text>
            </Card>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
                {searchQuery.length > 0
                  ? 'No results found'
                  : 'Start typing to search for foods'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { padding: 16 },
  selectedContainer: { padding: 16 },
  foodName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  foodBrand: { fontSize: 16, marginBottom: 4 },
  foodServing: { fontSize: 14, marginBottom: 16 },
  buttonContainer: { flexDirection: 'row', marginTop: 16 },
  resultCard: { marginHorizontal: 16, marginBottom: 12 },
  resultName: { fontSize: 16, fontWeight: '600' },
  resultBrand: { fontSize: 14, marginTop: 2 },
  resultCalories: { fontSize: 14, marginTop: 4, fontWeight: '500' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center' },
});
