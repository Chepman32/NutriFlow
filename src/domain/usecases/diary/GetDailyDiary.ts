/**
 * Get Daily Diary Use Case
 * Retrieves all diary entries and summary for a specific date
 */

import { DailyDiary, DiaryEntry, DailySummary } from '@/types';
import { IDiaryRepository } from '@/domain/interfaces/IRepository';

export class GetDailyDiaryUseCase {
  constructor(private diaryRepository: IDiaryRepository) {}

  async execute(userId: string, date: Date): Promise<DailyDiary> {
    // Get all entries for the date
    const entries = await this.diaryRepository.getByDate(userId, date);

    // Get daily summary
    let summary = await this.diaryRepository.getDailySummary(userId, date);

    // If no summary exists, create a default one
    if (!summary) {
      summary = {
        id: `summary_${userId}_${date.toISOString().split('T')[0]}`,
        userId,
        date,
        waterIntake: 0,
        weight: undefined,
        steps: undefined,
        totalCalories: 0,
        totalCarbs: 0,
        totalProteins: 0,
        totalFats: 0,
      };
    }

    // Group entries by meal type
    const mealEntries = {
      breakfast: entries.filter(e => e.mealType === 'breakfast'),
      lunch: entries.filter(e => e.mealType === 'lunch'),
      dinner: entries.filter(e => e.mealType === 'dinner'),
      snacks: entries.filter(e => e.mealType === 'snacks'),
    };

    // Calculate totals
    const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
    const totalCarbs = entries.reduce((sum, entry) => sum + entry.carbs, 0);
    const totalProteins = entries.reduce((sum, entry) => sum + entry.proteins, 0);
    const totalFats = entries.reduce((sum, entry) => sum + entry.fats, 0);

    const dailyDiary: DailyDiary = {
      date,
      entries,
      waterIntake: summary.waterIntake,
      weight: summary.weight,
      steps: summary.steps,
      activities: [], // Will be populated from activities repository
      totalCalories,
      totalCarbs,
      totalProteins,
      totalFats,
      caloriesRemaining: 0, // Will be calculated with user goals
      notes: summary.notes,
    };

    return dailyDiary;
  }
}
