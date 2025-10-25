/**
 * Line Chart Component
 * Displays trends over time using Victory Native
 */

import React from 'react';
import { View, Dimensions } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import { useTheme } from '@/core/theme';
import { ChartDataPoint } from '@/types';

interface LineChartProps {
  data: ChartDataPoint[];
  color?: string;
  width?: number;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  color,
  width = Dimensions.get('window').width - 40,
  height = 200,
}) => {
  const { theme } = useTheme();
  const lineColor = color || theme.colors.primary;

  return (
    <View>
      <VictoryChart
        width={width}
        height={height}
        theme={VictoryTheme.material}
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: theme.colors.surfaceVariant },
            tickLabels: { fill: theme.colors.text.secondary, fontSize: 10 },
            grid: { stroke: theme.colors.surfaceVariant, strokeDasharray: '4,4' },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: theme.colors.surfaceVariant },
            tickLabels: { fill: theme.colors.text.secondary, fontSize: 10 },
            grid: { stroke: theme.colors.surfaceVariant, strokeDasharray: '4,4' },
          }}
        />
        <VictoryLine
          data={data}
          style={{
            data: { stroke: lineColor, strokeWidth: 3 },
          }}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 },
          }}
        />
      </VictoryChart>
    </View>
  );
};
