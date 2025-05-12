import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency values for display
 */
export function formatCurrency(amount: number, currency: string = 'USD', options?: Intl.NumberFormatOptions): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(amount);
}

/**
 * Format dates for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Calculate percentage change between two values
 */
export function calculatePercentChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue === 0 ? 0 : 100;

  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

/**
 * Generate a random ID for new entities
 */
export function generateId(prefix: string = ''): string {
  return `${prefix}${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Group an array of objects by a specified key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Calculate sum of numeric values in an array
 */
export function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

/**
 * Sort an array of objects by a specified key
 */
export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  const sortedArray = [...array].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA < valueB) return direction === 'asc' ? -1 : 1;
    if (valueA > valueB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sortedArray;
}
