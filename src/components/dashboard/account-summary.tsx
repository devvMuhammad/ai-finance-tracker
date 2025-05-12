import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface AccountSummaryProps {
  accounts: {
    id: string;
    name: string;
    type: string;
    balance: number;
    currency: string;
  }[];
}

export function AccountSummary({ accounts }: AccountSummaryProps) {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  // Group accounts by type
  const accountsByType = accounts.reduce((acc, account) => {
    const type = account.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(account);
    return acc;
  }, {} as Record<string, typeof accounts>)

  // Calculate total balance by type
  const balanceByType = Object.entries(accountsByType).map(([type, accounts]) => ({
    type,
    balance: accounts.reduce((sum, account) => sum + account.balance, 0),
  }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatCurrency(totalBalance)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total Balance Across All Accounts
          </p>
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-4">
            {balanceByType.map((item) => (
              <div key={item.type} className="flex flex-col">
                <span className="text-sm font-medium capitalize text-muted-foreground">
                  {item.type}
                </span>
                <span className="text-lg font-semibold mt-1">
                  {formatCurrency(item.balance)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">{account.name}</CardTitle>
              <span className="text-xs capitalize text-muted-foreground">
                {account.type}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(account.balance, account.currency)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 