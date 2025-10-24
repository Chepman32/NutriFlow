/**
 * Diary Screen
 * Main diary view with calorie ring and meal entries
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/core/theme';
import { useDiaryStore, useUserStore } from '@/presentation/stores';
import { CalorieRing } from '@/presentation/components/diary/CalorieRing';
import { Card, Button } from '@/presentation/components/common';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

export const DiaryScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { currentUser } = useUserStore();
  const { selectedDate, dailyDiary, loadDailyDiary } = useDiaryStore();

  useEffect(() => {
    if (currentUser) {
      loadDailyDiary(currentUser.id, selectedDate);
    }
  }, [currentUser, selectedDate]);

  const consumed = dailyDiary?.totalCalories || 0;
  const target = currentUser?.goals.dailyCalories || 2000;
  const remaining = target - consumed;

  const meals = [
    { type: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { type: 'lunch', label: 'Lunch', icon: '☀️' },
    { type: 'dinner', label: 'Dinner', icon: '🌙' },
    { type: 'snacks', label: 'Snacks', icon: '🍎' },
  ];

  const getMealEntries = (mealType: string) => {
    return dailyDiary?.entries.filter(e => e.mealType === mealType) || [];
  };

  const getMealCalories = (mealType: string) => {
    return getMealEntries(mealType).reduce((sum, e) => sum + e.calories, 0);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={[styles.date, { color: theme.colors.text.primary }]}>
            {format(selectedDate, 'MMMM dd, yyyy')}
          </Text>
        </View>

        <View style={styles.ringContainer}>
          <CalorieRing consumed={consumed} target={target} />
        </View>

        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: theme.colors.nutrition.carbs }]}>
              {dailyDiary?.totalCarbs.toFixed(0) || 0}g
            </Text>
            <Text style={[styles.macroLabel, { color: theme.colors.text.secondary }]}>
              Carbs
            </Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: theme.colors.nutrition.proteins }]}>
              {dailyDiary?.totalProteins.toFixed(0) || 0}g
            </Text>
            <Text style={[styles.macroLabel, { color: theme.colors.text.secondary }]}>
              Protein
            </Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={[styles.macroValue, { color: theme.colors.nutrition.fats }]}>
              {dailyDiary?.totalFats.toFixed(0) || 0}g
            </Text>
            <Text style={[styles.macroLabel, { color: theme.colors.text.secondary }]}>
              Fats
            </Text>
          </View>
        </View>

        <View style={styles.mealsContainer}>
          {meals.map(meal => (
            <Card key={meal.type} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <View style={styles.mealTitleContainer}>
                  <Text style={styles.mealIcon}>{meal.icon}</Text>
                  <Text style={[styles.mealTitle, { color: theme.colors.text.primary }]}>
                    {meal.label}
                  </Text>
                </View>
                <Text style={[styles.mealCalories, { color: theme.colors.text.secondary }]}>
                  {getMealCalories(meal.type)} cal
                </Text>
              </View>

              {getMealEntries(meal.type).map(entry => (
                <View key={entry.id} style={styles.entryItem}>
                  <Text style={[styles.entryName, { color: theme.colors.text.primary }]}>
                    {entry.food?.name || 'Food'}
                  </Text>
                  <Text style={[styles.entryDetails, { color: theme.colors.text.secondary }]}>
                    {entry.servings} x {entry.food?.servingSize} {entry.food?.servingUnit}
                  </Text>
                </View>
              ))}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddFood' as never, { mealType: meal.type })}
              >
                <Text style={[styles.addButtonText, { color: theme.colors.primary }]}>
                  + Add Food
                </Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, alignItems: 'center' },
  date: { fontSize: 20, fontWeight: 'bold' },
  ringContainer: { alignItems: 'center', marginVertical: 24 },
  macrosContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginBottom: 24 },
  macroItem: { alignItems: 'center' },
  macroValue: { fontSize: 24, fontWeight: 'bold' },
  macroLabel: { fontSize: 14, marginTop: 4 },
  mealsContainer: { padding: 16 },
  mealCard: { marginBottom: 16 },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  mealTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  mealIcon: { fontSize: 24, marginRight: 8 },
  mealTitle: { fontSize: 18, fontWeight: '600' },
  mealCalories: { fontSize: 16 },
  entryItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  entryName: { fontSize: 16, fontWeight: '500' },
  entryDetails: { fontSize: 14, marginTop: 2 },
  addButton: { marginTop: 12, padding: 12, alignItems: 'center' },
  addButtonText: { fontSize: 16, fontWeight: '600' },
});
