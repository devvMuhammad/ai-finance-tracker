import { Account } from '@/types';

export function getDummyAccounts(): Account[] {
  return [
    {
      id: 'account-1',
      name: 'Main Checking',
      type: 'checking',
      balance: 5430.82,
      currency: 'USD',
    },
    {
      id: 'account-2',
      name: 'Savings',
      type: 'savings',
      balance: 12750.50,
      currency: 'USD',
    },
    {
      id: 'account-3',
      name: 'Investment Portfolio',
      type: 'investment',
      balance: 31080.75,
      currency: 'USD',
    },
    {
      id: 'account-4',
      name: 'Credit Card',
      type: 'credit',
      balance: -2430.15,
      currency: 'USD',
    }
  ];
} 