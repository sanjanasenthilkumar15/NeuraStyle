import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
  { time: "00:00", sales: 120, inventory: 80, loyalty: 45, payment: 60 },
  { time: "04:00", sales: 80, inventory: 60, loyalty: 30, payment: 40 },
  { time: "08:00", sales: 200, inventory: 120, loyalty: 80, payment: 100 },
  { time: "12:00", sales: 350, inventory: 180, loyalty: 120, payment: 160 },
  { time: "16:00", sales: 280, inventory: 150, loyalty: 100, payment: 140 },
  { time: "20:00", sales: 220, inventory: 130, loyalty: 90, payment: 120 },
  { time: "23:59", sales: 150, inventory: 90, loyalty: 60, payment: 80 },
];

export function AgentActivityChart() {
  return (
    <Card variant="elevated" className="col-span-2">
      <CardHeader>
        <CardTitle>Agent Activity Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD500" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFD500" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="inventoryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#333333" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#333333" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="loyaltyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="paymentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="sales"
                name="Sales Agent"
                stroke="#FFD500"
                fill="url(#salesGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="inventory"
                name="Inventory Agent"
                stroke="#333333"
                fill="url(#inventoryGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="loyalty"
                name="Loyalty Agent"
                stroke="#10B981"
                fill="url(#loyaltyGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="payment"
                name="Payment Agent"
                stroke="#6366F1"
                fill="url(#paymentGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
