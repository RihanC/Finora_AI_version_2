import { motion } from 'framer-motion';
import { Plus, Lightbulb, Sparkles, BarChart2, Users, Calculator } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const actions = [
  { id: 'add-expense', label: 'Add Expense', icon: Plus, color: 'bg-primary/10 text-primary border-primary/20' },
  { id: 'budget-tips', label: 'Budget Tips', icon: Lightbulb, color: 'bg-warning/10 text-warning border-warning/20' },
  { id: 'future-you', label: 'Future You', icon: Sparkles, color: 'bg-[hsl(260_60%_95%)] text-[hsl(260_60%_50%)] border-[hsl(260_60%_80%)]' },
  { id: 'show-graphs', label: 'Show Graphs', icon: BarChart2, color: 'bg-success/10 text-success border-success/20' },
  { id: 'split-bill', label: 'Split Bill', icon: Users, color: 'bg-accent/10 text-accent border-accent/20' },
  { id: 'calculate', label: 'Calculate', icon: Calculator, color: 'bg-muted text-muted-foreground border-border' },
];

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onAction(action.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium whitespace-nowrap transition-all hover:scale-105 active:scale-95 ${action.color}`}
          >
            <Icon className="w-4 h-4" />
            {action.label}
          </motion.button>
        );
      })}
    </div>
  );
}
