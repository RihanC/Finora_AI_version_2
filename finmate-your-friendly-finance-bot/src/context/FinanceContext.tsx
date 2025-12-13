import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Budget, Badge, Challenge, User, Group, Category, GroupExpense } from '@/types/finance';
import {
    mockUser,
    mockTransactions,
    mockBudgets,
    mockBadges,
    mockChallenges,
    mockGroups
} from '@/data/mockData';

interface FinanceContextType {
    user: User;
    transactions: Transaction[];
    budgets: Budget[];
    badges: Badge[];
    challenges: Challenge[];
    groups: Group[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateUser: (updates: Partial<User>) => void;
    updateBudget: (category: Category, amount: number) => void;
    joinChallenge: (challengeId: string) => void;
    completeChallenge: (challengeId: string) => void;
    createGroup: (name: string, members: string[]) => void;
    addGroupExpense: (groupId: string, expense: Omit<GroupExpense, 'id'>) => void;
    settleDebt: (groupId: string, from: string, to: string, amount: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
    // Initialize state from localStorage or mock data
    const [user, setUser] = useState<User>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : mockUser;
    });

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : mockTransactions;
    });

    const [budgets, setBudgets] = useState<Budget[]>(() => {
        const saved = localStorage.getItem('budgets');
        return saved ? JSON.parse(saved) : mockBudgets;
    });

    const [badges, setBadges] = useState<Badge[]>(() => {
        const saved = localStorage.getItem('badges');
        return saved ? JSON.parse(saved) : mockBadges;
    });

    const [challenges, setChallenges] = useState<Challenge[]>(() => {
        const saved = localStorage.getItem('challenges');
        return saved ? JSON.parse(saved) : mockChallenges;
    });

    const [groups, setGroups] = useState<Group[]>(() => {
        const saved = localStorage.getItem('groups');
        return saved ? JSON.parse(saved) : mockGroups;
    });

    // Handle Theme Change
    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (user.theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(user.theme);
    }, [user.theme]);

    // Persist to localStorage whenever state changes
    useEffect(() => { localStorage.setItem('user', JSON.stringify(user)); }, [user]);
    useEffect(() => { localStorage.setItem('transactions', JSON.stringify(transactions)); }, [transactions]);
    useEffect(() => { localStorage.setItem('budgets', JSON.stringify(budgets)); }, [budgets]);
    useEffect(() => { localStorage.setItem('badges', JSON.stringify(badges)); }, [badges]);
    useEffect(() => { localStorage.setItem('challenges', JSON.stringify(challenges)); }, [challenges]);
    useEffect(() => { localStorage.setItem('groups', JSON.stringify(groups)); }, [groups]);

    // Actions
    const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
        const transaction: Transaction = {
            ...newTransaction,
            id: Date.now().toString(),
        };
        setTransactions(prev => [transaction, ...prev]);

        // Update budget spent
        setBudgets(prev => prev.map(b =>
            b.category === newTransaction.category
                ? { ...b, spent: b.spent + newTransaction.amount }
                : b
        ));

        // Update user XP (simple rule: 10 XP per transaction)
        setUser(prev => ({ ...prev, xp: prev.xp + 10 }));
    };

    const updateUser = (updates: Partial<User>) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const updateBudget = (category: Category, amount: number) => {
        setBudgets(prev => prev.map(b =>
            b.category === category ? { ...b, limit: amount } : b
        ));
    };

    const joinChallenge = (challengeId: string) => {
        // Logic to join challenge (if needed)
    };

    const completeChallenge = (challengeId: string) => {
        setChallenges(prev => prev.map(c =>
            c.id === challengeId ? { ...c, completed: true } : c
        ));
        // Award XP
        const challenge = challenges.find(c => c.id === challengeId);
        if (challenge) {
            setUser(prev => ({ ...prev, xp: prev.xp + challenge.xpReward }));
        }
    };

    const createGroup = (name: string, members: string[]) => {
        const newGroup: Group = {
            id: Date.now().toString(),
            name,
            members,
            totalExpense: 0,
            expenses: []
        };
        setGroups(prev => [...prev, newGroup]);
    };

    const addGroupExpense = (groupId: string, expense: Omit<GroupExpense, 'id'>) => {
        const newExpense: GroupExpense = {
            ...expense,
            id: Date.now().toString(),
        };

        setGroups(prev => prev.map(g => {
            if (g.id !== groupId) return g;

            return {
                ...g,
                totalExpense: g.totalExpense + newExpense.amount,
                expenses: [...g.expenses, newExpense]
            };
        }));
    };

    const settleDebt = (groupId: string, from: string, to: string, amount: number) => {
        // "from" pays "to" "amount".
        // Modeled as: PaidBy "from", SplitBetween ["to"].
        // This means "from" paid, and "to" received the value (consumed it).
        const settlementExpense: Omit<GroupExpense, 'id'> = {
            description: `Settlement: ${from} paid ${to}`,
            amount: amount,
            paidBy: from,
            splitBetween: [to],
            date: new Date().toISOString().split('T')[0]
        };
        addGroupExpense(groupId, settlementExpense);
    };

    return (
        <FinanceContext.Provider value={{
            user,
            transactions,
            budgets,
            badges,
            challenges,
            groups,
            addTransaction,
            updateUser,
            updateBudget,
            joinChallenge,
            completeChallenge,
            createGroup,
            addGroupExpense,
            settleDebt
        }}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (context === undefined) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
}
