/**
 * User Store
 * Manages user profile, settings, goals, and measurements
 */

import { create } from 'zustand';
import { User, UserSettings, NutritionGoals, UserMeasurements } from '@/types';
import { userRepository } from '@/data/repositories';

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadUser: (userId: string) => Promise<void>;
  createUser: (user: User) => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  updateGoals: (goals: Partial<NutritionGoals>) => Promise<void>;
  updateMeasurements: (measurements: Partial<UserMeasurements>) => Promise<void>;
  updatePremiumStatus: (isPremium: boolean, expiresAt: Date | null) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  isLoading: false,
  error: null,

  loadUser: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userRepository.getById(userId);
      set({ currentUser: user, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load user',
        isLoading: false,
      });
    }
  },

  createUser: async (user: User) => {
    set({ isLoading: true, error: null });
    try {
      await userRepository.create(user);
      set({ currentUser: user, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create user',
        isLoading: false,
      });
    }
  },

  updateSettings: async (settings: Partial<UserSettings>) => {
    const { currentUser } = get();
    if (!currentUser) return;

    set({ isLoading: true, error: null });
    try {
      await userRepository.updateSettings(currentUser.id, settings);
      set({
        currentUser: {
          ...currentUser,
          settings: { ...currentUser.settings, ...settings },
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update settings',
        isLoading: false,
      });
    }
  },

  updateGoals: async (goals: Partial<NutritionGoals>) => {
    const { currentUser } = get();
    if (!currentUser) return;

    set({ isLoading: true, error: null });
    try {
      await userRepository.updateGoals(currentUser.id, goals);
      set({
        currentUser: {
          ...currentUser,
          goals: { ...currentUser.goals, ...goals },
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update goals',
        isLoading: false,
      });
    }
  },

  updateMeasurements: async (measurements: Partial<UserMeasurements>) => {
    const { currentUser } = get();
    if (!currentUser) return;

    set({ isLoading: true, error: null });
    try {
      await userRepository.updateMeasurements(currentUser.id, measurements);
      set({
        currentUser: {
          ...currentUser,
          measurements: { ...currentUser.measurements, ...measurements },
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update measurements',
        isLoading: false,
      });
    }
  },

  updatePremiumStatus: async (isPremium: boolean, expiresAt: Date | null) => {
    const { currentUser } = get();
    if (!currentUser) return;

    set({ isLoading: true, error: null });
    try {
      await userRepository.updatePremiumStatus(currentUser.id, isPremium, expiresAt);
      set({
        currentUser: {
          ...currentUser,
          isPremium,
          premiumExpiresAt: expiresAt,
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update premium status',
        isLoading: false,
      });
    }
  },

  logout: () => {
    set({ currentUser: null, error: null });
  },
}));
