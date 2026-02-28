export interface User {
  id: string;
  name: string;
  email: string;
  familyId: string;
  role: 'admin' | 'member';
  monthlyIncome: number;
  createdAt: Date;
  avatar?: string;
}

export interface Family {
  id: string;
  name: string;
  adminId: string;
  members: string[]; // user IDs
  createdAt: Date;
  currency: string;
}

export interface Transaction {
  id: string;
  userId: string;
  familyId: string;
  description: string;
  amount: number;
  category: 'income' | 'expense' | 'savings' | 'loan';
  type: 'income' | 'expense' | 'savings' | 'loan_payment' | 'loan_received';
  date: Date;
  paymentMethod?: string;
  status: 'pending' | 'completed';
  tags?: string[];
}

export interface SavingsJar {
  id: string;
  familyId: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
  deadline?: Date;
  createdAt: Date;
  contributors: {
    userId: string;
    amount: number;
  }[];
}

export interface Loan {
  id: string;
  familyId: string;
  lenderId: string;
  borrowerId: string;
  amount: number;
  description: string;
  createdAt: Date;
  dueDate?: Date;
  status: 'active' | 'paid' | 'overdue';
  installments?: {
    amount: number;
    dueDate: Date;
    paid: boolean;
  }[];
  notes?: string;
}

export interface FinancialHealth {
  userId: string;
  familyId: string;
  monthlyIncome: number;
  totalExpenses: number;
  totalSavings: number;
  savingsRate: number; // percentage
  healthScore: number; // 0-100
  status: 'excellent' | 'good' | 'warning' | 'alert';
  recommendations: string[];
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsJarsTotal: number;
  activeLoans: number;
  familyMembers: number;
}
