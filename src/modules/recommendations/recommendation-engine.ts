import { Transaction, Goal, Recommendation, RiskProfile } from '@/types';

/**
 * Interface for recommendation engines
 */
export interface RecommendationEngine {
  generateSpendingRecommendations(transactions: Transaction[]): Recommendation[];
  generateSavingsRecommendations(goals: Goal[], transactions: Transaction[]): Recommendation[];
  generateInvestmentRecommendations(profile: RiskProfile): Recommendation[];
}

/**
 * Basic implementation of the recommendation engine
 */
export class BasicRecommendationEngine implements RecommendationEngine {

  /**
   * Generate spending recommendations by analyzing transaction patterns
   */
  generateSpendingRecommendations(transactions: Transaction[]): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Group transactions by category
    const categorizedTransactions = this.groupTransactionsByCategory(transactions);

    // Check for high spending categories
    const highSpendingCategories = this.identifyHighSpendingCategories(categorizedTransactions);
    for (const [category, amount] of highSpendingCategories) {
      // Calculate potential savings (10% of the high spending)
      const potentialSavings = Math.abs(amount) * 0.1;

      recommendations.push({
        id: `rec-sp-${Date.now()}-${category}`,
        type: 'spending',
        title: `Reduce ${category} Expenses`,
        description: `You spent ${this.formatCurrency(Math.abs(amount))} on ${category} recently. Consider reducing this by 10% to save approximately ${this.formatCurrency(potentialSavings)} per month.`,
        potentialImpact: potentialSavings,
        difficulty: 'medium'
      });
    }

    // Check for subscription services
    const subscriptionServices = this.identifySubscriptionServices(transactions);
    if (subscriptionServices.length > 0) {
      const totalSubscriptionCost = subscriptionServices.reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

      recommendations.push({
        id: `rec-sp-${Date.now()}-subs`,
        type: 'spending',
        title: 'Review Subscription Services',
        description: `You're spending approximately ${this.formatCurrency(totalSubscriptionCost)} monthly on subscription services. Consider reviewing and canceling unused subscriptions.`,
        potentialImpact: totalSubscriptionCost * 0.3, // Assume 30% could be cut
        difficulty: 'easy'
      });
    }

    return recommendations;
  }

  /**
   * Generate savings recommendations based on goals and transactions
   */
  generateSavingsRecommendations(goals: Goal[], transactions: Transaction[]): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Calculate monthly income
    const monthlyIncome = this.calculateMonthlyIncome(transactions);

    // Check for emergency fund
    const hasEmergencyFund = goals.some(goal =>
      goal.name.toLowerCase().includes('emergency') &&
      (goal.currentAmount / goal.targetAmount) >= 0.5
    );

    if (!hasEmergencyFund) {
      const recommendedEmergencyAmount = monthlyIncome * 3; // 3 months of expenses

      recommendations.push({
        id: `rec-sav-${Date.now()}-emergency`,
        type: 'saving',
        title: 'Start an Emergency Fund',
        description: `It's recommended to have at least 3-6 months of expenses saved for emergencies. Consider starting an emergency fund with a target of ${this.formatCurrency(recommendedEmergencyAmount)}.`,
        potentialImpact: recommendedEmergencyAmount * 0.1, // Value of having 10% of the emergency fund
        difficulty: 'medium'
      });
    }

    // Check for goals behind schedule
    const behindScheduleGoals = goals.filter(goal =>
      !this.isGoalOnTrack(goal) &&
      goal.currentAmount < goal.targetAmount
    );

    for (const goal of behindScheduleGoals) {
      const monthlyContributionNeeded = this.calculateRequiredMonthlyContribution(goal);

      recommendations.push({
        id: `rec-sav-${Date.now()}-${goal.id}`,
        type: 'saving',
        title: `Increase Contributions to ${goal.name}`,
        description: `Your ${goal.name} goal is behind schedule. Consider increasing your monthly contribution to ${this.formatCurrency(monthlyContributionNeeded)} to reach your goal by the target date.`,
        potentialImpact: monthlyContributionNeeded * 0.2, // Benefit of getting back on track
        difficulty: 'medium'
      });
    }

    // Recommend automatic transfers to savings
    if (goals.some(goal => goal.type === 'saving' && goal.currentAmount < goal.targetAmount)) {
      recommendations.push({
        id: `rec-sav-${Date.now()}-auto`,
        type: 'saving',
        title: 'Set Up Automatic Transfers to Savings',
        description: `Setting up automatic transfers to your savings account can help you reach your goals faster. Consider transferring 10-20% of your income automatically after each paycheck.`,
        potentialImpact: monthlyIncome * 0.15 * 0.5, // Assuming 15% transfer with 50% effectiveness
        difficulty: 'easy'
      });
    }

    return recommendations;
  }

  /**
   * Generate investment recommendations based on risk profile
   */
  generateInvestmentRecommendations(profile: RiskProfile): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Recommend tax-advantaged accounts
    recommendations.push({
      id: `rec-inv-${Date.now()}-tax`,
      type: 'investment',
      title: 'Maximize Tax-Advantaged Accounts',
      description: `Consider maximizing contributions to tax-advantaged retirement accounts like 401(k) or IRA before investing in taxable accounts.`,
      potentialImpact: 1000, // Rough estimate of tax savings
      difficulty: 'medium'
    });

    // Portfolio diversification recommendations based on risk profile
    switch (profile.riskTolerance) {
      case 'low':
        recommendations.push({
          id: `rec-inv-${Date.now()}-low`,
          type: 'investment',
          title: 'Conservative Investment Allocation',
          description: `Based on your low risk tolerance, consider a portfolio with 60-70% bonds, 20-30% large-cap stocks, and 5-10% international stocks.`,
          potentialImpact: 500, // Conservative estimate of potential returns
          difficulty: 'medium'
        });
        break;

      case 'medium':
        recommendations.push({
          id: `rec-inv-${Date.now()}-med`,
          type: 'investment',
          title: 'Balanced Investment Allocation',
          description: `Based on your medium risk tolerance, consider a portfolio with 40-50% bonds, 30-40% large-cap stocks, 10-15% small/mid-cap stocks, and 10-15% international stocks.`,
          potentialImpact: 800, // Moderate estimate of potential returns
          difficulty: 'medium'
        });
        break;

      case 'high':
        recommendations.push({
          id: `rec-inv-${Date.now()}-high`,
          type: 'investment',
          title: 'Growth-Oriented Investment Allocation',
          description: `Based on your high risk tolerance, consider a portfolio with 20-30% bonds, 30-40% large-cap stocks, 15-25% small/mid-cap stocks, and 15-25% international stocks.`,
          potentialImpact: 1200, // Higher estimate of potential returns
          difficulty: 'hard'
        });
        break;
    }

    // For longer investment horizons, recommend more equity exposure
    if (profile.investmentHorizon > 10) {
      recommendations.push({
        id: `rec-inv-${Date.now()}-long`,
        type: 'investment',
        title: 'Increase Equity Exposure for Long-Term Goals',
        description: `With your long investment horizon of ${profile.investmentHorizon} years, you may benefit from higher equity allocation in your portfolio.`,
        potentialImpact: 1500, // Potential for higher long-term returns
        difficulty: 'medium'
      });
    }

    return recommendations;
  }

  // Helper methods

  /**
   * Group transactions by category and sum amounts
   */
  private groupTransactionsByCategory(transactions: Transaction[]): Map<string, number> {
    const categoryMap = new Map<string, number>();

    transactions.forEach(transaction => {
      const category = transaction.category;
      const currentAmount = categoryMap.get(category) || 0;
      categoryMap.set(category, currentAmount + transaction.amount);
    });

    return categoryMap;
  }

  /**
   * Identify categories with higher than average spending
   */
  private identifyHighSpendingCategories(categorizedTransactions: Map<string, number>): [string, number][] {
    const expenseCategories: [string, number][] = [];

    // Extract only expense categories (negative amounts)
    for (const [category, amount] of categorizedTransactions.entries()) {
      if (amount < 0 && category !== 'Transfer') {
        expenseCategories.push([category, amount]);
      }
    }

    // Sort by amount (ascending, so most negative first)
    expenseCategories.sort((a, b) => a[1] - b[1]);

    // Take the top 3 expense categories
    return expenseCategories.slice(0, 3);
  }

  /**
   * Identify subscription services from transactions
   */
  private identifySubscriptionServices(transactions: Transaction[]): Transaction[] {
    // Keywords commonly associated with subscription services
    const subscriptionKeywords = [
      'netflix', 'spotify', 'hulu', 'disney', 'amazon prime',
      'subscription', 'monthly', 'membership', 'recurring'
    ];

    // Find transactions that match subscription patterns
    return transactions.filter(transaction => {
      const description = transaction.description.toLowerCase();
      const isSubscription = subscriptionKeywords.some(keyword => description.includes(keyword));
      return isSubscription && transaction.amount < 0;
    });
  }

  /**
   * Calculate approximate monthly income from transaction history
   */
  private calculateMonthlyIncome(transactions: Transaction[]): number {
    // Find income transactions
    const incomeTransactions = transactions.filter(t =>
      t.amount > 0 && t.category === 'Income'
    );

    if (incomeTransactions.length === 0) {
      return 3000; // Default value if no income transactions found
    }

    // Sum income
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

    // Estimate monthly income (assuming transactions cover a month)
    return totalIncome;
  }

  /**
   * Check if a goal is on track
   */
  private isGoalOnTrack(goal: Goal): boolean {
    const now = new Date();
    const startTime = goal.startDate.getTime();
    const endTime = goal.targetDate.getTime();
    const currentTime = now.getTime();

    // Calculate elapsed percentage of time
    const totalDuration = endTime - startTime;
    const elapsedDuration = currentTime - startTime;
    const elapsedPercentage = elapsedDuration / totalDuration;

    // Calculate progress percentage
    const progressPercentage = goal.currentAmount / goal.targetAmount;

    // Goal is on track if progress percentage >= elapsed percentage
    return progressPercentage >= elapsedPercentage;
  }

  /**
   * Calculate required monthly contribution for a goal
   */
  private calculateRequiredMonthlyContribution(goal: Goal): number {
    const remaining = goal.targetAmount - goal.currentAmount;

    // Calculate months between now and target date
    const now = new Date();
    const monthsRemaining = (
      (goal.targetDate.getFullYear() - now.getFullYear()) * 12 +
      (goal.targetDate.getMonth() - now.getMonth())
    );

    if (monthsRemaining <= 0) {
      return remaining; // Goal is past due, so full amount is required
    }

    return remaining / monthsRemaining;
  }

  /**
   * Format currency for display
   */
  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
} 