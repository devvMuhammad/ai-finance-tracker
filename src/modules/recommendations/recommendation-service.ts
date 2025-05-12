import { generateFinancialRecommendations, Recommendation } from "@/lib/gemini";
import { Goal } from "@/modules/goals/goal";
import { Transaction } from "@/types";

export class RecommendationService {
  private static instance: RecommendationService;
  private cachedRecommendations: Recommendation[] = [];
  private lastUpdateTime: number = 0;
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  private constructor() {}

  public static getInstance(): RecommendationService {
    if (!RecommendationService.instance) {
      RecommendationService.instance = new RecommendationService();
    }
    return RecommendationService.instance;
  }

  public async getRecommendations(data: {
    transactions: Transaction[];
    goals: Goal[];
    monthlyIncome?: number;
  }): Promise<Recommendation[]> {
    // Check if cache is still valid
    if (
      this.cachedRecommendations.length > 0 &&
      Date.now() - this.lastUpdateTime < this.CACHE_DURATION
    ) {
      return this.cachedRecommendations;
    }

    try {
      // Generate new recommendations
      const recommendations = await generateFinancialRecommendations({
        transactions: data.transactions.map(t => ({
          amount: t.amount,
          category: t.category,
          date: t.date,
        })),
        goals: data.goals.map(g => ({
          name: g.name,
          targetAmount: g.targetAmount,
          currentAmount: g.currentAmount,
          type: g.type,
        })),
        monthlyIncome: data.monthlyIncome,
      });

      // Update cache
      this.cachedRecommendations = recommendations;
      this.lastUpdateTime = Date.now();

      return recommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      
      // Return cached recommendations if available, otherwise return empty array
      return this.cachedRecommendations.length > 0 
        ? this.cachedRecommendations 
        : this.getFallbackRecommendations();
    }
  }

  private getFallbackRecommendations(): Recommendation[] {
    return [
      {
        id: 'fallback-1',
        title: 'Review Monthly Expenses',
        description: 'Analyze your monthly spending patterns to identify areas where you can cut back. Focus on non-essential expenses like entertainment and dining out.',
        type: 'spending',
        difficulty: 'easy',
        potentialImpact: 200,
      },
      {
        id: 'fallback-2',
        title: 'Start Emergency Fund',
        description: 'Build an emergency fund that covers 3-6 months of expenses. Start with small, regular contributions to build this safety net.',
        type: 'saving',
        difficulty: 'medium',
        potentialImpact: 5000,
      },
      {
        id: 'fallback-3',
        title: 'Diversify Investments',
        description: 'Consider diversifying your investment portfolio across different asset classes to minimize risk while maximizing potential returns.',
        type: 'investment',
        difficulty: 'hard',
        potentialImpact: 1000,
      },
    ];
  }
} 