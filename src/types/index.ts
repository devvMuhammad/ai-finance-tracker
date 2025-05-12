export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  subcategory?: string;
  account: string;
  tags?: string[];
};

export type Account = {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'credit';
  balance: number;
  currency: string;
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: Date;
  targetDate: Date;
  type: 'saving' | 'debt' | 'investment';
};

export type Recommendation = {
  id: string;
  type: 'spending' | 'saving' | 'investment';
  title: string;
  description: string;
  potentialImpact: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type BudgetPlan = {
  id: string;
  name: string;
  totalIncome: number;
  allocations: Record<string, number | { amount: number; percentage: number }>;
};

export type RiskProfile = {
  id: string;
  userId: string;
  riskTolerance: 'low' | 'medium' | 'high';
  investmentHorizon: number; // in years
  financialGoals: string[];
}; 