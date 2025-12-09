import { Navigation } from "@/components/layout/Navigation";
import { StatCard } from "@/components/dashboard/StatCard";
import { AgentActivityChart } from "@/components/dashboard/AgentActivityChart";
import { ConversionFunnel } from "@/components/dashboard/ConversionFunnel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  TrendingUp, 
  ShoppingCart, 
  Clock,
  Package,
  Sparkles,
  Users,
  DollarSign
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const aovData = [
  { name: "Before AI", value: 2450, fill: "#E5E7EB" },
  { name: "With NEURAStyle", value: 3890, fill: "#FFD500" },
];

const topProducts = [
  { name: "Premium Cotton Blazer", sales: 234, revenue: "₹11.6L" },
  { name: "Floral Print Dress", sales: 189, revenue: "₹4.3L" },
  { name: "Classic White Sneakers", sales: 156, revenue: "₹5.4L" },
  { name: "Athleisure Track Pants", sales: 143, revenue: "₹2.1L" },
];

const recentConversations = [
  { id: "1", user: "User #4521", message: "Looking for formal wear for a wedding", status: "active", time: "2m ago" },
  { id: "2", user: "User #3892", message: "Need size recommendation for blazer", status: "resolved", time: "5m ago" },
  { id: "3", user: "User #2134", message: "Checking inventory at Phoenix Mall", status: "active", time: "8m ago" },
  { id: "4", user: "User #5678", message: "Payment query for order #12345", status: "pending", time: "12m ago" },
];

export default function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Master monitoring and analytics</p>
            </div>
            <Badge variant="ai" className="gap-1">
              <Sparkles className="w-3 h-3" />
              AI Insights Active
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Active Conversations"
              value="1,234"
              change="+12% from yesterday"
              changeType="positive"
              icon={MessageSquare}
            />
            <StatCard
              title="Conversion Rate"
              value="14.5%"
              change="+2.3% this month"
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="Orders Today"
              value="456"
              change="On track for target"
              changeType="neutral"
              icon={ShoppingCart}
            />
            <StatCard
              title="Avg Response Time"
              value="1.2s"
              change="-0.3s improved"
              changeType="positive"
              icon={Clock}
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <AgentActivityChart />
            <ConversionFunnel />
          </div>

          {/* Second Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* AOV Comparison */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  AOV Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={aovData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                      <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={12} width={120} />
                      <Tooltip
                        formatter={(value) => [`₹${value}`, "AOV"]}
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {aovData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <p className="text-center">
                    <span className="text-2xl font-bold text-primary">+58.8%</span>
                    <span className="text-muted-foreground ml-2">increase in Average Order Value</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Top Recommended Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={product.name}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {index + 1}
                        </span>
                        <span className="font-medium">{product.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{product.revenue}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Conversations */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Real-time Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{conv.user}</p>
                        <p className="text-sm text-muted-foreground">{conv.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          conv.status === "active"
                            ? "success"
                            : conv.status === "resolved"
                            ? "secondary"
                            : "warning"
                        }
                      >
                        {conv.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{conv.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
