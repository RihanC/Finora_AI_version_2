import { motion } from 'framer-motion';
import { Budget } from '@/types/finance';
import { categoryIcons, categoryColors } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface BudgetCardProps {
  budget: Budget;
  index?: number;
}

export function BudgetCard({ budget, index = 0 }: BudgetCardProps) {
  const icon = categoryIcons[budget.category];
  const colorClass = categoryColors[budget.category];
  const percentage = Math.round((budget.spent / budget.limit) * 100);
  const isOverBudget = percentage > 100;
  const isWarning = percentage > 80 && percentage <= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={cn(
        "p-4 bg-card rounded-2xl border transition-all",
        isOverBudget ? "border-destructive/30 bg-destructive/5" : "border-border"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
            colorClass
          )}>
            {icon}
          </div>
          <div>
            <h4 className="font-semibold text-foreground capitalize">{budget.category}</h4>
            <p className="text-xs text-muted-foreground">₹{budget.spent} of ₹{budget.limit}</p>
          </div>
        </div>
        <span className={cn(
          "text-sm font-bold",
          isOverBudget ? "text-destructive" : isWarning ? "text-warning" : "text-success"
        )}>
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.5, delay: index * 0.08 + 0.2 }}
          className={cn(
            "h-full rounded-full",
            isOverBudget 
              ? "bg-destructive" 
              : isWarning 
                ? "bg-warning" 
                : "bg-success"
          )}
        />
      </div>

      {isOverBudget && (
        <p className="text-xs text-destructive mt-2 font-medium">
          ⚠️ Over budget by ₹{budget.spent - budget.limit}
        </p>
      )}
    </motion.div>
  );
}
