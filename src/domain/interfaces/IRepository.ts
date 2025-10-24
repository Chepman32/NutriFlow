/**
 * Generic Repository Interface
 * Base interface for all repository implementations
 */

export interface IRepository<T> {
  create(entity: T): Promise<T>;
  getById(id: string): Promise<T | null>;
  update(id: string, updates: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IUserRepository {
  create(user: any): Promise<any>;
  getById(userId: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
  update(userId: string, updates: any): Promise<void>;
  updateSettings(userId: string, settings: any): Promise<void>;
  updateGoals(userId: string, goals: any): Promise<void>;
  updateMeasurements(userId: string, measurements: any): Promise<void>;
}

export interface IFoodRepository {
  create(food: any): Promise<any>;
  getById(foodId: string): Promise<any>;
  getByBarcode(barcode: string): Promise<any>;
  search(query: string, limit?: number): Promise<any[]>;
  getRecentlyUsed(userId: string, limit?: number): Promise<any[]>;
  getFavorites(userId: string): Promise<any[]>;
  addToFavorites(userId: string, foodId: string): Promise<void>;
  removeFromFavorites(userId: string, foodId: string): Promise<void>;
}

export interface IDiaryRepository {
  create(entry: any): Promise<any>;
  getById(entryId: string): Promise<any>;
  getByDate(userId: string, date: Date): Promise<any[]>;
  getByDateRange(userId: string, startDate: Date, endDate: Date): Promise<any[]>;
  update(entryId: string, updates: any): Promise<void>;
  delete(entryId: string): Promise<void>;
  getDailySummary(userId: string, date: Date): Promise<any>;
  updateWaterIntake(userId: string, date: Date, waterIntake: number): Promise<void>;
}
