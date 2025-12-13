export type Category = 'food' | 'transport' | 'shopping' | 'bills' | 'entertainment' | 'health';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string;
  type: 'expense' | 'income';
}

export interface Budget {
  category: Category;
  limit: number;
  spent: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold';
  earned: boolean;
  earnedDate?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
  type: 'daily' | 'weekly';
}

export interface User {
  name: string;
  xp: number;
  level: number;
  streak: number;
  monthlyIncome: number;
  savingsGoal: number;
  currency: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'future-you';
  timestamp: string;
  type?: 'text' | 'expense-card' | 'xp-notification' | 'summary-card' | 'action-prompt';
  data?: any;
}

export interface Group {
  id: string;
  name: string;
  members: string[];
  totalExpense: number;
  expenses: GroupExpense[];
}

export interface GroupExpense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: string;
}

export interface Balance {
  from: string;
  to: string;
  amount: number;
}
