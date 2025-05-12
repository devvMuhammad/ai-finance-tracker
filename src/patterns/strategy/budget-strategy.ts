import { BudgetPlan } from '@/types';

/**
 * Strategy interface for different budgeting approaches
 */
export interface BudgetStrategy {
  calculateBudget(income: number, expenses: Record<string, number>): BudgetPlan;
}

/**
 * Zero-based budgeting strategy
 * Every dollar of income is assigned to a specific expense category or savings
 */
export class ZeroBasedBudgeting implements BudgetStrategy {
  calculateBudget(income: number, expenses: Record<string, number>): BudgetPlan {
    // Sum all expenses
    const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0);

    // Calculate remaining amount for savings/unallocated
    const remaining = income - totalExpenses;

    // Create allocations based on existing expenses
    const allocations: Record<string, number> = { ...expenses };

    // Add savings/unallocated category with remaining amount
    if (remaining > 0) {
      allocations['Savings'] = remaining;
    } else if (remaining < 0) {
      // Handle deficit scenario
      allocations['Deficit'] = remaining;
    }

    return {
      id: `budget-${Date.now()}`,
      name: 'Zero-Based Budget',
      totalIncome: income,
      allocations
    };
  }
}

/**
 * 50/30/20 rule budgeting strategy
 * 50% of income goes to needs, 30% to wants, 20% to savings
 */
export class FiftyThirtyTwentyRule implements BudgetStrategy {
  calculateBudget(income: number, expenses: Record<string, number>): BudgetPlan {
    // Categorize expenses into needs, wants, and savings
    const needsCategories = ['Housing', 'Utilities', 'Groceries', 'Transportation', 'Insurance', 'Healthcare'];
    const wantsCategories = ['Entertainment', 'Dining Out', 'Shopping', 'Subscriptions', 'Travel', 'Hobbies'];
    const savingsCategories = ['Savings', 'Investments', 'Debt Repayment', 'Emergency Fund'];

    // Group current expenses by category
    const currentNeeds = this.sumCategorizedExpenses(expenses, needsCategories);
    const currentWants = this.sumCategorizedExpenses(expenses, wantsCategories);
    const currentSavings = this.sumCategorizedExpenses(expenses, savingsCategories);

    // Create allocations with recommended adjustments
    const allocations: Record<string, { amount: number; percentage: number }> = {
      'Needs': {
        amount: currentNeeds,
        percentage: 50
      },
      'Wants': {
        amount: currentWants,
        percentage: 30
      },
      'Savings': {
        amount: currentSavings,
        percentage: 20
      }
    };

    return {
      id: `budget-${Date.now()}`,
      name: '50/30/20 Budget',
      totalIncome: income,
      allocations
    };
  }

  private sumCategorizedExpenses(expenses: Record<string, number>, categories: string[]): number {
    return Object.entries(expenses)
      .filter(([category]) => categories.includes(category))
      .reduce((sum, [, amount]) => sum + amount, 0);
  }
}

/**
 * Envelope budgeting strategy
 * Allocate income into different "envelopes" or categories with specific limits
 */
export class EnvelopeBudgeting implements BudgetStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculateBudget(income: number, _: Record<string, number>): BudgetPlan {
    // Define envelope categories and their percentage allocations
    const envelopes: Record<string, number> = {
      'Housing': 0.30,
      'Food': 0.15,
      'Transportation': 0.10,
      'Utilities': 0.10,
      'Entertainment': 0.05,
      'Clothing': 0.05,
      'Healthcare': 0.05,
      'Savings': 0.10,
      'Miscellaneous': 0.10
    };

    // Calculate envelope allocations based on income
    const allocations: Record<string, number> = {};
    for (const [category, percentage] of Object.entries(envelopes)) {
      allocations[category] = income * percentage;
    }

    return {
      id: `budget-${Date.now()}`,
      name: 'Envelope Budget',
      totalIncome: income,
      allocations
    };
  }
}

/**
 * Budget context that uses the strategy pattern
 */
export class BudgetContext {
  private strategy: BudgetStrategy;

  constructor(strategy: BudgetStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: BudgetStrategy): void {
    this.strategy = strategy;
  }

  createBudgetPlan(income: number, expenses: Record<string, number>): BudgetPlan {
    return this.strategy.calculateBudget(income, expenses);
  }
} 