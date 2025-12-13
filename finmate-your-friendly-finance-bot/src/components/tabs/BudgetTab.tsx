import { motion } from 'framer-motion';
import { Target, TrendingUp, PiggyBank, AlertTriangle } from 'lucide-react';
import { BudgetCard } from '@/components/budget/BudgetCard';
import { Button } from '@/components/ui/button';
import { useFinance } from '@/context/FinanceContext';

export function BudgetTab() {
  const { budgets, user } = useFinance();
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <div className="px-4 py-4 pb-24 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-card rounded-2xl border border-border"
        >
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-success" />
          </div>
          <p className="text-xs text-muted-foreground">Total Budget</p>
          <p className="text-xl font-bold text-foreground">₹{totalBudget.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-card rounded-2xl border border-border"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">Spent So Far</p>
          <p className="text-xl font-bold text-foreground">₹{totalSpent.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Savings Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-5 bg-gradient-to-br from-success/10 to-success/5 rounded-3xl border border-success/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Savings Goal</h3>
              <p className="text-sm text-muted-foreground">₹{user.savingsGoal.toLocaleString()}/month</p>
            </div>
          </div>
          <span className="text-2xl">🎯</span>
        </div>
        <div className="h-3 bg-success/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-full bg-success rounded-full"
          />
        </div>
        <p className="text-xs text-success mt-2 font-medium">65% achieved • ₹5,200 saved</p>
      </motion.div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-warning/5 border border-warning/20 rounded-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-sm">AI Budget Insight</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Based on your spending pattern, consider reducing shopping by 15% to meet your savings goal.
            </p>
            <Button variant="warning" size="sm" className="mt-3">
              Adjust Budget
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Category Budgets */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Category Budgets</h3>
        <div className="space-y-3">
          {budgets.map((budget, index) => (
            <BudgetCard key={budget.category} budget={budget} index={index} />
          ))}
        </div>
      </div>

      {/* Emergency Fund */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-secondary rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-secondary-foreground">Emergency Fund</h4>
            <p className="text-xs text-muted-foreground">Recommended: ₹1,05,000 (3 months)</p>
          </div>
          <span className="text-2xl">🛡️</span>
        </div>
        <div className="h-2 bg-secondary-foreground/10 rounded-full overflow-hidden mt-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '25%' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-full bg-secondary-foreground/50 rounded-full"
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">₹26,250 saved • 25% complete</p>
      </motion.div>
    </div>
  );
}
