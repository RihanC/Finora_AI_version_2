import { motion } from 'framer-motion';
import { Badge } from '@/types/finance';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
  index?: number;
}

export function BadgeCard({ badge, index = 0 }: BadgeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      className={cn(
        "relative p-4 rounded-2xl border text-center transition-all",
        badge.earned 
          ? "bg-card border-border hover:shadow-md cursor-pointer" 
          : "bg-muted/50 border-border/50 opacity-60"
      )}
    >
      {!badge.earned && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl backdrop-blur-[1px]">
          <Lock className="w-6 h-6 text-muted-foreground" />
        </div>
      )}

      <div className={cn(
        "w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center text-2xl",
        badge.tier === 'bronze' && "badge-bronze",
        badge.tier === 'silver' && "badge-silver",
        badge.tier === 'gold' && "badge-gold",
        !badge.earned && "grayscale"
      )}>
        {badge.icon}
      </div>

      <h4 className="font-semibold text-sm text-foreground mb-1">{badge.name}</h4>
      <p className="text-[11px] text-muted-foreground leading-tight">{badge.description}</p>
      
      {badge.earned && badge.earnedDate && (
        <p className="text-[10px] text-success mt-2 font-medium">
          Earned {badge.earnedDate}
        </p>
      )}
    </motion.div>
  );
}
