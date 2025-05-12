import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDummyRecommendations } from "@/data/dummy-recommendations";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";

export default function RecommendationsPage() {
  const recommendations = getDummyRecommendations();

  return (
    <div>
      <PageHeader breadcrumbs={[{ href: "/recommendations", label: "Recommendations" }]} />
      <div className="px-6 pb-6 pt-0 space-y-6">
        <h1 className="text-3xl font-bold mb-2">Recommendations</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {recommendations.map((recommendation) => (
            <Card key={recommendation.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{recommendation.title}</CardTitle>
                  <Badge variant={
                    recommendation.difficulty === 'easy' ? 'secondary' :
                      recommendation.difficulty === 'medium' ? 'outline' : 'destructive'
                  }>
                    {recommendation.difficulty}
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex items-center mt-1">
                    <span className="text-sm capitalize">{recommendation.type}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">
                      Potential impact: <span className="font-medium">{recommendation.potentialImpact > 0 ? '+' : ''}{recommendation.potentialImpact}%</span>
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{recommendation.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 