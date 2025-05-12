import { Account as AccountType } from '@/types';

/**
 * Transaction class to represent financial transactions
 */
export class Transaction {
  private amount: number;
  private description: string;
  private date: Date;

  constructor(amount: number, description: string, date: Date = new Date()) {
    this.amount = amount;
    this.description = description;
    this.date = date;
  }

  getAmount(): number {
    return this.amount;
  }

  getDescription(): string {
    return this.description;
  }

  getDate(): Date {
    return this.date;
  }
}

/**
 * Component interface for the Composite pattern
 * Defines operations that all concrete components must implement
 */
export interface FinancialAccount {
  getId(): string;
  getName(): string;
  getBalance(): number;
  addTransaction(amount: number, description: string, date?: Date): void;
  getTransactionHistory(): Transaction[];
}

/**
 * Leaf class in the Composite pattern
 * Represents individual accounts like checking, savings, credit cards, etc.
 */
export class Account implements FinancialAccount {
  private id: string;
  private name: string;
  private type: 'checking' | 'savings' | 'investment' | 'credit';
  private balance: number;
  private transactions: Transaction[] = [];

  constructor(id: string, name: string, type: 'checking' | 'savings' | 'investment' | 'credit', initialBalance: number = 0) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.balance = initialBalance;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): string {
    return this.type;
  }

  getBalance(): number {
    return this.balance;
  }

  addTransaction(amount: number, description: string, date: Date = new Date()): void {
    const transaction = new Transaction(amount, description, date);
    this.transactions.push(transaction);
    this.balance += amount;
  }

  getTransactionHistory(): Transaction[] {
    return [...this.transactions];
  }

  // Convert to the AccountType for consistency with the rest of the app
  toAccountData(): AccountType {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      balance: this.balance,
      currency: 'USD' // Default currency
    };
  }
}

/**
 * Composite class in the Composite pattern
 * Represents a group of accounts, allowing them to be treated as a single entity
 */
export class AccountGroup implements FinancialAccount {
  private id: string;
  private name: string;
  private accounts: FinancialAccount[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  /**
   * Get the total balance of all accounts in the group
   */
  getBalance(): number {
    return this.accounts.reduce((sum, account) => sum + account.getBalance(), 0);
  }

  /**
   * Adding a transaction directly to an account group is not allowed
   * This would need to be done on a specific account
   */
  addTransaction(): void {
    throw new Error("Cannot add transactions directly to an account group. Add to a specific account instead.");
  }

  /**
   * Get transaction history from all accounts in the group
   */
  getTransactionHistory(): Transaction[] {
    const allTransactions: Transaction[] = [];
    this.accounts.forEach(account => {
      allTransactions.push(...account.getTransactionHistory());
    });

    // Sort by date, newest first
    return allTransactions.sort((a, b) => b.getDate().getTime() - a.getDate().getTime());
  }

  /**
   * Add an account or account group to this group
   */
  addAccount(account: FinancialAccount): void {
    this.accounts.push(account);
  }

  /**
   * Remove an account or account group from this group
   */
  removeAccount(accountId: string): void {
    const index = this.accounts.findIndex(account => account.getId() === accountId);
    if (index !== -1) {
      this.accounts.splice(index, 1);
    }
  }

  /**
   * Get all accounts in this group
   */
  getAccounts(): FinancialAccount[] {
    return [...this.accounts];
  }
} 