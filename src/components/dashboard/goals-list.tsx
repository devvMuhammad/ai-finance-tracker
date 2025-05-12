import { Goal } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface GoalsListProps {
  goals: Goal[];
}

export function GoalsList({ goals }: GoalsListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {goals.map((goal) => {
            const progressPercentage = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);

            return (
              <div key={goal.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{goal.name}</div>
                  <div className="text-sm font-medium">{progressPercentage}%</div>
                </div>

                <Progress
                  value={progressPercentage}
                  className="h-2 mb-2"
                />

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>{formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}</div>
                  <div>Target: {formatDate(goal.targetDate)}</div>
                </div>
              </div>
            );
          })}

          {goals.length === 0 && (
            <div className="p-6 text-center text-muted-foreground">
              No goals found
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <Link href="/goals">
            <Button variant="outline" className="w-full">Manage Goals</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 