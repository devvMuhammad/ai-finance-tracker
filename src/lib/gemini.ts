import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface TransactionData {
  amount: number;
  category: string;
  date: Date;
}

export interface GoalData {
  name: string;
  targetAmount: number;
  currentAmount: number;
  type: string;
}

export interface FinancialData {
  transactions: TransactionData[];
  goals: GoalData[];
  monthlyIncome?: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'investment' | 'saving' | 'spending';
  difficulty: 'easy' | 'medium' | 'hard';
  potentialImpact: number;
}

export async function generateFinancialRecommendations(data: FinancialData): Promise<Recommendation[]> {
  const prompt = `As a financial advisor, analyze the following financial data and provide specific, actionable recommendations:

Transaction Data:
${data.transactions.map(t => `- ${t.category}: $${t.amount} (${t.date.toLocaleDateString()})`).join('\n')}

Financial Goals:
${data.goals.map(g => `- ${g.name}: $${g.currentAmount}/$${g.targetAmount} (${g.type})`).join('\n')}
${data.monthlyIncome ? `\nMonthly Income: $${data.monthlyIncome}` : ''}

Please provide 3-5 specific recommendations focusing on:
1. Spending optimization (identify areas to reduce spending)
2. Investment suggestions (based on goals and risk profile)
3. Savings strategies (to reach financial goals faster)

Return the response as a valid JSON array of recommendations. Each recommendation should have this exact format:
[
  {
    "title": "Clear action item",
    "description": "Detailed explanation",
    "type": "spending|saving|investment",
    "difficulty": "easy|medium|hard",
    "potentialImpact": number
  }
]

Important: Return ONLY the JSON array, no other text or formatting.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try to parse the entire response as a JSON array first
    try {
      const recommendations = JSON.parse(text);
      if (Array.isArray(recommendations)) {
        return recommendations.map((rec: Omit<Recommendation, 'id'>, index: number) => ({
          ...rec,
          id: `rec-${index + 1}`,
        }));
      }
    } catch (e) {
      // If that fails, try to extract JSON array from the response
      const arrayMatch = text.match(/\[([\s\S]*)\]/);
      if (!arrayMatch) {
        throw new Error('No valid JSON array found in response');
      }
      const recommendations = JSON.parse(arrayMatch[0]);
      if (!Array.isArray(recommendations)) {
        throw new Error('Response is not an array of recommendations');
      }
      return recommendations.map((rec: Omit<Recommendation, 'id'>, index: number) => ({
        ...rec,
        id: `rec-${index + 1}`,
      }));
    }

    throw new Error('Failed to parse recommendations from response');
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}
