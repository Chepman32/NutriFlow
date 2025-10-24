/**
 * UI Store
 * Manages UI state like modals, toasts, loading states
 */

import { create } from 'zustand';
import { ToastMessage } from '@/types';

interface UIState {
  isLoading: boolean;
  loadingMessage: string;
  toasts: ToastMessage[];
  activeModal: string | null;
  modalData: any;

  // Actions
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  hideToast: (id: string) => void;
  showModal: (modalId: string, data?: any) => void;
  hideModal: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isLoading: false,
  loadingMessage: '',
  toasts: [],
  activeModal: null,
  modalData: null,

  showLoading: (message = 'Loading...') => {
    set({ isLoading: true, loadingMessage: message });
  },

  hideLoading: () => {
    set({ isLoading: false, loadingMessage: '' });
  },

  showToast: (message: string, type = 'info' as const) => {
    const toast: ToastMessage = {
      id: `toast_${Date.now()}`,
      message,
      type,
      duration: 3000,
    };

    set(state => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-hide after duration
    setTimeout(() => {
      get().hideToast(toast.id);
    }, toast.duration);
  },

  hideToast: (id: string) => {
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    }));
  },

  showModal: (modalId: string, data?: any) => {
    set({ activeModal: modalId, modalData: data });
  },

  hideModal: () => {
    set({ activeModal: null, modalData: null });
  },
}));
