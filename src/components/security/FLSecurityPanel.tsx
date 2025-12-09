import { Shield, Lock, Server, CheckCircle, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const trainingRounds = [
  { round: 15, accuracy: 94.2, participants: 1250, timestamp: "Today, 14:30" },
  { round: 14, accuracy: 93.8, participants: 1180, timestamp: "Yesterday, 22:00" },
  { round: 13, accuracy: 93.1, participants: 1320, timestamp: "Dec 7, 18:00" },
];

export function FLSecurityPanel() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle>Federated Learning & Security</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Security Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-emerald-700">Encryption</span>
              </div>
              <Badge variant="success">AES-256 Active</Badge>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-700">Privacy Mode</span>
              </div>
              <Badge variant="info">Zero-Copy Enabled</Badge>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h5 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Privacy Settings
            </h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Privacy Mode</p>
                  <p className="text-xs text-muted-foreground">Enable differential privacy</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Data Minimization</p>
                  <p className="text-xs text-muted-foreground">Collect only essential data</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Zero-Copy Processing</p>
                  <p className="text-xs text-muted-foreground">Process data without storage</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Training Rounds */}
          <div>
            <h5 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Model Training Rounds
            </h5>
            <div className="space-y-2">
              {trainingRounds.map((round) => (
                <div
                  key={round.round}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Round #{round.round}</p>
                      <p className="text-xs text-muted-foreground">{round.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-600">{round.accuracy}%</p>
                    <p className="text-xs text-muted-foreground">{round.participants} nodes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              All security protocols active and compliant
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
