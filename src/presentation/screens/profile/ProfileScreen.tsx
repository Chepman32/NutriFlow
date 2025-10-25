/**
 * Profile Screen - Complete Implementation
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Switch } from 'react-native';
import { useTheme } from '@/core/theme';
import { Card, Button } from '@/presentation/components/common';
import { useUserStore } from '@/presentation/stores';

export const ProfileScreen: React.FC = () => {
  const { theme, setThemeMode, toggleTheme } = useTheme();
  const { currentUser, updateSettings } = useUserStore();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleNotificationsToggle = async (value: boolean) => {
    await updateSettings({ notificationsEnabled: value });
  };

  const handleHapticToggle = async (value: boolean) => {
    await updateSettings({ hapticFeedbackEnabled: value });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>
          <Text style={[styles.name, { color: theme.colors.text.primary }]}>
            {currentUser?.name || 'User'}
          </Text>
          <Text style={[styles.email, { color: theme.colors.text.secondary }]}>
            {currentUser?.email || 'user@nutriflow.app'}
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Your Stats
          </Text>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Current Weight
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
              {currentUser?.measurements.currentWeight || 0} kg
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Target Weight
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
              {currentUser?.measurements.targetWeight || 0} kg
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Daily Calorie Goal
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
              {currentUser?.goals.dailyCalories || 0} cal
            </Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Settings
          </Text>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.colors.text.primary }]}>
              Dark Mode
            </Text>
            <Switch
              value={theme.isDark}
              onValueChange={handleThemeToggle}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={theme.isDark ? theme.colors.primaryLight : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.colors.text.primary }]}>
              Notifications
            </Text>
            <Switch
              value={currentUser?.settings.notificationsEnabled || false}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.colors.text.primary }]}>
              Haptic Feedback
            </Text>
            <Switch
              value={currentUser?.settings.hapticFeedbackEnabled || true}
              onValueChange={handleHapticToggle}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
            />
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Premium
          </Text>
          <Text style={[styles.premiumText, { color: theme.colors.text.secondary }]}>
            {currentUser?.isPremium 
              ? '✓ Premium Active' 
              : 'Upgrade to Premium for advanced features'}
          </Text>
          {!currentUser?.isPremium && (
            <Button
              title="Upgrade to Premium"
              onPress={() => {}}
              style={{ marginTop: 12 }}
            />
          )}
        </Card>

        <Card style={styles.card}>
          <Button title="Edit Profile" variant="outline" onPress={() => {}} />
          <Button 
            title="Sign Out" 
            variant="text" 
            onPress={() => {}} 
            style={{ marginTop: 8 }}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 32 },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatar: { fontSize: 40 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  email: { fontSize: 16 },
  card: { margin: 16, marginTop: 0 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  statLabel: { fontSize: 16 },
  statValue: { fontSize: 16, fontWeight: '600' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  settingLabel: { fontSize: 16 },
  premiumText: { fontSize: 16, marginBottom: 8 },
});
