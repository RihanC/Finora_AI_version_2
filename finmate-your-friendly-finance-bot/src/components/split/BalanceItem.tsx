import { motion } from 'framer-motion';
import { Balance } from '@/types/finance';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BalanceItemProps {
  balance: Balance;
  index?: number;
  onSettle?: () => void;
}

export function BalanceItem({ balance, index = 0, onSettle }: BalanceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-3 bg-muted/50 rounded-xl"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
          <span className="text-sm font-bold text-destructive">{balance.from[0]}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
          <span className="text-sm font-bold text-success">{balance.to[0]}</span>
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium text-foreground">
            {balance.from} owes {balance.to}
          </p>
          <p className="text-xs text-muted-foreground">₹{balance.amount}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" className="text-xs" onClick={onSettle}>
        Settle
      </Button>
    </motion.div>
  );
}
