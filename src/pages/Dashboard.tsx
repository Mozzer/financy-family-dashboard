import React, { useState, useEffect } from 'react';
import { Card, Loading } from '@/components/common';
import { TrendingUp, TrendingDown, Plus, Eye, EyeOff } from 'lucide-react';
import { DashboardStats } from '@/types';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    // Simulate loading stats from Firebase
    setTimeout(() => {
      setStats({
        totalIncome: 12500.00,
        totalExpenses: 8300.00,
        balance: 4200.00,
        savingsJarsTotal: 2100.00,
        activeLoans: 2,
        familyMembers: 4,
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <Loading />;

  const StatCard: React.FC<{
    label: string;
    value: number;
    type: 'income' | 'expense' | 'default';
    icon: React.ReactNode;
  }> = ({ label, value, type, icon }) => {
    const colors = {
      income: 'bg-green-50 border-green-200 text-green-700',
      expense: 'bg-red-50 border-red-200 text-red-700',
      default: 'bg-blue-50 border-blue-200 text-blue-700',
    };

    return (
      <Card className={`${colors[type]} border-2`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
            <p className="text-2xl font-bold">
              {showBalance ? `R$ ${value.toFixed(2)}` : '••••••'}
            </p>
          </div>
          <div className="p-2 bg-white rounded-lg opacity-60">{icon}</div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header with toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bem-vindo ao MR Family Legacy</p>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
          {showBalance ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Receita do Mês"
          value={stats!.totalIncome}
          type="income"
          icon={<TrendingUp className="text-green-600" size={24} />}
        />
        <StatCard
          label="Despesas do Mês"
          value={stats!.totalExpenses}
          type="expense"
          icon={<TrendingDown className="text-red-600" size={24} />}
        />
        <StatCard
          label="Saldo Disponível"
          value={stats!.balance}
          type="default"
          icon={<Plus className="text-blue-600" size={24} />}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Cofrinhos Ativos" className="text-center">
          <p className="text-3xl font-bold text-primary-600">
            {showBalance ? `R$ ${stats!.savingsJarsTotal.toFixed(2)}` : '••••••'}
          </p>
          <p className="text-sm text-gray-600 mt-2">Total acumulado</p>
          <button className="mt-4 btn-secondary w-full">Ver Cofrinhos</button>
        </Card>

        <Card title="Membros da Família" className="text-center">
          <p className="text-3xl font-bold text-primary-600">{stats!.familyMembers}</p>
          <p className="text-sm text-gray-600 mt-2">Pessoas ativas</p>
          <button className="mt-4 btn-secondary w-full">Gerenciar</button>
        </Card>

        <Card title="Empréstimos Ativos" className="text-center">
          <p className="text-3xl font-bold text-orange-600">{stats!.activeLoans}</p>
          <p className="text-sm text-gray-600 mt-2">Transações pendentes</p>
          <button className="mt-4 btn-secondary w-full">Ver Detalhes</button>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card title="Transações Recentes">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div>
                <p className="font-medium text-gray-900">Transação {i}</p>
                <p className="text-sm text-gray-600">Há {i} dias</p>
              </div>
              <p className="font-bold text-gray-900">
                {i % 2 === 0 ? '-' : '+'}R$ {(Math.random() * 1000).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-primary-600 font-medium hover:text-primary-700">
          Ver Todas as Transações →
        </button>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
          <p className="text-xl mb-1">➕</p>
          <p className="text-sm font-medium">Nova Despesa</p>
        </button>
        <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
          <p className="text-xl mb-1">💵</p>
          <p className="text-sm font-medium">Nova Receita</p>
        </button>
        <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
          <p className="text-xl mb-1">🏺</p>
          <p className="text-sm font-medium">Novo Cofrinho</p>
        </button>
        <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
          <p className="text-xl mb-1">🤝</p>
          <p className="text-sm font-medium">Novo Empréstimo</p>
        </button>
      </div>
    </div>
  );
};
