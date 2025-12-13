import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Smile } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    food: 'hsl(15, 85%, 55%)',
    transport: 'hsl(200, 85%, 50%)',
    shopping: 'hsl(280, 70%, 60%)',
    bills: 'hsl(170, 60%, 45%)',
    entertainment: 'hsl(330, 75%, 55%)',
    health: 'hsl(140, 65%, 45%)'
  };
  return colors[category.toLowerCase()] || '#cccccc';
}

const weeklyData = [
  { day: 'Mon', amount: 450 },
  { day: 'Tue', amount: 820 },
  { day: 'Wed', amount: 350 },
  { day: 'Thu', amount: 1200 },
  { day: 'Fri', amount: 980 },
  { day: 'Sat', amount: 1450 },
  { day: 'Sun', amount: 620 },
];

const monthlyTrend = [
  { month: 'Sep', amount: 12000 },
  { month: 'Oct', amount: 15000 },
  { month: 'Nov', amount: 13500 },
  { month: 'Dec', amount: 18000 },
  { month: 'Jan', amount: 13650 },
];

const happinessData = [
  { spending: 500, happiness: 70 },
  { spending: 1000, happiness: 85 },
  { spending: 1500, happiness: 75 },
  { spending: 2000, happiness: 60 },
  { spending: 2500, happiness: 55 },
];

export function AnalyticsTab() {
  const { transactions } = useFinance();

  // Calculate totals from transactions
  const totalSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Group transactions by category for the pie chart
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(c => c.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount, color: getCategoryColor(t.category) });
      }
      return acc;
    }, [] as { name: string; value: number; color: string }[]);

  // Use mock data if no transactions exist yet
  const displayData = categoryData.length > 0 ? categoryData : [
    { name: 'No Data', value: 1, color: '#e5e7eb' }
  ];

  return (
    <div className="px-4 py-4 pb-24 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-success/5 border border-success/20 rounded-2xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-success" />
            <span className="text-xs text-success font-medium">11% less</span>
          </div>
          <p className="text-xs text-muted-foreground">vs last month</p>
          <p className="text-lg font-bold text-foreground">₹{totalSpent.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-primary/5 border border-primary/20 rounded-2xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs text-primary font-medium">15 days left</span>
          </div>
          <p className="text-xs text-muted-foreground">Remaining budget</p>
          <p className="text-lg font-bold text-foreground">₹4,350</p>
        </motion.div>
      </div>

      {/* Story Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-gradient-to-br from-primary/10 to-[hsl(260_60%_95%)] rounded-2xl border border-primary/20"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">📊</span>
          <h3 className="font-semibold text-foreground">Your Money Story</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This month you saved <span className="text-success font-semibold">11% more</span> than last month!
          Your biggest expense was <span className="font-semibold">{categoryData.length > 0 ? categoryData.sort((a, b) => b.value - a.value)[0].name : 'Nothing'}</span>.
          Consider cutting back to meet your savings goal. 🎯
        </p>
      </motion.div>

      {/* Pie Chart - Category Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 bg-card rounded-2xl border border-border"
      >
        <h3 className="font-semibold text-foreground mb-4">Spending by Category</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`₹${value}`, '']}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {categoryData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bar Chart - Weekly Spending */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-card rounded-2xl border border-border"
      >
        <h3 className="font-semibold text-foreground mb-4">Weekly Spending</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip
                formatter={(value: number) => [`₹${value}`, 'Spent']}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="amount" fill="hsl(195, 85%, 45%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Line Chart - Monthly Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 bg-card rounded-2xl border border-border"
      >
        <h3 className="font-semibold text-foreground mb-4">Monthly Trend</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip
                formatter={(value: number) => [`₹${value}`, 'Total']}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(350, 90%, 65%)"
                strokeWidth={3}
                dot={{ fill: 'hsl(350, 90%, 65%)', strokeWidth: 0, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Happiness vs Spending */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20"
      >
        <div className="flex items-center gap-2 mb-3">
          <Smile className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">Spending vs Happiness</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Research shows spending ₹1,000-1,500/day keeps you happiest!
        </p>
        <div className="flex justify-around items-end h-20">
          {happinessData.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-8 bg-accent/60 rounded-t-md transition-all"
                style={{ height: `${item.happiness * 0.7}px` }}
              />
              <span className="text-[10px] text-muted-foreground">₹{item.spending / 1000}k</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
