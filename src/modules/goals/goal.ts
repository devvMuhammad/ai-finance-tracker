import { Goal as GoalType } from '@/types';

/**
 * Concrete implementation of a financial goal
 */
export class Goal implements GoalType {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: Date;
  targetDate: Date;
  type: 'saving' | 'debt' | 'investment';

  constructor(params: {
    id: string,
    name: string,
    targetAmount: number,
    currentAmount?: number,
    startDate?: Date,
    targetDate: Date,
    type: 'saving' | 'debt' | 'investment'
  }) {
    this.id = params.id;
    this.name = params.name;
    this.targetAmount = params.targetAmount;
    this.currentAmount = params.currentAmount || 0;
    this.startDate = params.startDate || new Date();
    this.targetDate = params.targetDate;
    this.type = params.type;
  }

  /**
   * Calculate the progress as a percentage
   */
  getProgress(): number {
    return Math.min(100, (this.currentAmount / this.targetAmount) * 100);
  }

  /**
   * Calculate the remaining amount needed to reach the goal
   */
  getRemainingAmount(): number {
    return Math.max(0, this.targetAmount - this.currentAmount);
  }

  /**
   * Determine if the goal is on track to be completed by the target date
   */
  isOnTrack(): boolean {
    // Calculate the elapsed time as a fraction of the total time
    const totalDays = this.getDaysBetween(this.startDate, this.targetDate);
    const elapsedDays = this.getDaysBetween(this.startDate, new Date());
    const timeElapsedFraction = elapsedDays / totalDays;

    // Calculate the current progress as a fraction
    const progressFraction = this.currentAmount / this.targetAmount;

    // The goal is on track if the progress fraction is greater than or equal to the time elapsed fraction
    return progressFraction >= timeElapsedFraction;
  }

  /**
   * Calculate the monthly contribution needed to reach the goal by the target date
   */
  getRequiredMonthlyContribution(): number {
    const remainingAmount = this.getRemainingAmount();
    const monthsRemaining = this.getMonthsRemaining();

    if (monthsRemaining <= 0) {
      return remainingAmount; // Goal is due or overdue, so return remaining amount
    }

    return remainingAmount / monthsRemaining;
  }

  /**
   * Add an amount to the current progress
   */
  addContribution(amount: number): void {
    this.currentAmount += amount;

    // Make sure we don't exceed the target amount
    if (this.currentAmount > this.targetAmount) {
      this.currentAmount = this.targetAmount;
    }
  }

  /**
   * Calculate months remaining until the target date
   */
  getMonthsRemaining(): number {
    const now = new Date();
    const targetYear = this.targetDate.getFullYear();
    const targetMonth = this.targetDate.getMonth();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
  }

  /**
   * Calculate days between two dates
   */
  private getDaysBetween(start: Date, end: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    return Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
  }
} 