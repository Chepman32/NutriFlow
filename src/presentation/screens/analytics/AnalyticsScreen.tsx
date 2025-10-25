/**
 * Analytics Screen - Complete Implementation
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/core/theme';
import { Card } from '@/presentation/components/common';
import { LineChart, PieChart } from '@/presentation/components/charts';
import { useUserStore, useDiaryStore } from '@/presentation/stores';
import { GetNutritionTrendsUseCase } from '@/domain/usecases/analytics';
import { diaryRepository } from '@/data/repositories';
import { NutritionTrend } from '@/types';

export const AnalyticsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { currentUser } = useUserStore();
  const [trends, setTrends] = useState<NutritionTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [currentUser]);

  const loadAnalytics = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const useCase = new GetNutritionTrendsUseCase(diaryRepository);
      const data = await useCase.execute(currentUser.id, 'week');
      setTrends(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calorieData = trends.map(t => ({
    x: t.date.getDate(),
    y: t.calories,
  }));

  const macroData = [
    { x: 'Carbs', y: trends.reduce((sum, t) => sum + t.carbs, 0), color: theme.colors.nutrition.carbs },
    { x: 'Protein', y: trends.reduce((sum, t) => sum + t.proteins, 0), color: theme.colors.nutrition.proteins },
    { x: 'Fats', y: trends.reduce((sum, t) => sum + t.fats, 0), color: theme.colors.nutrition.fats },
  ];

  const averageCalories = trends.length > 0
    ? Math.round(trends.reduce((sum, t) => sum + t.calories, 0) / trends.length)
    : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Analytics
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Last 7 days
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Calorie Trend
          </Text>
          {calorieData.length > 0 ? (
            <LineChart data={calorieData} color={theme.colors.nutrition.calories} />
          ) : (
            <Text style={[styles.noData, { color: theme.colors.text.secondary }]}>
              No data available
            </Text>
          )}
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Macro Distribution
          </Text>
          {macroData.some(d => d.y > 0) ? (
            <PieChart data={macroData} />
          ) : (
            <Text style={[styles.noData, { color: theme.colors.text.secondary }]}>
              No data available
            </Text>
          )}
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Summary
          </Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
              Average Calories
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
              {averageCalories} cal/day
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
              Days Tracked
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
              {trends.length} days
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 16 },
  card: { margin: 16, marginTop: 0 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  noData: { textAlign: 'center', padding: 40, fontSize: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  summaryLabel: { fontSize: 16 },
  summaryValue: { fontSize: 16, fontWeight: '600' },
});
