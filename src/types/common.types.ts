/**
 * Common Type Definitions
 */

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasMore: boolean;
}

export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface ModalState {
  isVisible: boolean;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
  code?: string;
}

export type SortOrder = 'asc' | 'desc';

export interface SelectOption {
  label: string;
  value: string | number;
  icon?: string;
  disabled?: boolean;
}

export interface KeyValuePair<T = any> {
  key: string;
  value: T;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface ImageSource {
  uri: string;
  width?: number;
  height?: number;
}

export interface FileUpload {
  uri: string;
  name: string;
  type: string;
  size?: number;
}
