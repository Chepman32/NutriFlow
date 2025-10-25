/**
 * Get Weight Progress Use Case
 * Calculates weight loss/gain progress towards goal
 */

import { WeightProgress } from '@/types';
import { IUserRepository } from '@/domain/interfaces/IRepository';

export class GetWeightProgressUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<WeightProgress> {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const { currentWeight, targetWeight } = user.measurements;
    const startWeight = currentWeight; // In a real app, this would be historical
    const weightLost = startWeight - currentWeight;
    const weightRemaining = Math.abs(targetWeight - currentWeight);
    const totalWeightToLose = Math.abs(targetWeight - startWeight);
    const progressPercentage = totalWeightToLose > 0 
      ? Math.round((Math.abs(weightLost) / totalWeightToLose) * 100)
      : 0;

    const weeklyChange = user.goals.weeklyWeightChange;
    const estimatedWeeksToGoal = weeklyChange !== 0
      ? Math.ceil(weightRemaining / Math.abs(weeklyChange))
      : 0;

    return {
      startWeight,
      currentWeight,
      targetWeight,
      weightLost,
      weightRemaining,
      progressPercentage,
      averageWeeklyChange: weeklyChange,
      estimatedWeeksToGoal,
    };
  }
}
