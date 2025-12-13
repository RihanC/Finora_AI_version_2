import { motion } from 'framer-motion';
import { XPProgress } from '@/components/gamification/XPProgress';
import { BadgeCard } from '@/components/gamification/BadgeCard';
import { ChallengeCard } from '@/components/gamification/ChallengeCard';
import { mockBadges, mockChallenges } from '@/data/mockData';
import { Trophy, Target, Medal } from 'lucide-react';

export function GamificationPanel() {
  const earnedBadges = mockBadges.filter(b => b.earned);
  const activeChallenges = mockChallenges.filter(c => !c.completed);
  const completedChallenges = mockChallenges.filter(c => c.completed);

  return (
    <div className="px-4 py-4 pb-24 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-foreground mb-1">Your Progress</h2>
        <p className="text-sm text-muted-foreground">Keep crushing those financial goals!</p>
      </motion.div>

      {/* XP Progress */}
      <XPProgress />

      {/* Active Challenges */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Active Challenges</h3>
        </div>
        <div className="space-y-3">
          {activeChallenges.map((challenge, index) => (
            <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
          ))}
        </div>
      </div>

      {/* Completed Challenges */}
      {completedChallenges.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-foreground">Completed Today</h3>
          </div>
          <div className="space-y-3">
            {completedChallenges.map((challenge, index) => (
              <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-[hsl(45_100%_55%)]" />
            <h3 className="font-semibold text-foreground">Your Badges</h3>
          </div>
          <span className="text-xs text-muted-foreground">
            {earnedBadges.length}/{mockBadges.length} earned
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {mockBadges.map((badge, index) => (
            <BadgeCard key={badge.id} badge={badge} index={index} />
          ))}
        </div>
      </div>

      {/* Leaderboard Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-gradient-to-br from-primary/10 to-[hsl(260_60%_95%)] rounded-2xl border border-primary/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-foreground">Weekly Leaderboard</h4>
            <p className="text-sm text-muted-foreground">You're #12 among friends!</p>
          </div>
          <div className="flex -space-x-2">
            {['🧑', '👩', '🧔', '👱'].map((emoji, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-sm"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
