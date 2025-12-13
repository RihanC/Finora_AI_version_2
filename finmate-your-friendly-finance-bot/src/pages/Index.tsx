import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { ChatTab } from '@/components/tabs/ChatTab';
import { ExpensesTab } from '@/components/tabs/ExpensesTab';
import { BudgetTab } from '@/components/tabs/BudgetTab';
import { AnalyticsTab } from '@/components/tabs/AnalyticsTab';
import { SplitTab } from '@/components/tabs/SplitTab';
import { InvestTab } from '@/components/tabs/InvestTab';
import { FutureYouTab } from '@/components/tabs/FutureYouTab';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasOnboarded = localStorage.getItem('finmate-onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('finmate-onboarded', 'true');
    setShowOnboarding(false);
  };

  const handleNavigate = (tab: string) => {
    if (tab === 'future') {
      setActiveTab('future');
    } else {
      setActiveTab(tab);
    }
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatTab onNavigate={handleNavigate} />;
      case 'expenses':
        return <ExpensesTab />;
      case 'budget':
        return <BudgetTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'split':
        return <SplitTab />;
      case 'invest':
        return <InvestTab />;
      case 'future':
        return <FutureYouTab />;
      default:
        return <ChatTab onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
};

export default Index;
