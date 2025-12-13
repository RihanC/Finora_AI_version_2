import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, PiggyBank, Target, TrendingUp } from 'lucide-react';
import mascotImage from '@/assets/finmate-mascot.png';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const categories = [
  { id: 'food', label: 'Food & Dining', icon: '🍔', selected: true },
  { id: 'transport', label: 'Transport', icon: '🚗', selected: false },
  { id: 'shopping', label: 'Shopping', icon: '🛍️', selected: true },
  { id: 'bills', label: 'Bills', icon: '📱', selected: true },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', selected: false },
  { id: 'health', label: 'Health', icon: '💊', selected: false },
];

const savingsGoals = [
  { id: 'emergency', label: 'Emergency Fund', icon: '🛡️' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'gadget', label: 'New Gadget', icon: '📱' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'investment', label: 'Investments', icon: '📈' },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['food', 'shopping', 'bills']);
  const [selectedGoal, setSelectedGoal] = useState('emergency');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  const steps = [
    // Welcome
    {
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-[hsl(260_60%_55%)] flex items-center justify-center mb-8 shadow-glow overflow-hidden p-1"
          >
            <img src={mascotImage} alt="FinMate mascot" className="w-full h-full object-cover rounded-full" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Welcome to FinMate!</h1>
          <p className="text-muted-foreground mb-8">
            Your AI-powered personal finance buddy. Let's make money management fun! 🎉
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-xp" />
            <span>Earn XP as you track your finances</span>
          </div>
        </motion.div>
      ),
    },
    // Name
    {
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto">
            <span className="text-4xl">👋</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">What should I call you?</h2>
          <p className="text-muted-foreground text-center mb-8">Let's personalize your experience</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-5 py-4 bg-card border-2 border-border rounded-2xl text-lg text-center placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </motion.div>
      ),
      canProceed: name.length >= 2,
    },
    // Income
    {
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center mb-6 mx-auto">
            <PiggyBank className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">Monthly Income</h2>
          <p className="text-muted-foreground text-center mb-8">This helps me give better suggestions</p>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">₹</span>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="35,000"
              className="w-full pl-10 pr-5 py-4 bg-card border-2 border-border rounded-2xl text-lg text-center placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Don't worry, this stays private! 🔒
          </p>
        </motion.div>
      ),
      canProceed: income.length > 0,
    },
    // Categories
    {
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 mx-auto">
            <Target className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">Track What Matters</h2>
          <p className="text-muted-foreground text-center mb-6">Select categories you spend on</p>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleCategory(cat.id)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  selectedCategories.includes(cat.id)
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border'
                }`}
              >
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <span className={`text-sm font-medium ${
                  selectedCategories.includes(cat.id) ? 'text-primary' : 'text-foreground'
                }`}>
                  {cat.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ),
      canProceed: selectedCategories.length > 0,
    },
    // Savings Goal
    {
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-[hsl(260_60%_55%)]/10 flex items-center justify-center mb-6 mx-auto">
            <TrendingUp className="w-10 h-10 text-[hsl(260_60%_55%)]" />
          </div>
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">Savings Goal</h2>
          <p className="text-muted-foreground text-center mb-6">What are you saving for?</p>
          <div className="space-y-3">
            {savingsGoals.map((goal) => (
              <motion.button
                key={goal.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedGoal(goal.id)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                  selectedGoal === goal.id
                    ? 'bg-[hsl(260_60%_55%)]/10 border-[hsl(260_60%_55%)]'
                    : 'bg-card border-border'
                }`}
              >
                <span className="text-2xl">{goal.icon}</span>
                <span className={`font-medium ${
                  selectedGoal === goal.id ? 'text-[hsl(260_60%_55%)]' : 'text-foreground'
                }`}>
                  {goal.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ),
    },
  ];

  const currentStep = steps[step];
  const canProceed = currentStep.canProceed !== undefined ? currentStep.canProceed : true;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="p-4 pt-8">
        <div className="flex gap-2 max-w-md mx-auto">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center py-8 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full"
          >
            {currentStep.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Button */}
      <div className="p-6 max-w-md mx-auto w-full">
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          variant="gradient"
          size="xl"
          className="w-full"
        >
          {step === steps.length - 1 ? (
            <>
              Let's Go! <Sparkles className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full mt-3 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}
