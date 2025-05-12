import { Goal } from '@/types';

export function getDummyGoals(): Goal[] {
  return [
    {
      id: 'goal-1',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 6500,
      startDate: new Date('2023-01-01'),
      targetDate: new Date('2023-12-31'),
      type: 'saving'
    },
    {
      id: 'goal-2',
      name: 'Vacation to Europe',
      targetAmount: 5000,
      currentAmount: 2200,
      startDate: new Date('2023-02-15'),
      targetDate: new Date('2023-11-30'),
      type: 'saving'
    },
    {
      id: 'goal-3',
      name: 'Pay Off Credit Card',
      targetAmount: 3500,
      currentAmount: 1200,
      startDate: new Date('2023-01-10'),
      targetDate: new Date('2023-10-31'),
      type: 'debt'
    },
    {
      id: 'goal-4',
      name: 'Stock Investment',
      targetAmount: 20000,
      currentAmount: 8000,
      startDate: new Date('2023-03-01'),
      targetDate: new Date('2024-03-01'),
      type: 'investment'
    },
    {
      id: 'goal-5',
      name: 'New Car Down Payment',
      targetAmount: 8000,
      currentAmount: 1500,
      startDate: new Date('2023-04-15'),
      targetDate: new Date('2024-04-15'),
      type: 'saving'
    }
  ];
} 