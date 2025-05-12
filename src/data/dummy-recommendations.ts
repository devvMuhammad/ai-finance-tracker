import { Recommendation } from '@/types';

export function getDummyRecommendations(): Recommendation[] {
  return [
    {
      id: 'rec-1',
      type: 'spending',
      title: 'Reduce Dining Out Expenses',
      description: 'You spent 15% more on dining out this month compared to your average. Consider cooking at home more frequently to save approximately $120 per month.',
      potentialImpact: 120,
      difficulty: 'medium'
    },
    {
      id: 'rec-2',
      type: 'saving',
      title: 'Increase Emergency Fund Contributions',
      description: 'Based on your current income, we recommend increasing your emergency fund contributions by $100 per month to reach your goal by the target date.',
      potentialImpact: 100,
      difficulty: 'easy'
    },
    {
      id: 'rec-3',
      type: 'investment',
      title: 'Diversify Investment Portfolio',
      description: 'Your current portfolio is heavily weighted in technology stocks. Consider adding index funds to diversify and reduce risk.',
      potentialImpact: 250,
      difficulty: 'medium'
    },
    {
      id: 'rec-4',
      type: 'spending',
      title: 'Review Subscription Services',
      description: 'You are currently spending $65 monthly on subscription services. Consider reviewing and cancelling unused subscriptions.',
      potentialImpact: 65,
      difficulty: 'easy'
    },
    {
      id: 'rec-5',
      type: 'saving',
      title: 'Set Up Automatic Transfers to Savings',
      description: 'To reach your vacation goal on time, set up an automatic transfer of $200 per month to your savings account.',
      potentialImpact: 200,
      difficulty: 'easy'
    },
    {
      id: 'rec-6',
      type: 'investment',
      title: 'Consider Tax-Advantaged Accounts',
      description: 'Based on your income and investment goals, you may benefit from maximizing contributions to a tax-advantaged retirement account.',
      potentialImpact: 500,
      difficulty: 'hard'
    },
    {
      id: 'rec-7',
      type: 'spending',
      title: 'Negotiate Lower Bills',
      description: 'Your utility bills appear higher than average. Consider negotiating with providers or exploring alternatives to save up to $50 monthly.',
      potentialImpact: 50,
      difficulty: 'medium'
    }
  ];
} 