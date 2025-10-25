/**
 * Pie Chart Component
 * Displays distribution data
 */

import React from 'react';
import { View, Dimensions } from 'react-native';
import { VictoryPie, VictoryLegend } from 'victory-native';
import { useTheme } from '@/core/theme';

interface PieChartData {
  x: string;
  y: number;
  color?: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 200,
}) => {
  const { theme } = useTheme();

  return (
    <View style={{ alignItems: 'center' }}>
      <VictoryPie
        data={data}
        width={size}
        height={size}
        colorScale={data.map(d => d.color || theme.colors.primary)}
        style={{
          labels: { fill: theme.colors.text.primary, fontSize: 12 },
        }}
        animate={{
          duration: 1000,
        }}
      />
    </View>
  );
};
