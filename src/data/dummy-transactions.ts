import { Transaction } from '@/types';

export function getDummyTransactions(): Transaction[] {
  return [
    {
      id: 'trans-1',
      description: 'Grocery Store',
      amount: -120.50,
      date: new Date('2023-05-15'),
      category: 'Food',
      account: 'account-1',
      tags: ['groceries', 'essentials']
    },
    {
      id: 'trans-2',
      description: 'Salary Deposit',
      amount: 3500.00,
      date: new Date('2023-05-01'),
      category: 'Income',
      account: 'account-1',
      tags: ['salary', 'work']
    },
    {
      id: 'trans-3',
      description: 'Electric Bill',
      amount: -95.40,
      date: new Date('2023-05-10'),
      category: 'Utilities',
      account: 'account-1',
      tags: ['bills', 'home']
    },
    {
      id: 'trans-4',
      description: 'Restaurant Dinner',
      amount: -87.25,
      date: new Date('2023-05-18'),
      category: 'Food',
      subcategory: 'Dining Out',
      account: 'account-4',
      tags: ['restaurant', 'leisure']
    },
    {
      id: 'trans-5',
      description: 'Gas Station',
      amount: -45.80,
      date: new Date('2023-05-12'),
      category: 'Transportation',
      account: 'account-4',
      tags: ['car', 'fuel']
    },
    {
      id: 'trans-6',
      description: 'Internet Subscription',
      amount: -79.99,
      date: new Date('2023-05-05'),
      category: 'Utilities',
      account: 'account-1',
      tags: ['bills', 'subscription']
    },
    {
      id: 'trans-7',
      description: 'Gym Membership',
      amount: -50.00,
      date: new Date('2023-05-02'),
      category: 'Health & Fitness',
      account: 'account-1',
      tags: ['health', 'subscription']
    },
    {
      id: 'trans-8',
      description: 'Investment Deposit',
      amount: -500.00,
      date: new Date('2023-05-15'),
      category: 'Investment',
      account: 'account-1',
      tags: ['investment', 'savings']
    },
    {
      id: 'trans-9',
      description: 'Investment Return',
      amount: 125.30,
      date: new Date('2023-05-28'),
      category: 'Income',
      subcategory: 'Investment',
      account: 'account-3',
      tags: ['investment', 'returns']
    },
    {
      id: 'trans-10',
      description: 'Savings Transfer',
      amount: -200.00,
      date: new Date('2023-05-31'),
      category: 'Transfer',
      account: 'account-1',
      tags: ['savings', 'transfer']
    },
    {
      id: 'trans-11',
      description: 'Savings Deposit',
      amount: 200.00,
      date: new Date('2023-05-31'),
      category: 'Transfer',
      account: 'account-2',
      tags: ['savings', 'transfer']
    },
    {
      id: 'trans-12',
      description: 'Online Shopping',
      amount: -65.99,
      date: new Date('2023-05-22'),
      category: 'Shopping',
      account: 'account-4',
      tags: ['online', 'non-essential']
    },
    {
      id: 'trans-13',
      description: 'Mobile Phone Bill',
      amount: -85.00,
      date: new Date('2023-05-08'),
      category: 'Utilities',
      subcategory: 'Phone',
      account: 'account-1',
      tags: ['bills', 'phone']
    },
    {
      id: 'trans-14',
      description: 'Movie Tickets',
      amount: -32.50,
      date: new Date('2023-05-20'),
      category: 'Entertainment',
      account: 'account-1',
      tags: ['movies', 'leisure']
    },
    {
      id: 'trans-15',
      description: 'Dentist Appointment',
      amount: -150.00,
      date: new Date('2023-05-24'),
      category: 'Healthcare',
      account: 'account-1',
      tags: ['health', 'medical']
    }
  ];
} 