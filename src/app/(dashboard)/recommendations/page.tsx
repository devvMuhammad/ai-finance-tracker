"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecommendationService } from "@/modules/recommendations/recommendation-service"
import { GoalService } from "@/data/dummy-goals"
import { getDummyTransactions } from "@/data/dummy-transactions"
import type { Recommendation } from "@/lib/gemini"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const recommendationService = RecommendationService.getInstance()
        const goalService = GoalService.getInstance()
        
        const recommendations = await recommendationService.getRecommendations({
          transactions: getDummyTransactions(),
          goals: goalService.getGoals(),
          monthlyIncome: 5000, // Example monthly income
        })
        
        setRecommendations(recommendations)
      } catch (error) {
        console.error('Error loading recommendations:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [])

  const spendingRecs = recommendations.filter(rec => rec.type === 'spending')
  const savingRecs = recommendations.filter(rec => rec.type === 'saving')
  const investmentRecs = recommendations.filter(rec => rec.type === 'investment')

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Financial Recommendations</h1>
          <p className="text-muted-foreground mt-2">
            Personalized recommendations based on your financial data and goals
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Recommendations</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="saving">Saving</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px] mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : (
              recommendations.map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="spending" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {spendingRecs.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saving" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savingRecs.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investment" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {investmentRecs.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl">{recommendation.title}</CardTitle>
          <Badge variant={
            recommendation.difficulty === 'easy' ? 'secondary' :
            recommendation.difficulty === 'medium' ? 'default' :
            'destructive'
          }>
            {recommendation.difficulty}
          </Badge>
        </div>
        <CardDescription>
          Potential Impact: ${recommendation.potentialImpact.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-line">
          {recommendation.description}
        </p>
      </CardContent>
    </Card>
  )
} 