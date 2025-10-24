/**
 * Diary Store
 * Manages diary entries, daily summaries, and water intake
 */

import { create } from 'zustand';
import { DiaryEntry, DailyDiary, MealType } from '@/types';
import { diaryRepository } from '@/data/repositories';
import { AddDiaryEntryUseCase } from '@/domain/usecases/diary';
import { GetDailyDiaryUseCase } from '@/domain/usecases/diary';
import { foodRepository } from '@/data/repositories';
import { format } from 'date-fns';

interface DiaryState {
  selectedDate: Date;
  dailyDiary: DailyDiary | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSelectedDate: (date: Date) => void;
  loadDailyDiary: (userId: string, date: Date) => Promise<void>;
  addEntry: (userId: string, foodId: string, mealType: MealType, servings: number, notes?: string) => Promise<void>;
  updateEntry: (entryId: string, servings: number) => Promise<void>;
  deleteEntry: (entryId: string) => Promise<void>;
  updateWaterIntake: (userId: string, amount: number) => Promise<void>;
  updateWeight: (userId: string, weight: number) => Promise<void>;
}

export const useDiaryStore = create<DiaryState>((set, get) => ({
  selectedDate: new Date(),
  dailyDiary: null,
  isLoading: false,
  error: null,

  setSelectedDate: (date: Date) => {
    set({ selectedDate: date });
  },

  loadDailyDiary: async (userId: string, date: Date) => {
    set({ isLoading: true, error: null });
    try {
      const useCase = new GetDailyDiaryUseCase(diaryRepository);
      const diary = await useCase.execute(userId, date);
      set({ dailyDiary: diary, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load diary',
        isLoading: false,
      });
    }
  },

  addEntry: async (userId: string, foodId: string, mealType: MealType, servings: number, notes?: string) => {
    const { selectedDate } = get();
    set({ isLoading: true, error: null });

    try {
      const useCase = new AddDiaryEntryUseCase(diaryRepository, foodRepository);
      await useCase.execute({
        userId,
        foodId,
        mealType,
        servings,
        date: selectedDate,
        notes,
      });

      // Reload diary after adding entry
      await get().loadDailyDiary(userId, selectedDate);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add entry',
        isLoading: false,
      });
    }
  },

  updateEntry: async (entryId: string, servings: number) => {
    set({ isLoading: true, error: null });
    try {
      const entry = await diaryRepository.getById(entryId);
      if (!entry) {
        throw new Error('Entry not found');
      }

      // Get food to recalculate nutrition
      const food = await foodRepository.getById(entry.foodId);
      if (!food) {
        throw new Error('Food not found');
      }

      const updates = {
        servings,
        calories: Math.round(food.calories * servings),
        carbs: parseFloat((food.carbs * servings).toFixed(1)),
        proteins: parseFloat((food.proteins * servings).toFixed(1)),
        fats: parseFloat((food.fats * servings).toFixed(1)),
      };

      await diaryRepository.update(entryId, updates);

      // Reload diary
      const { dailyDiary } = get();
      if (dailyDiary) {
        const updatedEntry = dailyDiary.entries.find(e => e.id === entryId);
        if (updatedEntry) {
          await get().loadDailyDiary(entry.userId, entry.date);
        }
      }

      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update entry',
        isLoading: false,
      });
    }
  },

  deleteEntry: async (entryId: string) => {
    set({ isLoading: true, error: null });
    try {
      const entry = await diaryRepository.getById(entryId);
      if (!entry) {
        throw new Error('Entry not found');
      }

      await diaryRepository.delete(entryId);

      // Reload diary
      await get().loadDailyDiary(entry.userId, entry.date);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete entry',
        isLoading: false,
      });
    }
  },

  updateWaterIntake: async (userId: string, amount: number) => {
    const { selectedDate, dailyDiary } = get();
    set({ isLoading: true, error: null });

    try {
      const newWaterIntake = (dailyDiary?.waterIntake || 0) + amount;
      await diaryRepository.updateWaterIntake(userId, selectedDate, newWaterIntake);

      // Update local state
      if (dailyDiary) {
        set({
          dailyDiary: {
            ...dailyDiary,
            waterIntake: newWaterIntake,
          },
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update water intake',
        isLoading: false,
      });
    }
  },

  updateWeight: async (userId: string, weight: number) => {
    const { selectedDate, dailyDiary } = get();
    set({ isLoading: true, error: null });

    try {
      await diaryRepository.updateWeight(userId, selectedDate, weight);

      // Update local state
      if (dailyDiary) {
        set({
          dailyDiary: {
            ...dailyDiary,
            weight,
          },
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update weight',
        isLoading: false,
      });
    }
  },
}));
