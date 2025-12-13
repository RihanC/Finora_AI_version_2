import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowLeft, Receipt } from 'lucide-react';
import { GroupCard } from '@/components/split/GroupCard';
import { BalanceItem } from '@/components/split/BalanceItem';
import { calculateBalances } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useFinance } from '@/context/FinanceContext';
import { CreateGroupDialog } from '@/components/split/CreateGroupDialog';
import { AddExpenseDialog } from '@/components/split/AddExpenseDialog';

export function SplitTab() {
  const { groups, settleDebt } = useFinance();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  if (selectedGroup) {
    const balances = calculateBalances(selectedGroup);

    return (
      <div className="px-4 py-4 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <button
            onClick={() => setSelectedGroupId(null)}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-foreground">{selectedGroup.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedGroup.members.join(', ')}</p>
          </div>
        </motion.div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-gradient-to-br from-primary to-[hsl(210_80%_55%)] rounded-3xl mb-6"
        >
          <p className="text-primary-foreground/80 text-sm mb-1">Total Group Expense</p>
          <h2 className="text-3xl font-bold text-primary-foreground">
            ₹{selectedGroup.totalExpense.toLocaleString()}
          </h2>
        </motion.div>

        {/* Balances */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-3">Who Owes Whom</h3>
          <div className="space-y-2">
            {balances.length > 0 ? (
              balances.map((balance, index) => (
                <BalanceItem
                  key={`${balance.from}-${balance.to}`}
                  balance={balance}
                  index={index}
                  onSettle={() => settleDebt(selectedGroup.id, balance.from, balance.to, balance.amount)}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                All settled up! 🎉
              </p>
            )}
          </div>
        </div>

        {/* Expenses List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Expenses</h3>
            <AddExpenseDialog group={selectedGroup}>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </AddExpenseDialog>
          </div>
          <div className="space-y-3">
            {selectedGroup.expenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-card rounded-2xl border border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{expense.description}</h4>
                      <p className="text-xs text-muted-foreground">
                        Paid by {expense.paidBy} • {expense.date}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground">₹{expense.amount}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-foreground mb-1">Split Bills</h2>
        <p className="text-sm text-muted-foreground">Manage group expenses easily</p>
      </motion.div>

      {/* Groups */}
      <div className="space-y-4">
        {groups.map((group, index) => (
          <GroupCard
            key={group.id}
            group={group}
            index={index}
            onClick={() => setSelectedGroupId(group.id)}
          />
        ))}
      </div>

      {/* Create Group Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <CreateGroupDialog>
          <Button variant="outline" className="w-full py-6 border-dashed border-2">
            <Plus className="w-5 h-5 mr-2" />
            Create New Group
          </Button>
        </CreateGroupDialog>
      </motion.div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="fab"
      >
        <CreateGroupDialog>
          <div className='w-full h-full flex items-center justify-center'>
            <Plus className="w-6 h-6 text-primary-foreground" />
          </div>
        </CreateGroupDialog>
      </motion.button>
    </div>
  );
}
