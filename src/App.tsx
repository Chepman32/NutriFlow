/**
 * NutriFlow - Main App Component
 * Gesture-driven, offline-first calorie and nutrition tracking application
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '@/core/theme';
import { databaseService } from '@/data/database/DatabaseService';
import { runMigrations } from '@/data/database/migrations';
import { seedDatabase } from '@/data/database/seeds';
import { RootNavigator } from '@/presentation/navigation/RootNavigator';

/**
 * App initialization screen
 */
const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('Initializing NutriFlow...');

      // Initialize database
      await databaseService.initialize();
      console.log('Database initialized');

      // Run migrations
      await runMigrations();
      console.log('Migrations completed');

      // Seed database with initial data
      await seedDatabase();
      console.log('Database seeding completed');

      // Get database statistics
      const stats = await databaseService.getStatistics();
      console.log('Database statistics:', stats);

      setIsInitialized(true);
      console.log('App initialization complete');
    } catch (err) {
      console.error('App initialization failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centerContent}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            Initialization Error
          </Text>
          <Text style={[styles.errorMessage, { color: theme.colors.text.secondary }]}>
            {error}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isInitialized) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
            Initializing NutriFlow...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return <>{children}</>;
};

/**
 * Main App Content
 */
const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <RootNavigator />
    </>
  );
};

/**
 * Root App Component
 */
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <ThemeProvider>
        <AppInitializer>
          <AppContent />
        </AppInitializer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default App;
