import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Lightbulb, ChevronRight, Wallet, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockUser } from '@/data/mockData';

const riskQuestions = [
  { question: 'Your age group?', options: ['18-25', '26-35', '36-45', '45+'] },
  { question: 'Monthly savings capacity?', options: ['₹1-5K', '₹5-15K', '₹15-30K', '₹30K+'] },
  { question: 'Risk tolerance?', options: ['Low', 'Medium', 'High'] },
];

const investmentOptions = [
  { 
    name: 'Conservative SIP', 
    risk: 'Low', 
    returns: '8-10%', 
    amount: 2000,
    description: 'Debt funds & liquid funds',
    color: 'bg-success/10 text-success border-success/20'
  },
  { 
    name: 'Balanced Growth', 
    risk: 'Medium', 
    returns: '12-15%', 
    amount: 3500,
    description: 'Hybrid mutual funds',
    color: 'bg-primary/10 text-primary border-primary/20'
  },
  { 
    name: 'Aggressive Growth', 
    risk: 'High', 
    returns: '15-20%', 
    amount: 5000,
    description: 'Equity mutual funds',
    color: 'bg-accent/10 text-accent border-accent/20'
  },
];

export function InvestTab() {
  const [quizCompleted, setQuizCompleted] = useState(true);
  const monthlyCapacity = mockUser.monthlyIncome * 0.2; // 20% of income

  return (
    <div className="px-4 py-4 pb-24 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-foreground mb-1">Investments</h2>
        <p className="text-sm text-muted-foreground">Build wealth for your future</p>
      </motion.div>

      {/* Investment Capacity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 bg-gradient-to-br from-success/10 to-success/5 rounded-3xl border border-success/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Investment Capacity</p>
              <p className="text-2xl font-bold text-foreground">₹{monthlyCapacity.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Based on your income of ₹{mockUser.monthlyIncome.toLocaleString()}/month and spending patterns
        </p>
      </motion.div>

      {/* Risk Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 bg-card rounded-2xl border border-border"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Your Risk Profile</h3>
              <p className="text-sm text-primary font-medium">Moderate</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Retake Quiz
          </Button>
        </div>
      </motion.div>

      {/* Investment Recommendations */}
      <div>
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-warning" />
          Recommended for You
        </h3>
        <div className="space-y-3">
          {investmentOptions.map((option, index) => (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`p-4 rounded-2xl border ${option.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{option.name}</h4>
                <span className="text-xs font-medium px-2 py-1 bg-current/10 rounded-full">
                  {option.risk} Risk
                </span>
              </div>
              <p className="text-xs opacity-80 mb-3">{option.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-70">Expected Returns</p>
                  <p className="font-bold">{option.returns} p.a.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-70">Suggested SIP</p>
                  <p className="font-bold">₹{option.amount}/month</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3" size="sm">
                Start SIP <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wealth Projection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-5 bg-gradient-to-br from-[hsl(260_60%_95%)] to-[hsl(280_70%_95%)] rounded-3xl border border-[hsl(260_60%_80%)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[hsl(260_60%_55%)]/20 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-[hsl(260_60%_50%)]" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Wealth Projection</h3>
            <p className="text-xs text-muted-foreground">If you invest ₹5,000/month</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-card/50 rounded-xl">
            <p className="text-lg font-bold text-foreground">₹3.2L</p>
            <p className="text-[10px] text-muted-foreground">5 Years</p>
          </div>
          <div className="p-3 bg-card/50 rounded-xl">
            <p className="text-lg font-bold text-foreground">₹8.1L</p>
            <p className="text-[10px] text-muted-foreground">10 Years</p>
          </div>
          <div className="p-3 bg-card/50 rounded-xl">
            <p className="text-lg font-bold text-foreground">₹35L</p>
            <p className="text-[10px] text-muted-foreground">20 Years</p>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground mt-3 text-center">
          *Assuming 12% average returns
        </p>
      </motion.div>

      {/* Beginner Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 bg-warning/5 border border-warning/20 rounded-2xl"
      >
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          💡 Beginner Tip
        </h4>
        <p className="text-sm text-muted-foreground">
          Start small with ₹500/month SIP. You can increase it as you grow. 
          The magic of compounding works best with time, so start early!
        </p>
      </motion.div>
    </div>
  );
}
