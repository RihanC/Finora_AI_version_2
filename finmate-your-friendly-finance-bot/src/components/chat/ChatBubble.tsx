import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types/finance';
import { Sparkles } from 'lucide-react';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';
  const isFutureYou = message.sender === 'future-you';
  const isXpNotification = message.type === 'xp-notification';

  if (isXpNotification) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center my-2"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[hsl(45_100%_55%)] to-[hsl(35_100%_50%)] rounded-full shadow-md">
          <Sparkles className="w-4 h-4 text-xp-foreground" />
          <span className="text-sm font-bold text-xp-foreground">{message.content}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-2 max-w-[85%]",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0",
          isFutureYou 
            ? "bg-gradient-to-br from-[hsl(260_60%_55%)] to-[hsl(280_70%_60%)]" 
            : "bg-gradient-to-br from-primary to-[hsl(210_80%_55%)]"
        )}>
          {isFutureYou ? '🔮' : '🤖'}
        </div>
      )}

      {/* Message bubble */}
      <div className={cn(
        "rounded-2xl px-4 py-3 shadow-sm",
        isUser 
          ? "bg-primary text-primary-foreground rounded-br-md" 
          : isFutureYou
            ? "bg-gradient-to-br from-secondary to-[hsl(260_40%_92%)] border border-[hsl(260_60%_80%)] rounded-bl-md"
            : "bg-card border border-border rounded-bl-md"
      )}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        <span className={cn(
          "text-[10px] mt-1 block",
          isUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {message.timestamp}
        </span>
      </div>
    </motion.div>
  );
}
