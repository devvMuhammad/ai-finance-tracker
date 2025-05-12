import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  description: string;
  subtext: string;
}

export function StatCard({ title, value, change, description, subtext }: StatCardProps) {
  const isPositive = change > 0;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className={`text-xs px-2 py-1 rounded-md font-medium ${isPositive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
            }`}>
            {isPositive ? '+' : ''}{change}%
          </div>
        </div>

        <div className="text-3xl font-bold mt-2">
          {value}
        </div>

        <div className="mt-4 flex flex-col space-y-1">
          <div className="flex items-center text-sm">
            <div className={isPositive ? 'text-green-600' : 'text-red-600'}>
              {description}
              {isPositive ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline ml-1">
                  <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline ml-1">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {subtext}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 