import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Goal } from "@/types"

interface GoalCardProps {
  goal: Goal
}

export function GoalCard({ goal }: GoalCardProps) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>{goal.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Current</p>
              <p className="font-medium">${goal.currentAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Target</p>
              <p className="font-medium">${goal.targetAmount.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground">Target Date</p>
            <p className="font-medium">
              {goal.targetDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 