import { Transaction } from '../context/AppContext';

const DB_KEY = 'iva_campo_db_v1';

// Initial seed data to populate the app if empty
const SEED_DATA = {
  transactions: [
    {
      id: 'seed-1',
      type: 'sale',
      category: 'Venta de Soja',
      amount: 450000,
      iva: 47250,
      date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), // Stored as string
      icon: '🌾'
    },
    {
      id: 'seed-2',
      type: 'expense',
      category: 'Fertilizantes',
      amount: 120000,
      iva: 25200,
      date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
      icon: '🌱'
    }
  ],
  alertsCount: 3
};

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get DB
const getDB = () => {
  const dbStr = localStorage.getItem(DB_KEY);
  if (!dbStr) {
    localStorage.setItem(DB_KEY, JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  return JSON.parse(dbStr);
};

// Helper to save DB
const saveDB = (data: any) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

export const api = {
  transactions: {
    list: async (): Promise<Transaction[]> => {
      await delay(300); // Simulate network
      const db = getDB();
      // Convert date strings back to Date objects
      return db.transactions.map((t: any) => ({
        ...t,
        date: new Date(t.date)
      }));
    },
    create: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
      await delay(300);
      const db = getDB();
      const newTx = {
        ...transaction,
        id: Math.random().toString(36).substr(2, 9),
        date: transaction.date.toISOString() // Store as ISO string
      };
      
      db.transactions.unshift(newTx);
      saveDB(db);
      
      return { ...newTx, date: transaction.date };
    }
  },
  alerts: {
    getCount: async (): Promise<number> => {
      await delay(200);
      const db = getDB();
      return db.alertsCount || 0;
    },
    resolve: async (): Promise<number> => {
      await delay(200);
      const db = getDB();
      const newCount = Math.max(0, (db.alertsCount || 0) - 1);
      db.alertsCount = newCount;
      saveDB(db);
      return newCount;
    }
  }
};