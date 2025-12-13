import { Bell, Settings, Flame } from 'lucide-react';
import { mockUser } from '@/data/mockData';
import { motion } from 'framer-motion';
import { SettingsDialog } from './SettingsDialog';
import { NotificationsPopover } from './NotificationsPopover';

export function Header() {
  const xpForNextLevel = 3000;
  const xpProgress = (mockUser.xp % 1000) / 10;

  return (
    <header className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border z-50">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & XP */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(260_60%_55%)] flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              F
            </motion.div>
            <div>
              <h1 className="text-sm font-bold text-foreground">FinMate</h1>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-gradient-xp">Level {mockUser.level}</span>
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[hsl(45_100%_55%)] to-[hsl(35_100%_50%)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Streak */}
            <motion.div
              className="flex items-center gap-1 px-2.5 py-1.5 bg-accent/10 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Flame className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-accent">{mockUser.streak}</span>
            </motion.div>

            {/* Notifications */}
            <NotificationsPopover>
              <button className="relative p-2 hover:bg-muted rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
            </NotificationsPopover>

            {/* Settings */}
            <SettingsDialog>
              <button className="p-2 hover:bg-muted rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </SettingsDialog>
          </div>
        </div>
      </div>
    </header>
  );
}
