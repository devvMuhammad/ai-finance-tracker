import { Transaction } from '@/types';

/**
 * Interface for transaction categorization strategies
 */
export interface TransactionCategorizer {
  categorize(description: string, amount: number): string;
}

/**
 * Simple pattern matching categorizer that uses regular expressions to categorize transactions
 * This implements a basic categorization algorithm based on common transaction descriptions
 */
export class PatternMatchingCategorizer implements TransactionCategorizer {
  private patterns: Record<string, RegExp[]> = {
    'Income': [/salary/i, /deposit/i, /payroll/i, /direct deposit/i, /payment from/i, /refund/i],
    'Food': [/grocery/i, /restaurant/i, /cafe/i, /coffee/i, /pizz/i, /food/i, /dining/i, /bakery/i],
    'Transportation': [/gas/i, /fuel/i, /uber/i, /lyft/i, /taxi/i, /transit/i, /train/i, /bus/i, /parking/i, /toll/i],
    'Housing': [/rent/i, /mortgage/i, /hoa/i, /repair/i, /maint/i, /home/i, /apartment/i, /lease/i],
    'Utilities': [/electric/i, /water/i, /gas bill/i, /phone/i, /internet/i, /cable/i, /utility/i, /bill/i],
    'Entertainment': [/movie/i, /theater/i, /ticket/i, /concert/i, /netflix/i, /spotify/i, /hulu/i, /disney/i, /subscription/i],
    'Shopping': [/amazon/i, /walmart/i, /target/i, /store/i, /market/i, /shop/i, /buy/i, /purchase/i],
    'Healthcare': [/doctor/i, /hospital/i, /clinic/i, /medical/i, /dental/i, /pharmacy/i, /prescription/i, /health/i],
    'Travel': [/hotel/i, /flight/i, /airline/i, /airbnb/i, /booking/i, /travel/i, /vacation/i],
    'Education': [/tuition/i, /school/i, /university/i, /college/i, /course/i, /class/i, /book/i, /education/i],
    'Investment': [/invest/i, /stock/i, /bond/i, /etf/i, /mutual fund/i, /portfolio/i, /dividend/i],
    'Transfer': [/transfer/i, /move money/i, /zelle/i, /venmo/i, /paypal/i, /cash app/i]
  };

  categorize(description: string, amount: number): string {
    // Check for transfers or deposits as a special case
    if (amount > 0 && !description.toLowerCase().includes('refund')) {
      return 'Income';
    }

    // Check against pattern dictionary
    for (const [category, patterns] of Object.entries(this.patterns)) {
      if (patterns.some(pattern => pattern.test(description))) {
        return category;
      }
    }

    // Default to "Uncategorized" if no pattern matches
    return 'Uncategorized';
  }
}

/**
 * A more sophisticated categorizer that uses transaction history to improve categorization
 * Uses past categorizations of similar transactions to make better predictions
 */
export class LearningCategorizer implements TransactionCategorizer {
  private transactionHistory: Map<string, string> = new Map();
  private fallbackCategorizer: TransactionCategorizer;

  constructor(fallbackCategorizer: TransactionCategorizer) {
    this.fallbackCategorizer = fallbackCategorizer;
  }

  /**
   * Categorize a transaction based on transaction history or fallback to pattern matching
   */
  categorize(description: string, amount: number): string {
    // Normalize the description to increase matching chances
    const normalizedDescription = this.normalizeDescription(description);

    // Check if we have seen a similar transaction before
    for (const [knownDesc, category] of this.transactionHistory.entries()) {
      if (this.isSimilarDescription(normalizedDescription, knownDesc)) {
        return category;
      }
    }

    // If no match found, use the fallback categorizer
    return this.fallbackCategorizer.categorize(description, amount);
  }

  /**
   * Add a transaction to the learning history
   */
  learnFromTransaction(transaction: Transaction): void {
    const normalizedDescription = this.normalizeDescription(transaction.description);
    this.transactionHistory.set(normalizedDescription, transaction.category);
  }

  /**
   * Normalize a description by removing common variable parts like dates, numbers
   */
  private normalizeDescription(description: string): string {
    return description
      .toLowerCase()
      .replace(/\b\d+\b/g, '') // Remove numbers
      .replace(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i, '') // Remove month names
      .replace(/\b\d{1,2}\/\d{1,2}(\/\d{2,4})?\b/g, '') // Remove dates
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  /**
   * Check if two descriptions are similar enough to be considered the same transaction type
   */
  private isSimilarDescription(desc1: string, desc2: string): boolean {
    // Simple string comparison for now
    // Could be enhanced with more sophisticated text similarity algorithms
    return desc1 === desc2 ||
      desc1.includes(desc2) ||
      desc2.includes(desc1);
  }
} 