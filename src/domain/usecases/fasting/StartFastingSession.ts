/**
 * Start Fasting Session Use Case
 */

import { FastingSession, FastingType } from '@/types';

export interface StartFastingSessionInput {
  userId: string;
  type: FastingType;
  startTime?: Date;
}

export class StartFastingSessionUseCase {
  async execute(input: StartFastingSessionInput): Promise<FastingSession> {
    const { userId, type, startTime = new Date() } = input;

    // Calculate end time based on fasting type
    const duration = this.getDurationForType(type);
    const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000);

    const session: FastingSession = {
      id: `fasting_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      startTime,
      endTime,
      duration,
      completed: false,
    };

    return session;
  }

  private getDurationForType(type: FastingType): number {
    const durations: Record<FastingType, number> = {
      '16_8': 16,
      '18_6': 18,
      '20_4': 20,
      '5_2': 24,
      omad: 23,
      custom: 16,
    };

    return durations[type] || 16;
  }
}
