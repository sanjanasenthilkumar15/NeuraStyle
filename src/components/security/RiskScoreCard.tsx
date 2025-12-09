import { AlertTriangle, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  message: string;
  timestamp: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    message: "Unusual login pattern detected for User #4521",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "info",
    message: "New device registered for payment processing",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    type: "success",
    message: "Security scan completed - No vulnerabilities found",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    type: "critical",
    message: "Multiple failed authentication attempts detected",
    timestamp: "2 hours ago",
  },
];

const getAlertIcon = (type: Alert["type"]) => {
  switch (type) {
    case "critical":
      return AlertTriangle;
    case "warning":
      return AlertCircle;
    case "success":
      return CheckCircle;
    default:
      return Info;
  }
};

const getAlertStyles = (type: Alert["type"]) => {
  switch (type) {
    case "critical":
      return "bg-rose-50 border-rose-200 text-rose-700";
    case "warning":
      return "bg-amber-50 border-amber-200 text-amber-700";
    case "success":
      return "bg-emerald-50 border-emerald-200 text-emerald-700";
    default:
      return "bg-blue-50 border-blue-200 text-blue-700";
  }
};

export function RiskScoreCard() {
  const riskScore = 72;

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>UEBA Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Risk Score Gauge */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-secondary"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${(riskScore / 100) * 440} 440`}
                strokeLinecap="round"
                className={cn(
                  riskScore < 50 ? "text-emerald-500" :
                  riskScore < 75 ? "text-amber-500" : "text-rose-500"
                )}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold font-display">{riskScore}</span>
              <span className="text-sm text-muted-foreground">Risk Score</span>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Alerts
          </h4>
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border",
                  getAlertStyles(alert.type)
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs opacity-70 mt-0.5">{alert.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
