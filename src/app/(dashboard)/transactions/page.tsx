import { getDummyTransactions } from "@/data/dummy-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";

export default function TransactionsPage() {
  const transactions = getDummyTransactions();

  return (
    <div>
      <PageHeader breadcrumbs={[{ href: "/transactions", label: "Transactions" }]} />
      <div className="px-6 pb-6 pt-0 space-y-6">
        <h1 className="text-3xl font-bold mb-2">Transactions</h1>
        <div className="flex justify-end">
          <Button>Add Transaction</Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom">
                  <thead>
                    <tr className="border-b transition-colors">
                      <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Account</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <td className="p-4 align-middle">{formatDate(transaction.date)}</td>
                        <td className="p-4 align-middle font-medium">{transaction.description}</td>
                        <td className="p-4 align-middle">{transaction.category}</td>
                        <td className="p-4 align-middle">{transaction.account}</td>
                        <td className={`p-4 align-middle text-right font-medium ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                          }`}>
                          {formatCurrency(transaction.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 