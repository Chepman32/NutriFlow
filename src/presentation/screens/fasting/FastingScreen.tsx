/**
 * Fasting Screen - Premium Feature
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/core/theme';
import { Card, Button } from '@/presentation/components/common';
import { useUserStore } from '@/presentation/stores';
import { StartFastingSessionUseCase } from '@/domain/usecases/fasting';

export const FastingScreen: React.FC = () => {
  const { theme } = useTheme();
  const { currentUser } = useUserStore();
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('16:00');

  const startFasting = async () => {
    const useCase = new StartFastingSessionUseCase();
    const session = await useCase.execute({
      userId: currentUser?.id || '',
      type: '16_8',
    });
    setIsActive(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Intermittent Fasting
        </Text>

        <Card style={styles.timerCard}>
          <Text style={[styles.timerLabel, { color: theme.colors.text.secondary }]}>
            {isActive ? 'Time Remaining' : 'Ready to Fast'}
          </Text>
          <Text style={[styles.timer, { color: theme.colors.primary }]}>
            {timeRemaining}
          </Text>
          <Button
            title={isActive ? 'End Fast' : 'Start 16:8 Fast'}
            onPress={() => isActive ? setIsActive(false) : startFasting()}
            style={{ marginTop: 24 }}
          />
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Fasting Plans
          </Text>
          {['16:8', '18:6', '20:4', 'OMAD'].map(plan => (
            <View key={plan} style={styles.planRow}>
              <Text style={[styles.planText, { color: theme.colors.text.primary }]}>
                {plan}
              </Text>
            </View>
          ))}
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  timerCard: { alignItems: 'center', paddingVertical: 40 },
  timerLabel: { fontSize: 18, marginBottom: 16 },
  timer: { fontSize: 64, fontWeight: 'bold' },
  card: { marginTop: 24 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  planRow: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  planText: { fontSize: 16 },
});
