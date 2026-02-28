import React, { useState } from 'react';
import { Card, Skeleton } from '@/components/common';
import { Filter, Download, Plus, Trash2 } from 'lucide-react';
import { Transaction } from '@/types';

export const FluxoCaixa: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      userId: 'user1',
      familyId: 'family1',
      description: 'Salário Principal',
      amount: 5000,
      category: 'income',
      type: 'income',
      date: new Date(2024, 1, 1),
      status: 'completed',
    },
    {
      id: '2',
      userId: 'user2',
      familyId: 'family1',
      description: 'Salário Secundário',
      amount: 3500,
      category: 'income',
      type: 'income',
      date: new Date(2024, 1, 1),
      status: 'completed',
    },
    {
      id: '3',
      userId: 'user1',
      familyId: 'family1',
      description: 'Aluguel',
      amount: 1500,
      category: 'expense',
      type: 'expense',
      date: new Date(2024, 1, 5),
      status: 'completed',
      paymentMethod: 'Transferência',
    },
    {
      id: '4',
      userId: 'user1',
      familyId: 'family1',
      description: 'Supermercado',
      amount: 450.80,
      category: 'expense',
      type: 'expense',
      date: new Date(2024, 1, 6),
      status: 'completed',
      paymentMethod: 'Cartão',
    },
  ]);

  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [showForm, setShowForm] = useState(false);

  const filteredTransactions =
    filterType === 'all'
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      income: 'text-green-600 bg-green-50',
      expense: 'text-red-600 bg-red-50',
      savings: 'text-blue-600 bg-blue-50',
      loan: 'text-orange-600 bg-orange-50',
    };
    return colors[category] || 'text-gray-600 bg-gray-50';
  };

  const getCategoryIcon = (type: string) => {
    const icons: Record<string, string> = {
      income: '💵',
      expense: '💸',
      savings: '💾',
      loan: '💳',
    };
    return icons[type] || '📊';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fluxo de Caixa</h1>
          <p className="text-gray-600 mt-1">Controle de receitas e despesas da família</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          <span>Nova Transação</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600">Total Receitas</p>
          <p className="text-2xl font-bold text-green-600 mt-1">R$ {totalIncome.toFixed(2)}</p>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <p className="text-sm text-gray-600">Total Despesas</p>
          <p className="text-2xl font-bold text-red-600 mt-1">R$ {totalExpenses.toFixed(2)}</p>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600">Saldo</p>
          <p className={`text-2xl font-bold mt-1 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            R$ {balance.toFixed(2)}
          </p>
        </Card>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <Card title="Nova Transação">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Descrição"
                className="input-base"
              />
              <input
                type="number"
                placeholder="Valor"
                className="input-base"
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select className="input-base">
                <option>Receita</option>
                <option>Despesa</option>
                <option>Poupança</option>
              </select>
              <select className="input-base">
                <option>Selecione um membro</option>
                <option>João</option>
                <option>Maria</option>
                <option>Pedro</option>
              </select>
            </div>
            <input
              type="date"
              className="input-base w-full sm:w-1/2"
            />
            <div className="flex gap-3">
              <button className="btn-primary">Adicionar</button>
              <button
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterType === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilterType('income')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterType === 'income'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Receitas
        </button>
        <button
          onClick={() => setFilterType('expense')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterType === 'expense'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Despesas
        </button>
      </div>

      {/* Transactions List */}
      <Card title={`Transações (${filteredTransactions.length})`}>
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-lg text-lg ${getCategoryColor(transaction.type)}`}>
                    {getCategoryIcon(transaction.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-600">
                      {transaction.date.toLocaleDateString('pt-BR', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold text-lg ${
                      transaction.type === 'income'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    R$ {transaction.amount.toFixed(2)}
                  </p>
                  <button className="text-red-600 hover:text-red-700 mt-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 py-8">Nenhuma transação encontrada</p>
          )}
        </div>
      </Card>

      {/* Export Button */}
      <div className="flex items-center justify-center">
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <Download size={20} />
          Exportar Relatório (CSV)
        </button>
      </div>
    </div>
  );
};
