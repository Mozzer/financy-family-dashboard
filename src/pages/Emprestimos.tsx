import React, { useState } from 'react';
import { Card, EmptyState } from '@/components/common';
import { Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Loan } from '@/types';

export const Emprestimos: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: '1',
      familyId: 'family1',
      lenderId: 'user1',
      borrowerId: 'user2',
      amount: 2000,
      description: 'Empréstimo para reformas',
      createdAt: new Date(2024, 0, 15),
      dueDate: new Date(2024, 3, 15),
      status: 'active',
      notes: 'Sem juros',
    },
    {
      id: '2',
      familyId: 'family1',
      lenderId: 'user2',
      borrowerId: 'user3',
      amount: 1500,
      description: 'Empréstimo de emergência',
      createdAt: new Date(2024, 0, 20),
      status: 'active',
      notes: 'Taxa de 5% ao mês',
    },
    {
      id: '3',
      familyId: 'family1',
      lenderId: 'user1',
      borrowerId: 'user4',
      amount: 5000,
      description: 'Empréstimo para educação',
      createdAt: new Date(2023, 10, 1),
      dueDate: new Date(2024, 9, 1),
      status: 'paid',
      notes: 'Parcelado em 12x',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paid' | 'overdue'>('all');

  const filteredLoans =
    filterStatus === 'all'
      ? loans
      : loans.filter((l) => l.status === filterStatus);

  const totalActive = loans
    .filter((l) => l.status === 'active')
    .reduce((sum, l) => sum + l.amount, 0);

  const totalPaid = loans
    .filter((l) => l.status === 'paid')
    .reduce((sum, l) => sum + l.amount, 0);

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
      active: {
        bg: 'bg-yellow-50 border-yellow-200',
        text: 'text-yellow-700',
        icon: <Clock className="text-yellow-600" size={20} />,
      },
      paid: {
        bg: 'bg-green-50 border-green-200',
        text: 'text-green-700',
        icon: <CheckCircle className="text-green-600" size={20} />,
      },
      overdue: {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-700',
        icon: <AlertCircle className="text-red-600" size={20} />,
      },
    };
    return colors[status] || colors['active'];
  };

  const LoanCard: React.FC<{ loan: Loan }> = ({ loan }) => {
    const statusColor = getStatusColor(loan.status);
    const isOverdue = loan.dueDate && new Date() > loan.dueDate && loan.status === 'active';

    return (
      <Card className={`border-2 ${statusColor.bg}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-white rounded-lg">
              {isOverdue ? <AlertCircle className="text-red-600" size={24} /> : statusColor.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{loan.description}</h3>
              <p className="text-sm text-gray-600">
                {loan.status === 'active' ? 'Credor: ' : 'De: '}
                Membro {loan.lenderId === 'user1' ? 'João' : 'Maria'}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor.text} bg-white border`}>
            {loan.status === 'active' ? 'Ativo' : 'Pago'}
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Valor</p>
            <p className="text-2xl font-bold text-gray-900">R$ {loan.amount.toFixed(2)}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Data</p>
              <p className="text-sm font-medium">
                {loan.createdAt.toLocaleDateString('pt-BR')}
              </p>
            </div>
            {loan.dueDate && (
              <div className="p-3 bg-white rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Vencimento</p>
                <p className="text-sm font-medium">
                  {loan.dueDate.toLocaleDateString('pt-BR')}
                </p>
              </div>
            )}
          </div>

          {loan.notes && (
            <div className="p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Observações</p>
              <p className="text-sm">{loan.notes}</p>
            </div>
          )}

          {loan.status === 'active' && (
            <button className="w-full btn-primary text-sm py-2">
              Registrar Pagamento
            </button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Empréstimos</h1>
          <p className="text-gray-600 mt-1">Gestão de empréstimos entre membros da família</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          <span>Novo Empréstimo</span>
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <p className="text-sm text-gray-600">Empréstimos Ativos</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            R$ {totalActive.toFixed(2)}
          </p>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600">Empréstimos Pagos</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            R$ {totalPaid.toFixed(2)}
          </p>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600">Total de Transações</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{loans.length}</p>
        </Card>
      </div>

      {/* Create New Loan Form */}
      {showForm && (
        <Card title="Novo Empréstimo">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select className="input-base">
                <option>Quem está emprestando?</option>
                <option>João</option>
                <option>Maria</option>
                <option>Pedro</option>
              </select>
              <select className="input-base">
                <option>Quem está pegando emprestado?</option>
                <option>João</option>
                <option>Maria</option>
                <option>Pedro</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Valor (R$)"
                className="input-base"
                step="0.01"
              />
              <input
                type="text"
                placeholder="Descrição"
                className="input-base"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                placeholder="Data do empréstimo"
                className="input-base"
              />
              <input
                type="date"
                placeholder="Data de vencimento (opcional)"
                className="input-base"
              />
            </div>
            <textarea
              placeholder="Observações (juros, condições, etc.)"
              className="input-base"
              rows={2}
            />
            <div className="flex gap-3">
              <button className="btn-primary">Registrar Empréstimo</button>
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
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterStatus === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterStatus === 'active'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Ativos
        </button>
        <button
          onClick={() => setFilterStatus('paid')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filterStatus === 'paid'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Pagos
        </button>
      </div>

      {/* Loans Grid */}
      {filteredLoans.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLoans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Clock className="w-16 h-16" />}
          title="Nenhum empréstimo encontrado"
          description="Registre empréstimos entre membros da família"
          action={{
            label: 'Registrar Empréstimo',
            onClick: () => setShowForm(true),
          }}
        />
      )}
    </div>
  );
};
