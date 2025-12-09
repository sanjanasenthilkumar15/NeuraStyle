import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const funnelData = [
  { stage: "Views", value: 10000, percentage: 100 },
  { stage: "Recommendations", value: 6500, percentage: 65 },
  { stage: "AR Try-On", value: 3200, percentage: 32 },
  { stage: "Add to Cart", value: 2100, percentage: 21 },
  { stage: "Purchase", value: 1450, percentage: 14.5 },
];

export function ConversionFunnel() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>User Journey Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelData.map((item, index) => (
            <div key={item.stage} className="relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{item.stage}</span>
                <span className="text-sm text-muted-foreground">
                  {item.value.toLocaleString()} ({item.percentage}%)
                </span>
              </div>
              <div className="h-8 bg-secondary rounded-lg overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${item.percentage}%` }}
                >
                  {index < funnelData.length - 1 && (
                    <div className="w-0 h-0 border-l-[8px] border-l-primary border-y-[16px] border-y-transparent absolute right-0 translate-x-2" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Conversion Rate</span>
            <span className="text-2xl font-bold text-primary">14.5%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            +2.3% compared to last month
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
