import { FinancialHealth } from '@/types';

/**
 * Formata um valor monetário para o padrão brasileiro
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Calcula o score de saúde financeira
 */
export const calculateHealthScore = (
  monthlyIncome: number,
  totalExpenses: number,
  totalSavings: number
): { score: number; status: 'excellent' | 'good' | 'warning' | 'alert' } => {
  if (monthlyIncome === 0) return { score: 0, status: 'alert' };

  const savingsRate = (totalSavings / monthlyIncome) * 100;
  const expenseRatio = (totalExpenses / monthlyIncome) * 100;

  let score = 50; // Base score

  // Savings rate contributes 30 points
  if (savingsRate >= 20) score += 30;
  else if (savingsRate >= 15) score += 25;
  else if (savingsRate >= 10) score += 20;
  else if (savingsRate >= 5) score += 10;

  // Expense ratio contributes 20 points
  if (expenseRatio <= 50) score += 20;
  else if (expenseRatio <= 70) score += 10;
  else if (expenseRatio <= 90) score += 5;
  else score -= 20;

  // Balance contributes 20 points
  const balance = monthlyIncome - totalExpenses;
  if (balance > 0) score += 20;
  else if (balance > -monthlyIncome * 0.2) score += 10;

  score = Math.min(100, Math.max(0, score));

  let status: 'excellent' | 'good' | 'warning' | 'alert' = 'good';
  if (score >= 80) status = 'excellent';
  else if (score >= 60) status = 'good';
  else if (score >= 40) status = 'warning';
  else status = 'alert';

  return { score: Math.round(score), status };
};

/**
 * Gera recomendações baseadas na saúde financeira
 */
export const generateRecommendations = (health: {
  monthlyIncome: number;
  totalExpenses: number;
  totalSavings: number;
  status: string;
}): string[] => {
  const recommendations: string[] = [];
  const savingsRate = (health.totalSavings / health.monthlyIncome) * 100;
  const expenseRatio = (health.totalExpenses / health.monthlyIncome) * 100;

  if (savingsRate < 10) {
    recommendations.push('Aumente sua taxa de poupança para pelo menos 10-15%');
  }

  if (expenseRatio > 80) {
    recommendations.push('Reduza suas despesas discricionárias');
    recommendations.push('Revise assinaturas e serviços recorrentes');
  }

  if (health.totalSavings < health.monthlyIncome * 3) {
    recommendations.push('Crie um fundo de emergência com 3-6 meses de despesas');
  }

  if (health.totalExpenses > health.monthlyIncome) {
    recommendations.push('Suas despesas excedem sua renda - procure ajuda profissional');
  }

  if (savingsRate >= 20) {
    recommendations.push('Continue mantendo sua disciplina de poupança');
    recommendations.push('Considere aumentar seu aporte em investimentos');
  }

  return recommendations;
};

/**
 * Calcula a diferença entre datas em dias
 */
export const daysBetween = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};

/**
 * Formata uma data para padrão brasileiro
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

/**
 * Formata uma data completa com hora
 */
export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Detecta se a data está vencida
 */
export const isOverdue = (dueDate: Date): boolean => {
  return new Date() > dueDate;
};

/**
 * Agrupa transações por mês
 */
export const groupByMonth = (transactions: any[]): Record<string, any[]> => {
  return transactions.reduce((grouped, transaction) => {
    const monthKey = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
    }).format(transaction.date);

    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }

    grouped[monthKey].push(transaction);
    return grouped;
  }, {});
};

/**
 * Calcula estatísticas de transações
 */
export const calculateTransactionStats = (transactions: any[]) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome: income,
    totalExpenses: expenses,
    balance: income - expenses,
    transactionCount: transactions.length,
  };
};

/**
 * Valida um email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Gera um ID único
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce para funções
 */
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle para funções
 */
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;

  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
