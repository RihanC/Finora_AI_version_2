import { Transaction, Budget, Badge, Challenge, User, ChatMessage, Group, Balance, Category } from '@/types/finance';

export const mockUser: User = {
  name: 'Arjun',
  xp: 2450,
  level: 12,
  streak: 7,
  monthlyIncome: 35000,
  savingsGoal: 8000,
  currency: 'INR',
  notificationsEnabled: true,
  theme: 'system',
};

export const mockTransactions: Transaction[] = [
  { id: '1', amount: 320, description: 'Pizza with friends', category: 'food', date: '2024-01-15', type: 'expense' },
  { id: '2', amount: 1500, description: 'Uber rides', category: 'transport', date: '2024-01-14', type: 'expense' },
  { id: '3', amount: 2800, description: 'New sneakers', category: 'shopping', date: '2024-01-13', type: 'expense' },
  { id: '4', amount: 450, description: 'Electricity bill', category: 'bills', date: '2024-01-12', type: 'expense' },
  { id: '5', amount: 800, description: 'Movie night', category: 'entertainment', date: '2024-01-11', type: 'expense' },
  { id: '6', amount: 200, description: 'Medicines', category: 'health', date: '2024-01-10', type: 'expense' },
  { id: '7', amount: 180, description: 'Coffee shop', category: 'food', date: '2024-01-10', type: 'expense' },
  { id: '8', amount: 650, description: 'Gym supplements', category: 'health', date: '2024-01-09', type: 'expense' },
];

export const mockBudgets: Budget[] = [
  { category: 'food', limit: 5000, spent: 3200 },
  { category: 'transport', limit: 3000, spent: 2100 },
  { category: 'shopping', limit: 4000, spent: 4500 },
  { category: 'bills', limit: 2000, spent: 1800 },
  { category: 'entertainment', limit: 2500, spent: 1200 },
  { category: 'health', limit: 1500, spent: 850 },
];

export const mockBadges: Badge[] = [
  { id: '1', name: 'First Step', description: 'Added your first expense', icon: '🎯', tier: 'bronze', earned: true, earnedDate: '2024-01-01' },
  { id: '2', name: 'Week Warrior', description: 'Maintained a 7-day streak', icon: '🔥', tier: 'silver', earned: true, earnedDate: '2024-01-08' },
  { id: '3', name: 'Budget Boss', description: 'Stayed under budget for a month', icon: '👑', tier: 'gold', earned: false },
  { id: '4', name: 'No-Spend Hero', description: 'Completed a no-spend day', icon: '🛡️', tier: 'bronze', earned: true, earnedDate: '2024-01-05' },
  { id: '5', name: 'Savings Star', description: 'Saved ₹5000 in a month', icon: '⭐', tier: 'silver', earned: false },
  { id: '6', name: 'Smart Spender', description: 'Reduced spending by 20%', icon: '🧠', tier: 'gold', earned: false },
];

export const mockChallenges: Challenge[] = [
  { id: '1', title: 'Save ₹100 today', description: 'Skip that extra coffee!', xpReward: 50, progress: 0, target: 100, completed: false, type: 'daily' },
  { id: '2', title: 'No ordering food', description: 'Cook at home for 24 hours', xpReward: 75, progress: 18, target: 24, completed: false, type: 'daily' },
  { id: '3', title: 'Track all expenses', description: 'Log every purchase this week', xpReward: 200, progress: 5, target: 7, completed: false, type: 'weekly' },
  { id: '4', title: 'Stay under ₹500', description: 'Daily spending limit challenge', xpReward: 100, progress: 1, target: 1, completed: true, type: 'daily' },
];

export const mockChatMessages: ChatMessage[] = [
  { id: '1', content: "Hey Arjun! 👋 I'm your FinMate buddy. Ready to crush your financial goals today?", sender: 'bot', timestamp: '10:00 AM', type: 'text' },
  { id: '2', content: "I spent ₹300 on pizza last night", sender: 'user', timestamp: '10:02 AM', type: 'text' },
  { id: '3', content: "Got it! 🍕 I've logged ₹300 under Food. That's 64% of your daily food budget. Want me to suggest some budget-friendly meal ideas?", sender: 'bot', timestamp: '10:02 AM', type: 'text' },
  { id: '4', content: "+15 XP for logging an expense! 🎉", sender: 'bot', timestamp: '10:02 AM', type: 'xp-notification', data: { xp: 15 } },
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Weekend Trip Gang',
    members: ['Arjun', 'Priya', 'Rahul', 'Sneha'],
    totalExpense: 12500,
    expenses: [
      { id: '1', description: 'Hotel booking', amount: 6000, paidBy: 'Arjun', splitBetween: ['Arjun', 'Priya', 'Rahul', 'Sneha'], date: '2024-01-10' },
      { id: '2', description: 'Lunch', amount: 2500, paidBy: 'Priya', splitBetween: ['Arjun', 'Priya', 'Rahul', 'Sneha'], date: '2024-01-10' },
      { id: '3', description: 'Cab fare', amount: 4000, paidBy: 'Rahul', splitBetween: ['Arjun', 'Priya', 'Rahul', 'Sneha'], date: '2024-01-11' },
    ],
  },
  {
    id: '2',
    name: 'Roommates',
    members: ['Arjun', 'Vikram'],
    totalExpense: 8500,
    expenses: [
      { id: '1', description: 'Electricity', amount: 2000, paidBy: 'Arjun', splitBetween: ['Arjun', 'Vikram'], date: '2024-01-05' },
      { id: '2', description: 'Internet', amount: 1500, paidBy: 'Vikram', splitBetween: ['Arjun', 'Vikram'], date: '2024-01-05' },
      { id: '3', description: 'Groceries', amount: 5000, paidBy: 'Arjun', splitBetween: ['Arjun', 'Vikram'], date: '2024-01-08' },
    ],
  },
];

export const calculateBalances = (group: Group): Balance[] => {
  const balances: { [key: string]: number } = {};

  group.members.forEach(member => {
    balances[member] = 0;
  });

  group.expenses.forEach(expense => {
    const share = expense.amount / expense.splitBetween.length;
    balances[expense.paidBy] += expense.amount;
    expense.splitBetween.forEach(member => {
      balances[member] -= share;
    });
  });

  const result: Balance[] = [];
  const debtors = Object.entries(balances).filter(([_, amount]) => amount < 0);
  const creditors = Object.entries(balances).filter(([_, amount]) => amount > 0);

  debtors.forEach(([debtor, debtAmount]) => {
    let remaining = Math.abs(debtAmount);
    creditors.forEach(([creditor, creditAmount]) => {
      if (remaining > 0 && creditAmount > 0) {
        const transfer = Math.min(remaining, creditAmount);
        if (transfer > 0) {
          result.push({ from: debtor, to: creditor, amount: Math.round(transfer) });
          remaining -= transfer;
        }
      }
    });
  });

  return result;
};

export const categoryIcons: Record<Category, string> = {
  food: '🍔',
  transport: '🚗',
  shopping: '🛍️',
  bills: '📱',
  entertainment: '🎬',
  health: '💊',
};

export const categoryColors: Record<Category, string> = {
  food: 'category-food',
  transport: 'category-transport',
  shopping: 'category-shopping',
  bills: 'category-bills',
  entertainment: 'category-entertainment',
  health: 'category-health',
};
