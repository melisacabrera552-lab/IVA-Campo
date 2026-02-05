import React, { createContext, useContext, useState, useEffect, ReactNode, PropsWithChildren } from 'react';
import { api } from '../services/api';

export type TransactionType = 'sale' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  iva: number;
  date: Date;
  icon: string;
}

interface AppContextType {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id' | 'date'>) => Promise<void>;
  totals: {
    ivaSales: number;
    ivaExpenses: number;
    balance: number;
  };
  alertsCount: number;
  resolveAlert: () => void;
  formatCurrency: (val: number) => string;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [alertsCount, setAlertsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from Backend (API) on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [txs, alerts] = await Promise.all([
          api.transactions.list(),
          api.alerts.getCount()
        ]);
        setTransactions(txs);
        setAlertsCount(alerts);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const addTransaction = async (t: Omit<Transaction, 'id' | 'date'>) => {
    // Optimistic UI update could be done here, but we'll wait for server for safety
    try {
      const newTxData = {
        ...t,
        date: new Date()
      };
      
      const createdTx = await api.transactions.create(newTxData);
      setTransactions(prev => [createdTx, ...prev]);
    } catch (e) {
      console.error("Error saving transaction", e);
    }
  };

  const resolveAlert = async () => {
    // Optimistic update
    setAlertsCount(prev => Math.max(0, prev - 1));
    // Sync with backend
    try {
      await api.alerts.resolve();
    } catch (e) {
      console.error("Error resolving alert", e);
    }
  };

  const totals = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'sale') {
        acc.ivaSales += curr.iva;
      } else {
        acc.ivaExpenses += curr.iva;
      }
      return acc;
    },
    { ivaSales: 0, ivaExpenses: 0 }
  );

  const balance = totals.ivaExpenses - totals.ivaSales; // Positive means Credit (Favor), Negative means Debt (Pagar)

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <AppContext.Provider value={{ 
      transactions, 
      addTransaction, 
      totals: { ...totals, balance }, 
      alertsCount, 
      resolveAlert,
      formatCurrency,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};