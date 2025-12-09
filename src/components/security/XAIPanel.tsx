import { Sparkles, TrendingUp, Heart, DollarSign, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const factors = [
  { name: "Past Purchases", weight: 35, icon: DollarSign },
  { name: "Style Affinity", weight: 28, icon: Heart },
  { name: "Price Range Match", weight: 22, icon: TrendingUp },
  { name: "Browsing History", weight: 15, icon: Clock },
];

export function XAIPanel() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <CardTitle>Explainable AI Dashboard</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Sample Recommendation Explanation */}
          <div className="p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 bg-muted rounded-lg" />
              <div>
                <h4 className="font-semibold">Premium Cotton Blazer</h4>
                <p className="text-sm text-muted-foreground">Recommended Product</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="ai" className="gap-1">
                <Sparkles className="w-3 h-3" />
                AI Confidence: 94%
              </Badge>
            </div>

            <h5 className="text-sm font-semibold mb-3">
              Why was this recommended?
            </h5>

            <div className="space-y-3">
              {factors.map((factor) => {
                const Icon = factor.icon;
                return (
                  <div key={factor.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{factor.name}</span>
                      </div>
                      <span className="text-sm font-medium">{factor.weight}%</span>
                    </div>
                    <Progress value={factor.weight} className="h-2" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* SHAP-style Interpretation */}
          <div>
            <h5 className="text-sm font-semibold mb-3">Model Interpretation (SHAP)</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-emerald-100 rounded flex items-center justify-end pr-2">
                  <span className="text-xs font-medium text-emerald-700">+0.34</span>
                </div>
                <span className="text-xs text-muted-foreground w-24">Formal Style</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-emerald-100 rounded flex items-center justify-end pr-2" style={{ width: "70%" }}>
                  <span className="text-xs font-medium text-emerald-700">+0.22</span>
                </div>
                <span className="text-xs text-muted-foreground w-24">Premium Brand</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-rose-100 rounded flex items-center justify-start pl-2" style={{ width: "30%" }}>
                  <span className="text-xs font-medium text-rose-700">-0.08</span>
                </div>
                <span className="text-xs text-muted-foreground w-24">High Price</span>
              </div>
            </div>
          </div>

          {/* User Override */}
          <div className="p-3 border border-dashed border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              User can override AI decisions by adjusting preference weights in settings.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
