import { Transaction } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TransactionsListProps {
  transactions: Transaction[];
  showViewAll?: boolean;
}

export function TransactionsList({ transactions, showViewAll = false }: TransactionsListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium">{transaction.description}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(transaction.date)} • {transaction.category}
                </div>
              </div>
              <div className={`font-medium ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className="p-6 text-center text-muted-foreground">
              No transactions found
            </div>
          )}
        </div>

        {showViewAll && transactions.length > 0 && (
          <div className="p-4 border-t">
            <Link href="/transactions">
              <Button variant="outline" className="w-full">View All Transactions</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 