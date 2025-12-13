import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Target } from 'lucide-react';
import { ChatMessage } from '@/types/finance';
import { Button } from '@/components/ui/button';
import { useFinance } from '@/context/FinanceContext';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

const projectionData = [
  { month: 'Now', current: 15000, projected: 15000, savings: 5000 },
  { month: 'Mar', current: 14500, projected: 13000, savings: 6500 },
  { month: 'Apr', current: 14000, projected: 12000, savings: 8500 },
  { month: 'May', current: 13500, projected: 11500, savings: 10000 },
  { month: 'Jun', current: 13000, projected: 11000, savings: 12000 },
];

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    content: "Hey there! 🔮 I'm your Future Self from 2030. Trust me, you'll thank yourself for the financial decisions you make today!",
    sender: 'future-you',
    timestamp: '10:00 AM',
    type: 'text',
  },
  {
    id: '2',
    content: "I can see your current spending patterns. Want to know how small changes today can transform your future wealth?",
    sender: 'future-you',
    timestamp: '10:00 AM',
    type: 'text',
  },
];

export function FutureYouTab() {
  const { user } = useFinance();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getFutureYouResponse(input);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const getFutureYouResponse = (message: string): ChatMessage => {
    const lowerMsg = message.toLowerCase();
    let content = '';

    if (lowerMsg.includes('food') || lowerMsg.includes('eating')) {
      content = "Ah, the food spending! 🍕 If you reduce food delivery by just ₹200/week, that's ₹10,400/year. In 10 years with investments, that could become ₹2.5 lakhs! Future me bought a car with those savings. 🚗";
    } else if (lowerMsg.includes('save') || lowerMsg.includes('saving')) {
      content = `Smart thinking! 💰 At your current pace, you'll have ₹${(user.savingsGoal * 1.5).toLocaleString()} in 3 years. But if you increase savings by ₹2,000/month, that jumps significantly! Future me is proud of you for asking. 🌟`;
    } else if (lowerMsg.includes('invest')) {
      content = "Investing early is the BEST decision! 📈 Starting a ₹3,000 SIP now means ₹15 lakhs by 2035. Wait 5 years to start, and it's only ₹8 lakhs. Time is literally money! Future me started early - no regrets. 💪";
    } else if (lowerMsg.includes('goal') || lowerMsg.includes('house')) {
      content = `I remember that goal! We bought that house in 2028. It was tough saving ₹${user.savingsGoal.toLocaleString()}, but your discipline paid off. It's beautiful! 🏠`;
    } else {
      content = "That's a great question! 🤔 Based on your current patterns, you're on track to save ₹1.2 lakhs this year. Small improvements in any area compound into massive changes. What aspect would you like to explore? 🔮";
    }

    return {
      id: (Date.now() + 1).toString(),
      content,
      sender: 'future-you',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };
  };

  const handleWhatIf = (scenario: string) => {
    setInput(scenario);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-3 bg-gradient-to-r from-[hsl(260_60%_55%)] to-[hsl(280_70%_60%)] text-primary-foreground"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl animate-pulse-soft">
            🔮
          </div>
          <div>
            <h2 className="font-bold text-lg">Future You</h2>
            <p className="text-sm opacity-90">Chat with yourself from 2030</p>
          </div>
        </div>
      </motion.div>

      {/* Projection Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mt-4 p-4 bg-card rounded-2xl border border-border"
      >
        <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Your Financial Trajectory
        </h3>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <YAxis hide />
              <Tooltip
                formatter={(value: number, name: string) => [`₹${value}`, name === 'savings' ? 'Savings' : name === 'current' ? 'Current Path' : 'Better Path']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="savings" stroke="hsl(160, 70%, 45%)" fillOpacity={1} fill="url(#colorSavings)" strokeWidth={2} />
              <Line type="monotone" dataKey="current" stroke="hsl(215, 16%, 47%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="projected" stroke="hsl(260, 60%, 55%)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-muted-foreground" style={{ borderStyle: 'dashed' }} />
            <span className="text-[10px] text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-[hsl(260_60%_55%)]" />
            <span className="text-[10px] text-muted-foreground">Better Path</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-success/30" />
            <span className="text-[10px] text-muted-foreground">Savings</span>
          </div>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => {
            const isUser = message.sender === 'user';
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(260_60%_55%)] to-[hsl(280_70%_60%)] flex items-center justify-center text-sm flex-shrink-0">
                    🔮
                  </div>
                )}
                <div className={`rounded-2xl px-4 py-3 shadow-sm ${isUser
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-gradient-to-br from-secondary to-[hsl(260_40%_92%)] border border-[hsl(260_60%_80%)] rounded-bl-md'
                  }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-center"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(260_60%_55%)] to-[hsl(280_70%_60%)] flex items-center justify-center text-sm">
              🔮
            </div>
            <div className="bg-gradient-to-br from-secondary to-[hsl(260_40%_92%)] border border-[hsl(260_60%_80%)] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[hsl(260_60%_55%)]/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[hsl(260_60%_55%)]/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[hsl(260_60%_55%)]/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* What-If Buttons */}
      <div className="px-4 py-3 border-t border-border bg-card/50">
        <p className="text-xs text-muted-foreground mb-2">Ask about:</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Reduce food spending', 'Increase savings', 'Start investing'].map((scenario) => (
            <button
              key={scenario}
              onClick={() => handleWhatIf(scenario)}
              className="px-4 py-2 bg-[hsl(260_60%_95%)] text-[hsl(260_60%_50%)] border border-[hsl(260_60%_80%)] rounded-full text-sm font-medium whitespace-nowrap hover:bg-[hsl(260_60%_90%)] transition-colors"
            >
              {scenario}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your future self..."
              className="w-full px-4 py-3 bg-muted rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(260_60%_55%)]/30"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            size="icon"
            className="rounded-xl bg-gradient-to-r from-[hsl(260_60%_55%)] to-[hsl(280_70%_60%)]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* XP Notification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-20 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[hsl(45_100%_55%)] to-[hsl(35_100%_50%)] rounded-full shadow-md">
          <Sparkles className="w-4 h-4 text-xp-foreground" />
          <span className="text-sm font-bold text-xp-foreground">+20 XP for planning ahead!</span>
        </div>
      </motion.div>
    </div>
  );
}
