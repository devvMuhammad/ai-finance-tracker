import { Account, Goal, Transaction, Recommendation } from '@/types';
import { getDummyAccounts } from '@/data/dummy-accounts';
import { getDummyTransactions } from '@/data/dummy-transactions';
import { getDummyGoals } from '@/data/dummy-goals';
import { getDummyRecommendations } from "@/data/dummy-recommendations"

/**
 * Singleton class for managing database connections and operations
 * This is a mock implementation using in-memory data for demonstration
 */
export class DatabaseConnection {
  private static instance: DatabaseConnection;

  private accounts: Account[] = [];
  private transactions: Transaction[] = [];
  private goals: Goal[] = [];
  private recommendations: Recommendation[] = [];

  private constructor() {
    // Initialize with dummy data
    this.loadDummyData();
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  private loadDummyData(): void {
    this.accounts = getDummyAccounts();
    this.transactions = getDummyTransactions();
    this.goals = getDummyGoals();
    this.recommendations = getDummyRecommendations();
  }

  // Account methods
  public getAccounts(): Account[] {
    return [...this.accounts];
  }

  public getAccountById(id: string): Account | undefined {
    return this.accounts.find(account => account.id === id);
  }

  public addAccount(account: Account): Account {
    this.accounts.push(account);
    return account;
  }

  public updateAccount(updatedAccount: Account): Account {
    const index = this.accounts.findIndex(account => account.id === updatedAccount.id);
    if (index !== -1) {
      this.accounts[index] = updatedAccount;
      return updatedAccount;
    }
    throw new Error(`Account with ID ${updatedAccount.id} not found`);
  }

  public deleteAccount(id: string): void {
    const index = this.accounts.findIndex(account => account.id === id);
    if (index !== -1) {
      this.accounts.splice(index, 1);
    }
  }

  // Transaction methods
  public getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  public getTransactionsByAccount(accountId: string): Transaction[] {
    return this.transactions.filter(transaction => transaction.account === accountId);
  }

  public getTransactionsByCategory(category: string): Transaction[] {
    return this.transactions.filter(transaction => transaction.category === category);
  }

  public addTransaction(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    // Update account balance
    const account = this.getAccountById(transaction.account);
    if (account) {
      account.balance += transaction.amount;
      this.updateAccount(account);
    }

    return transaction;
  }

  public updateTransaction(updatedTransaction: Transaction): Transaction {
    const index = this.transactions.findIndex(transaction => transaction.id === updatedTransaction.id);
    if (index !== -1) {
      this.transactions[index] = updatedTransaction;
      return updatedTransaction;
    }
    throw new Error(`Transaction with ID ${updatedTransaction.id} not found`);
  }

  public deleteTransaction(id: string): void {
    const index = this.transactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
      const transaction = this.transactions[index];

      // Update account balance
      const account = this.getAccountById(transaction.account);
      if (account) {
        account.balance -= transaction.amount;
        this.updateAccount(account);
      }

      this.transactions.splice(index, 1);
    }
  }

  // Goal methods
  public getGoals(): Goal[] {
    return [...this.goals];
  }

  public getGoalById(id: string): Goal | undefined {
    return this.goals.find(goal => goal.id === id);
  }

  public addGoal(goal: Goal): Goal {
    this.goals.push(goal);
    return goal;
  }

  public updateGoal(updatedGoal: Goal): Goal {
    const index = this.goals.findIndex(goal => goal.id === updatedGoal.id);
    if (index !== -1) {
      this.goals[index] = updatedGoal;
      return updatedGoal;
    }
    throw new Error(`Goal with ID ${updatedGoal.id} not found`);
  }

  public deleteGoal(id: string): void {
    const index = this.goals.findIndex(goal => goal.id === id);
    if (index !== -1) {
      this.goals.splice(index, 1);
    }
  }

  // Recommendation methods
  public getRecommendations(): Recommendation[] {
    return [...this.recommendations];
  }

  public getRecommendationById(id: string): Recommendation | undefined {
    return this.recommendations.find(recommendation => recommendation.id === id);
  }

  public addRecommendation(recommendation: Recommendation): Recommendation {
    this.recommendations.push(recommendation);
    return recommendation;
  }

  public updateRecommendation(updatedRecommendation: Recommendation): Recommendation {
    const index = this.recommendations.findIndex(recommendation => recommendation.id === updatedRecommendation.id);
    if (index !== -1) {
      this.recommendations[index] = updatedRecommendation;
      return updatedRecommendation;
    }
    throw new Error(`Recommendation with ID ${updatedRecommendation.id} not found`);
  }

  public deleteRecommendation(id: string): void {
    const index = this.recommendations.findIndex(recommendation => recommendation.id === id);
    if (index !== -1) {
      this.recommendations.splice(index, 1);
    }
  }
} 