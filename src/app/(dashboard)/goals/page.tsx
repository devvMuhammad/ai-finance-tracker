"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoalCard } from "@/components/goals/goal-card"
import { GoalForm } from "@/components/goals/goal-form"
import { Goal } from "@/modules/goals/goal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Initialize the GoalService
const goalService = (typeof window !== 'undefined') ? require('@/data/dummy-goals').GoalService.getInstance() : null

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(() => goalService?.getGoals() || [])

  const handleAddGoal = (values: any) => {
    const newGoal = goalService?.addGoal({
      name: values.name,
      targetAmount: values.targetAmount,
      targetDate: values.targetDate,
      type: values.type,
      startDate: new Date(),
    })
    if (newGoal) {
      setGoals(goalService?.getGoals() || [])
    }
  }

  const savingGoals = goals.filter(goal => goal.type === "saving")
  const debtGoals = goals.filter(goal => goal.type === "debt")
  const investmentGoals = goals.filter(goal => goal.type === "investment")

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Goals</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="saving">Savings</TabsTrigger>
          <TabsTrigger value="debt">Debt</TabsTrigger>
          <TabsTrigger value="investment">Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
            <Card className="flex items-center justify-center">
              <CardContent className="p-6 w-full">
                <GoalForm onSubmit={handleAddGoal} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="saving" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savingGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
            <Card className="flex items-center justify-center">
              <CardContent className="p-6 w-full">
                <GoalForm onSubmit={handleAddGoal} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="debt" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {debtGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
            <Card className="flex items-center justify-center">
              <CardContent className="p-6 w-full">
                <GoalForm onSubmit={handleAddGoal} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investment" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {investmentGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
            <Card className="flex items-center justify-center">
              <CardContent className="p-6 w-full">
                <GoalForm onSubmit={handleAddGoal} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 