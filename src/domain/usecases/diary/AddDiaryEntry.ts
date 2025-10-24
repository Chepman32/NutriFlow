/**
 * Add Diary Entry Use Case
 * Handles adding a food item to the user's diary
 */

import { DiaryEntry, Food } from '@/types';
import { IDiaryRepository, IFoodRepository } from '@/domain/interfaces/IRepository';

export interface AddDiaryEntryInput {
  userId: string;
  foodId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  servings: number;
  date: Date;
  notes?: string;
}

export class AddDiaryEntryUseCase {
  constructor(
    private diaryRepository: IDiaryRepository,
    private foodRepository: IFoodRepository,
  ) {}

  async execute(input: AddDiaryEntryInput): Promise<DiaryEntry> {
    // Get food details
    const food = await this.foodRepository.getById(input.foodId);
    if (!food) {
      throw new Error('Food not found');
    }

    // Calculate nutrition based on servings
    const calories = Math.round(food.calories * input.servings);
    const carbs = parseFloat((food.carbs * input.servings).toFixed(1));
    const proteins = parseFloat((food.proteins * input.servings).toFixed(1));
    const fats = parseFloat((food.fats * input.servings).toFixed(1));

    // Create diary entry
    const entry: DiaryEntry = {
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: input.userId,
      date: input.date,
      mealType: input.mealType,
      foodId: input.foodId,
      servings: input.servings,
      calories,
      carbs,
      proteins,
      fats,
      createdAt: new Date(),
      notes: input.notes,
    };

    // Save to repository
    const savedEntry = await this.diaryRepository.create(entry);

    return savedEntry;
  }
}
