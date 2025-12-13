import { motion } from 'framer-motion';
import { Transaction } from '@/types/finance';
import { categoryIcons, categoryColors } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  index?: number;
}

export function TransactionCard({ transaction, index = 0 }: TransactionCardProps) {
  const icon = categoryIcons[transaction.category];
  const colorClass = categoryColors[transaction.category];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 p-3 bg-card rounded-2xl border border-border hover:shadow-sm transition-all"
    >
      {/* Category Icon */}
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center text-xl",
        colorClass
      )}>
        {icon}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground truncate">{transaction.description}</h4>
        <p className="text-xs text-muted-foreground capitalize">{transaction.category} • {transaction.date}</p>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2">
        <span className={cn(
          "font-bold",
          transaction.type === 'expense' ? "text-destructive" : "text-success"
        )}>
          {transaction.type === 'expense' ? '-' : '+'}₹{transaction.amount}
        </span>
        <button className="p-1 hover:bg-muted rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </motion.div>
  );
}
