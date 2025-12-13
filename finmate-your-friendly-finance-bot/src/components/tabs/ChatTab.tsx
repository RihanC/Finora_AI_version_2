import { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Smile } from 'lucide-react';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { QuickActions } from '@/components/chat/QuickActions';
import { mockChatMessages } from '@/data/mockData';
import { ChatMessage } from '@/types/finance';
import { Button } from '@/components/ui/button';

import { useFinance } from '@/context/FinanceContext';

interface ChatTabProps {
  onNavigate: (tab: string) => void;
}

export function ChatTab({ onNavigate }: ChatTabProps) {
  const { addTransaction, user, budgets, transactions } = useFinance();
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
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

    try {
      const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are Finmate, a friendly and helpful AI finance assistant. You help users manage their budget, track expenses, and provide financial tips. 
            
            Current User Context:
            - Name: ${user.name}
            - Monthly Income: ${user.monthlyIncome}
            - Savings Goal: ${user.savingsGoal}
            - Current Budgets: ${JSON.stringify(budgets.map(b => ({ category: b.category, limit: b.limit, spent: b.spent })))}
            - Recent Transactions: ${JSON.stringify(transactions.slice(0, 5).map(t => ({ amount: t.amount, category: t.category, description: t.description })))}

            When the user wants to add an expense, you must collect the following information:
            1. Amount (number)
            2. Category (one of: food, transport, shopping, bills, entertainment, health)
            3. Description (short text)

            If any information is missing, ask the user for it.
            
            Once you have all the information, you MUST output a JSON object in the following format ONLY, with no other text:
            {
              "action": "add_expense",
              "data": {
                "amount": <number>,
                "category": "<category>",
                "description": "<description>"
              },
              "response": "<A friendly confirmation message>"
            }

            For normal chat, just reply with text. Keep your responses concise, encouraging, and emoji-friendly. Use the context provided to give personalized advice.`
          },
          ...messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content
          }) as any),
          {
            role: "user",
            content: input,
          }
        ],
        model: "llama-3.1-8b-instant",
        response_format: { type: "json_object" }
      });

      const content = chatCompletion.choices[0]?.message?.content || "";
      let botResponseContent = content;

      try {
        const parsed = JSON.parse(content);
        if (parsed.action === 'add_expense') {
          addTransaction({
            amount: parsed.data.amount,
            category: parsed.data.category,
            description: parsed.data.description,
            date: new Date().toISOString().split('T')[0],
            type: 'expense'
          });
          botResponseContent = parsed.response;
        } else if (parsed.response) {
          botResponseContent = parsed.response;
        }
      } catch (e) {
        // Not JSON or not an action, treat as normal text
      }

      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponseContent,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please check your API key and connection.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-expense':
        setInput('I want to add an expense');
        break;
      case 'budget-tips':
        setInput('Give me budget tips');
        break;
      case 'future-you':
        onNavigate('future');
        break;
      case 'show-graphs':
        onNavigate('analytics');
        break;
      case 'split-bill':
        onNavigate('split');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-center"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(210_80%_55%)] flex items-center justify-center text-sm">
              🤖
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3 border-t border-border bg-card/50">
        <QuickActions onAction={handleQuickAction} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex items-center gap-2">
          <button className="p-2.5 hover:bg-muted rounded-xl transition-colors">
            <Smile className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-muted rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button className="p-2.5 hover:bg-muted rounded-xl transition-colors">
            <Mic className="w-5 h-5 text-muted-foreground" />
          </button>
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            size="icon"
            className="rounded-xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
