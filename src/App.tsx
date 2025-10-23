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
  useColorScheme,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '@/core/theme';
import { databaseService } from '@/data/database/DatabaseService';
import { runMigrations } from '@/data/database/migrations';

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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View style={styles.centerContent}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          NutriFlow
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Gesture-driven Nutrition Tracking
        </Text>
        <Text style={[styles.version, { color: theme.colors.text.hint }]}>
          v1.0.0 - Foundation Complete
        </Text>
        <View style={styles.infoBox}>
          <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>
            ✓ Core Infrastructure Ready
          </Text>
          <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>
            ✓ Database Initialized
          </Text>
          <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>
            ✓ Theme System Active
          </Text>
          <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>
            ✓ Type System Complete
          </Text>
        </View>
        <Text style={[styles.note, { color: theme.colors.text.hint }]}>
          UI Components and screens will be implemented next
        </Text>
      </View>
    </SafeAreaView>
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
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
  },
  version: {
    fontSize: 14,
    marginBottom: 30,
  },
  infoBox: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
  },
  note: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
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
