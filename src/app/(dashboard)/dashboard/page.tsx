import { AccountSummary } from "@/components/dashboard/account-summary";
import { getDummyAccounts } from "@/data/dummy-accounts";
import { getDummyTransactions } from "@/data/dummy-transactions";
import { getDummyGoals } from "@/data/dummy-goals";
import { TransactionsList } from "@/components/dashboard/transactions-list";
import { GoalsList } from "@/components/dashboard/goals-list";
import { PageHeader } from "@/components/layout/page-header";

export default function DashboardPage() {
  const accounts = getDummyAccounts().slice(0, 3);
  const transactions = getDummyTransactions().slice(0, 5); // Get only the 5 most recent transactions
  const goals = getDummyGoals();

  return (
    <div>
      <PageHeader />
      <div className="px-6 pb-6 pt-0 space-y-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <AccountSummary accounts={accounts} />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            <TransactionsList transactions={transactions} showViewAll={true} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Financial Goals</h2>
            <GoalsList goals={goals} />
          </div>
        </div>
      </div>
    </div>
  );
} 