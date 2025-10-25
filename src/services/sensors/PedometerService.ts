/**
 * Pedometer Service (Stub)
 * Step counting integration
 */

export class PedometerService {
  async requestPermissions(): Promise<boolean> {
    console.log('Pedometer: Requesting permissions (stub)');
    return true;
  }

  async getStepCount(): Promise<number> {
    console.log('Pedometer: Getting step count (stub)');
    return 0;
  }

  startTracking(callback: (steps: number) => void): void {
    console.log('Pedometer: Start tracking (stub)');
  }

  stopTracking(): void {
    console.log('Pedometer: Stop tracking (stub)');
  }
}

export const pedometerService = new PedometerService();
