import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search } from 'lucide-react';
import { TransactionCard } from '@/components/expense/TransactionCard';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/finance';
import { useFinance } from '@/context/FinanceContext';

const categories: (Category | 'all')[] = ['all', 'food', 'transport', 'shopping', 'bills', 'entertainment', 'health'];

export function ExpensesTab() {
  const { transactions } = useFinance();
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter(t => {
    const matchesCategory = filter === 'all' || t.category === filter;
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalSpent = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="px-4 py-4 pb-24">
      {/* Header Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 bg-gradient-to-br from-primary to-[hsl(210_80%_55%)] rounded-3xl mb-6"
      >
        <p className="text-primary-foreground/80 text-sm mb-1">Total Spent This Month</p>
        <h2 className="text-3xl font-bold text-primary-foreground mb-2">₹{totalSpent.toLocaleString()}</h2>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium text-primary-foreground">
            34% on Food
          </span>
          <span className="px-2.5 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium text-primary-foreground">
            8 transactions
          </span>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:bg-muted'
                }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction, index) => (
          <TransactionCard key={transaction.id} transaction={transaction} index={index} />
        ))}
      </div>

      {/* Chatbot suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(210_80%_55%)] flex items-center justify-center text-sm">
            🤖
          </div>
          <div>
            <p className="text-sm text-foreground font-medium">FinMate Tip</p>
            <p className="text-xs text-muted-foreground mt-1">
              You've spent ₹500 more on food compared to last week. Consider meal prepping to save money! 🥗
            </p>
          </div>
        </div>
      </motion.div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="fab"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </motion.button>
    </div>
  );
}
