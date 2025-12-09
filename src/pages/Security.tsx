import { Navigation } from "@/components/layout/Navigation";
import { RiskScoreCard } from "@/components/security/RiskScoreCard";
import { XAIPanel } from "@/components/security/XAIPanel";
import { FLSecurityPanel } from "@/components/security/FLSecurityPanel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MapPin, 
  Activity,
  Eye,
  Clock,
  Globe
} from "lucide-react";

const accessLogs = [
  { id: "1", action: "Login", user: "admin@neurastyle.com", ip: "192.168.1.45", location: "Mumbai, IN", time: "2 min ago", status: "success" },
  { id: "2", action: "API Access", user: "sales-agent", ip: "10.0.0.12", location: "Internal", time: "5 min ago", status: "success" },
  { id: "3", action: "Data Export", user: "analytics@neurastyle.com", ip: "192.168.1.78", location: "Delhi, IN", time: "15 min ago", status: "success" },
  { id: "4", action: "Login Attempt", user: "unknown", ip: "45.67.89.12", location: "Unknown", time: "23 min ago", status: "blocked" },
];

const sessionPatterns = [
  { metric: "Avg Session Duration", value: "12m 34s", trend: "+8%" },
  { metric: "Pages per Session", value: "7.2", trend: "+12%" },
  { metric: "Bounce Rate", value: "23%", trend: "-5%" },
  { metric: "Return Visitors", value: "68%", trend: "+15%" },
];

export default function Security() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Security & Governance</h1>
              <p className="text-muted-foreground mt-1">UEBA, XAI, and Federated Learning controls</p>
            </div>
            <Badge variant="success" className="gap-1">
              <Shield className="w-3 h-3" />
              All Systems Secure
            </Badge>
          </div>

          {/* Main Panels */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <RiskScoreCard />
            <XAIPanel />
            <FLSecurityPanel />
          </div>

          {/* Additional Panels */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Geolocation Map Placeholder */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Anomaly Geolocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-emerald-500 rounded-full animate-ping" />
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-emerald-500 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
                    <div className="absolute top-3/4 left-2/3 w-4 h-4 bg-amber-500 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
                    <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-rose-500 rounded-full animate-ping" style={{ animationDelay: "1.5s" }} />
                  </div>
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Geographic distribution of access attempts</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-600">1,234</p>
                    <p className="text-xs text-muted-foreground">Normal</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">23</p>
                    <p className="text-xs text-muted-foreground">Suspicious</p>
                  </div>
                  <div className="text-center p-3 bg-rose-50 rounded-lg">
                    <p className="text-2xl font-bold text-rose-600">5</p>
                    <p className="text-xs text-muted-foreground">Blocked</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Patterns */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Session Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {sessionPatterns.map((pattern) => (
                    <div key={pattern.metric} className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">{pattern.metric}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-bold">{pattern.value}</span>
                        <span className={`text-sm font-medium ${
                          pattern.trend.startsWith("+") ? "text-emerald-600" : "text-rose-600"
                        }`}>
                          {pattern.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Agent-Trigger Deviation
                </h4>
                <div className="space-y-2">
                  {["Sales Agent", "Inventory Agent", "Loyalty Agent", "Payment Agent"].map((agent, i) => (
                    <div key={agent} className="flex items-center gap-3">
                      <span className="text-sm w-32">{agent}</span>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            i === 2 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${[92, 88, 67, 95][i]}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">
                        {[92, 88, 67, 95][i]}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Access Logs */}
            <Card variant="elevated" className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Access Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Action</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">User</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">IP Address</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Location</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Time</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accessLogs.map((log) => (
                        <tr key={log.id} className="border-b border-border/50 hover:bg-secondary/30">
                          <td className="py-3 px-4 text-sm font-medium">{log.action}</td>
                          <td className="py-3 px-4 text-sm">{log.user}</td>
                          <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{log.ip}</td>
                          <td className="py-3 px-4 text-sm">{log.location}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {log.time}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={log.status === "success" ? "success" : "destructive"}>
                              {log.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
