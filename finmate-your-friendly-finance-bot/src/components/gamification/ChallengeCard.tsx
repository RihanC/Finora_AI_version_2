import { motion } from 'framer-motion';
import { Challenge } from '@/types/finance';
import { cn } from '@/lib/utils';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  index?: number;
}

export function ChallengeCard({ challenge, index = 0 }: ChallengeCardProps) {
  const progress = (challenge.progress / challenge.target) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "p-4 rounded-2xl border transition-all",
        challenge.completed 
          ? "bg-success/5 border-success/30" 
          : "bg-card border-border"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          challenge.completed 
            ? "bg-success/20" 
            : challenge.type === 'daily' 
              ? "bg-primary/10" 
              : "bg-accent/10"
        )}>
          {challenge.completed ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : (
            <span className="text-lg">{challenge.type === 'daily' ? '📅' : '📆'}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={cn(
              "font-semibold text-sm",
              challenge.completed ? "text-success" : "text-foreground"
            )}>
              {challenge.title}
            </h4>
            <div className="flex items-center gap-1 text-xs font-bold text-gradient-xp">
              <Sparkles className="w-3 h-3" />
              +{challenge.xpReward} XP
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>

          {/* Progress bar */}
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className={cn(
                "h-full rounded-full",
                challenge.completed ? "bg-success" : "bg-primary"
              )}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            {challenge.progress}/{challenge.target} {challenge.type === 'daily' ? 'hours' : 'days'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
