"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, Plus, MoreVertical, Pencil, Trash2, Building, Wallet } from "lucide-react";
import PageTitle from "@/components/ui/page-title";

// Define the Account type
type AccountType = "bank" | "cash" | "credit" | "investment";

interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  color?: string;
  institution?: string;
}

export default function AccountsPage() {
  // Mock accounts data - in a real app this would come from an API or state management
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      name: "Main Checking",
      type: "bank",
      balance: 2450.75,
      currency: "USD",
      institution: "Chase Bank"
    },
    {
      id: "2",
      name: "Savings",
      type: "bank",
      balance: 8720.42,
      currency: "USD",
      institution: "Bank of America"
    },
    {
      id: "3",
      name: "Visa Credit Card",
      type: "credit",
      balance: -1240.30,
      currency: "USD",
      institution: "Citibank"
    },
    {
      id: "4",
      name: "Emergency Cash",
      type: "cash",
      balance: 500,
      currency: "USD"
    },
    {
      id: "5",
      name: "Investment Portfolio",
      type: "investment",
      balance: 12500,
      currency: "USD",
      institution: "Vanguard"
    }
  ]);

  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    name: "",
    type: "bank",
    balance: 0,
    currency: "USD",
    institution: ""
  });

  // Calculate totals
  const totalAssets = accounts
    .filter(account => account.balance > 0)
    .reduce((sum, account) => sum + account.balance, 0);
  
  const totalLiabilities = accounts
    .filter(account => account.balance < 0)
    .reduce((sum, account) => sum + Math.abs(account.balance), 0);
  
  const netWorth = totalAssets - totalLiabilities;

  const handleAddAccount = () => {
    const newId = (accounts.length + 1).toString();
    setAccounts([...accounts, { id: newId, ...newAccount as Account }]);
    setNewAccount({
      name: "",
      type: "bank",
      balance: 0,
      currency: "USD",
      institution: ""
    });
    setIsAddAccountOpen(false);
  };

  const handleEditAccount = () => {
    if (!editingAccount) return;
    
    setAccounts(accounts.map(account => 
      account.id === editingAccount.id ? editingAccount : account
    ));
    
    setIsEditAccountOpen(false);
    setEditingAccount(null);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const startEditAccount = (account: Account) => {
    setEditingAccount({ ...account });
    setIsEditAccountOpen(true);
  };

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case "bank":
        return <Building className="h-4 w-4" />;
      case "cash":
        return <Wallet className="h-4 w-4" />;
      case "credit":
        return <CreditCard className="h-4 w-4" />;
      case "investment":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Accounts" 
          subtitle="Manage your financial accounts"
          icon={<CreditCard size={28} />}
        />
        <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Account</DialogTitle>
              <DialogDescription>
                Enter the details for your new financial account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  onValueChange={(value) => setNewAccount({ ...newAccount, type: value as AccountType })}
                  defaultValue={newAccount.type}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">
                  Balance
                </Label>
                <Input
                  id="balance"
                  type="number"
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({ ...newAccount, balance: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="currency" className="text-right">
                  Currency
                </Label>
                <Select
                  onValueChange={(value) => setNewAccount({ ...newAccount, currency: value })}
                  defaultValue={newAccount.currency}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="institution" className="text-right">
                  Institution
                </Label>
                <Input
                  id="institution"
                  value={newAccount.institution}
                  onChange={(e) => setNewAccount({ ...newAccount, institution: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAccountOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAccount}>Save Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAssets)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalLiabilities)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(netWorth)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Account Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="bank">Bank</TabsTrigger>
          <TabsTrigger value="cash">Cash</TabsTrigger>
          <TabsTrigger value="credit">Credit</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {accounts.map((account) => (
            <AccountCard 
              key={account.id} 
              account={account} 
              onEdit={() => startEditAccount(account)}
              onDelete={() => handleDeleteAccount(account.id)}
            />
          ))}
        </TabsContent>
        
        {["bank", "cash", "credit", "investment"].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {accounts
              .filter((account) => account.type === type)
              .map((account) => (
                <AccountCard 
                  key={account.id} 
                  account={account} 
                  onEdit={() => startEditAccount(account)}
                  onDelete={() => handleDeleteAccount(account.id)}
                />
              ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Account Dialog */}
      <Dialog open={isEditAccountOpen} onOpenChange={setIsEditAccountOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Update your account details.
            </DialogDescription>
          </DialogHeader>
          {editingAccount && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingAccount.name}
                  onChange={(e) => setEditingAccount({ ...editingAccount, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select
                  onValueChange={(value) => setEditingAccount({ ...editingAccount, type: value as AccountType })}
                  defaultValue={editingAccount.type}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-balance" className="text-right">
                  Balance
                </Label>
                <Input
                  id="edit-balance"
                  type="number"
                  value={editingAccount.balance}
                  onChange={(e) => setEditingAccount({ ...editingAccount, balance: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-institution" className="text-right">
                  Institution
                </Label>
                <Input
                  id="edit-institution"
                  value={editingAccount.institution || ""}
                  onChange={(e) => setEditingAccount({ ...editingAccount, institution: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditAccountOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAccount}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Account Card Component
function AccountCard({ 
  account, 
  onEdit, 
  onDelete 
}: { 
  account: Account; 
  onEdit: () => void; 
  onDelete: () => void; 
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: account.currency,
    }).format(amount);
  };

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case "bank":
        return <Building className="h-4 w-4" />;
      case "cash":
        return <Wallet className="h-4 w-4" />;
      case "credit":
        return <CreditCard className="h-4 w-4" />;
      case "investment":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-primary/10">
            {getAccountIcon(account.type)}
          </div>
          <div>
            <CardTitle>{account.name}</CardTitle>
            <CardDescription>
              {account.institution || `${account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account`}
            </CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatCurrency(account.balance)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <Button variant="outline" size="sm" onClick={onEdit}>
          Manage
        </Button>
      </CardFooter>
    </Card>
  );
}