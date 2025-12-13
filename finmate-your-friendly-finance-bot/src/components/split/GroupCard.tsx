import { motion } from 'framer-motion';
import { Group, Balance } from '@/types/finance';
import { calculateBalances } from '@/data/mockData';
import { Users, ChevronRight } from 'lucide-react';

interface GroupCardProps {
  group: Group;
  index?: number;
  onClick?: () => void;
}

export function GroupCard({ group, index = 0, onClick }: GroupCardProps) {
  const balances = calculateBalances(group);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="p-4 bg-card rounded-2xl border border-border hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{group.name}</h4>
            <p className="text-xs text-muted-foreground">{group.members.length} members</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Total expenses</p>
          <p className="text-lg font-bold text-foreground">₹{group.totalExpense.toLocaleString()}</p>
        </div>
        {balances.length > 0 && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Settlements</p>
            <p className="text-sm font-medium text-accent">{balances.length} pending</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
