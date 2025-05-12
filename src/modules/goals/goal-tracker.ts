import { Goal } from './goal';

/**
 * GoalTracker class for managing and tracking financial goals
 */
export class GoalTracker {
  private goals: Goal[] = [];

  /**
   * Add a new goal to the tracker
   */
  addGoal(goal: Goal): void {
    this.goals.push(goal);
  }

  /**
   * Remove a goal from the tracker by ID
   */
  removeGoal(goalId: string): void {
    const index = this.goals.findIndex(goal => goal.id === goalId);
    if (index !== -1) {
      this.goals.splice(index, 1);
    }
  }

  /**
   * Get all goals
   */
  getGoals(): Goal[] {
    return [...this.goals];
  }

  /**
   * Get a goal by ID
   */
  getGoalById(goalId: string): Goal | undefined {
    return this.goals.find(goal => goal.id === goalId);
  }

  /**
   * Get goals by type (saving, debt, investment)
   */
  getGoalsByType(type: 'saving' | 'debt' | 'investment'): Goal[] {
    return this.goals.filter(goal => goal.type === type);
  }

  /**
   * Update progress for a specific goal
   */
  updateGoalProgress(goalId: string, amount: number): void {
    const goal = this.getGoalById(goalId);
    if (goal) {
      goal.addContribution(amount);
    }
  }

  /**
   * Get all goals that are on track to be completed by their target date
   */
  getGoalsOnTrack(): Goal[] {
    return this.goals.filter(goal => goal.isOnTrack());
  }

  /**
   * Get all goals that are behind schedule
   */
  getGoalsBehindSchedule(): Goal[] {
    return this.goals.filter(goal => !goal.isOnTrack());
  }

  /**
   * Get all completed goals
   */
  getCompletedGoals(): Goal[] {
    return this.goals.filter(goal => goal.currentAmount >= goal.targetAmount);
  }

  /**
   * Calculate the total required monthly contribution across all goals
   */
  getTotalRequiredMonthlyContribution(): number {
    return this.goals
      .filter(goal => goal.currentAmount < goal.targetAmount) // Only include incomplete goals
      .reduce((total, goal) => total + goal.getRequiredMonthlyContribution(), 0);
  }

  /**
   * Sort goals by priority based on proximity to target date
   */
  getPrioritizedGoals(): Goal[] {
    // Copy goals to avoid modifying the original array
    const prioritizedGoals = [...this.goals];

    // Sort by months remaining (ascending)
    return prioritizedGoals.sort((a, b) => a.getMonthsRemaining() - b.getMonthsRemaining());
  }
} 