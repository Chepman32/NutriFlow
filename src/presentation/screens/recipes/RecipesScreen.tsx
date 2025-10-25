/**
 * Recipes Screen - Premium Feature
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@/core/theme';
import { Card, Button } from '@/presentation/components/common';
import { useUserStore } from '@/presentation/stores';

export const RecipesScreen: React.FC = () => {
  const { theme } = useTheme();
  const { currentUser } = useUserStore();

  const isPremium = currentUser?.isPremium || false;

  if (!isPremium) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.premiumPrompt}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={[styles.premiumTitle, { color: theme.colors.text.primary }]}>
            Premium Feature
          </Text>
          <Text style={[styles.premiumText, { color: theme.colors.text.secondary }]}>
            Unlock 500+ healthy recipes with nutritional information
          </Text>
          <Button
            title="Upgrade to Premium"
            onPress={() => {}}
            style={{ marginTop: 24 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Recipes
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Featured Recipes
          </Text>
          <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
            500+ curated recipes coming soon
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  card: { margin: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  emptyText: { textAlign: 'center', padding: 20 },
  premiumPrompt: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  lockIcon: { fontSize: 64, marginBottom: 24 },
  premiumTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  premiumText: { fontSize: 16, textAlign: 'center', marginBottom: 8 },
});
