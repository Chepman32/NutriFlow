/**
 * Get Nutrition Trends Use Case
 * Retrieves nutrition data over a time period
 */

import { NutritionTrend, TimeRange } from '@/types';
import { IDiaryRepository } from '@/domain/interfaces/IRepository';
import { startOfDay, endOfDay, subDays, subMonths } from 'date-fns';

export class GetNutritionTrendsUseCase {
  constructor(private diaryRepository: IDiaryRepository) {}

  async execute(
    userId: string,
    range: TimeRange,
    customStart?: Date,
    customEnd?: Date,
  ): Promise<NutritionTrend[]> {
    const { startDate, endDate } = this.getDateRange(range, customStart, customEnd);

    const entries = await this.diaryRepository.getByDateRange(userId, startDate, endDate);

    // Group entries by date
    const entriesByDate = new Map<string, typeof entries>();
    entries.forEach(entry => {
      const dateKey = entry.date.toISOString().split('T')[0];
      if (!entriesByDate.has(dateKey)) {
        entriesByDate.set(dateKey, []);
      }
      entriesByDate.get(dateKey)!.push(entry);
    });

    // Calculate daily trends
    const trends: NutritionTrend[] = [];
    entriesByDate.forEach((dayEntries, dateKey) => {
      const totalCalories = dayEntries.reduce((sum, e) => sum + e.calories, 0);
      const totalCarbs = dayEntries.reduce((sum, e) => sum + e.carbs, 0);
      const totalProteins = dayEntries.reduce((sum, e) => sum + e.proteins, 0);
      const totalFats = dayEntries.reduce((sum, e) => sum + e.fats, 0);

      // Get water intake for this date
      const date = new Date(dateKey);
      let water = 0;
      // This would come from daily summary
      // For now, we'll set a default
      water = 2000;

      trends.push({
        date,
        calories: totalCalories,
        carbs: totalCarbs,
        proteins: totalProteins,
        fats: totalFats,
        water,
      });
    });

    return trends.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private getDateRange(
    range: TimeRange,
    customStart?: Date,
    customEnd?: Date,
  ): { startDate: Date; endDate: Date } {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = endOfDay(now);

    switch (range) {
      case 'week':
        startDate = startOfDay(subDays(now, 7));
        break;
      case 'month':
        startDate = startOfDay(subMonths(now, 1));
        break;
      case 'quarter':
        startDate = startOfDay(subMonths(now, 3));
        break;
      case 'year':
        startDate = startOfDay(subMonths(now, 12));
        break;
      case 'custom':
        startDate = customStart ? startOfDay(customStart) : startOfDay(subDays(now, 30));
        endDate = customEnd ? endOfDay(customEnd) : endOfDay(now);
        break;
      default:
        startDate = startOfDay(subDays(now, 7));
    }

    return { startDate, endDate };
  }
}
