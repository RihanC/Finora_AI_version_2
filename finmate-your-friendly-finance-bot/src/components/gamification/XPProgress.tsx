import { motion } from 'framer-motion';
import { Sparkles, Trophy, Flame } from 'lucide-react';
import { mockUser } from '@/data/mockData';

export function XPProgress() {
  const currentLevelXP = mockUser.xp % 1000;
  const xpForNextLevel = 1000;
  const progress = (currentLevelXP / xpForNextLevel) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 bg-gradient-to-br from-card to-muted rounded-3xl border border-border"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(45_100%_55%)] to-[hsl(35_100%_50%)] flex items-center justify-center shadow-md">
            <Trophy className="w-6 h-6 text-xp-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Level {mockUser.level}</h3>
            <p className="text-sm text-muted-foreground">{currentLevelXP} / {xpForNextLevel} XP</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
          <Flame className="w-4 h-4 text-accent" />
          <span className="text-sm font-bold text-accent">{mockUser.streak} day streak</span>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[hsl(45_100%_55%)] to-[hsl(35_100%_50%)] rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-foreground/80">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
        <Sparkles className="w-4 h-4 text-[hsl(45_100%_55%)]" />
        <span>{xpForNextLevel - currentLevelXP} XP to next level</span>
      </div>
    </motion.div>
  );
}
