import { Goal } from '@/modules/goals/goal';
import { GoalTracker } from '@/modules/goals/goal-tracker';

// Create a singleton instance of GoalTracker
export class GoalService {
  private static instance: GoalService;
  private goalTracker: GoalTracker;

  private constructor() {
    this.goalTracker = new GoalTracker();
    this.initializeDummyData();
  }

  public static getInstance(): GoalService {
    if (!GoalService.instance) {
      GoalService.instance = new GoalService();
    }
    return GoalService.instance;
  }

  private initializeDummyData() {
    const dummyGoals = [
      new Goal({
        id: '1',
        name: 'Emergency Fund',
        targetAmount: 10000,
        currentAmount: 5000,
        startDate: new Date(2024, 0, 1),
        targetDate: new Date(2024, 11, 31),
        type: 'saving',
      }),
      new Goal({
        id: '2',
        name: 'New Car',
        targetAmount: 25000,
        currentAmount: 8000,
        startDate: new Date(2024, 0, 1),
        targetDate: new Date(2025, 11, 31),
        type: 'saving',
      }),
      new Goal({
        id: '3',
        name: 'Investment Portfolio',
        targetAmount: 50000,
        currentAmount: 15000,
        startDate: new Date(2024, 0, 1),
        targetDate: new Date(2026, 11, 31),
        type: 'investment',
      }),
    ];

    dummyGoals.forEach(goal => this.goalTracker.addGoal(goal));
  }

  public getGoals(): Goal[] {
    return this.goalTracker.getGoals();
  }

  public addGoal(goalData: Omit<Goal, 'id' | 'currentAmount'>): Goal {
    const newGoal = new Goal({
      ...goalData,
      id: Math.random().toString(36).substr(2, 9),
      currentAmount: 0,
    });
    this.goalTracker.addGoal(newGoal);
    return newGoal;
  }

  public updateGoalProgress(goalId: string, amount: number): void {
    this.goalTracker.updateGoalProgress(goalId, amount);
  }

  public getGoalsByType(type: 'saving' | 'debt' | 'investment'): Goal[] {
    return this.goalTracker.getGoalsByType(type);
  }

  public getGoalsOnTrack(): Goal[] {
    return this.goalTracker.getGoalsOnTrack();
  }

  public getGoalsBehindSchedule(): Goal[] {
    return this.goalTracker.getGoalsBehindSchedule();
  }
}

// Export a function to get dummy goals for backward compatibility
export function getDummyGoals(): Goal[] {
  return GoalService.getInstance().getGoals();
} 