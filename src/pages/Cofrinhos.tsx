import React, { useState } from 'react';
import { Card, EmptyState } from '@/components/common';
import { Plus, Edit2, Trash2, TrendingUp } from 'lucide-react';
import { SavingsJar } from '@/types';

export const Cofrinhos: React.FC = () => {
  const [jars, setJars] = useState<SavingsJar[]>([
    {
      id: '1',
      familyId: 'family1',
      name: 'Férias 2024',
      description: 'Poupança para as férias da família',
      targetAmount: 5000,
      currentAmount: 2500,
      icon: '✈️',
      color: 'bg-blue-100 border-blue-300',
      deadline: new Date(2024, 7, 31),
      createdAt: new Date(2024, 1, 1),
      contributors: [
        { userId: 'user1', amount: 1200 },
        { userId: 'user2', amount: 1300 },
      ],
    },
    {
      id: '2',
      familyId: 'family1',
      name: 'Carro Novo',
      description: 'Fundo para compra de novo veículo',
      targetAmount: 25000,
      currentAmount: 8500,
      icon: '🚗',
      color: 'bg-red-100 border-red-300',
      createdAt: new Date(2024, 0, 15),
      contributors: [
        { userId: 'user1', amount: 5000 },
        { userId: 'user2', amount: 3500 },
      ],
    },
    {
      id: '3',
      familyId: 'family1',
      name: 'Reforma da Casa',
      description: 'Reforma e renovação do imóvel',
      targetAmount: 15000,
      currentAmount: 4200,
      icon: '🏠',
      color: 'bg-amber-100 border-amber-300',
      createdAt: new Date(2024, 1, 1),
      contributors: [
        { userId: 'user1', amount: 2000 },
        { userId: 'user2', amount: 2200 },
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const totalSavings = jars.reduce((sum, jar) => sum + jar.currentAmount, 0);
  const totalTarget = jars.reduce((sum, jar) => sum + jar.targetAmount, 0);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const JarCard: React.FC<{ jar: SavingsJar }> = ({ jar }) => {
    const progress = getProgressPercentage(jar.currentAmount, jar.targetAmount);

    return (
      <Card className="hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`text-3xl p-3 rounded-lg ${jar.color} border`}>
              {jar.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg">{jar.name}</h3>
              <p className="text-sm text-gray-600">{jar.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
              <Edit2 size={18} />
            </button>
            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">R$ {jar.currentAmount.toFixed(2)}</span>
            <span className="text-gray-600">
              de R$ {jar.targetAmount.toFixed(2)} ({progress.toFixed(0)}%)
            </span>
          </div>
        </div>

        {/* Contributors */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-600 mb-2">CONTRIBUINTES</p>
          <div className="space-y-1">
            {jar.contributors.map((contributor, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="text-gray-700">Membro {contributor.userId}</span>
                <span className="font-medium">R$ {contributor.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 btn-primary text-sm py-2">
            Adicionar Valor
          </button>
          {jar.deadline && (
            <span className="text-xs text-gray-600 py-2 px-3 bg-gray-100 rounded-lg">
              Prazo: {jar.deadline.toLocaleDateString('pt-BR')}
            </span>
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
          <h1 className="text-3xl font-bold text-gray-900">Cofrinhos</h1>
          <p className="text-gray-600 mt-1">Metas de poupança familiar</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          <span>Novo Cofrinho</span>
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <p className="text-sm text-gray-600">Total Poupado</p>
          <p className="text-2xl font-bold text-green-600 mt-1">R$ {totalSavings.toFixed(2)}</p>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <p className="text-sm text-gray-600">Target Total</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">R$ {totalTarget.toFixed(2)}</p>
        </Card>
      </div>

      {/* Create New Jar Form */}
      {showForm && (
        <Card title="Novo Cofrinho">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome do Cofrinho"
                className="input-base"
              />
              <input
                type="number"
                placeholder="Meta (R$)"
                className="input-base"
                step="0.01"
              />
            </div>
            <textarea
              placeholder="Descrição da meta"
              className="input-base"
              rows={2}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select className="input-base">
                <option>Selecione um ícone</option>
                <option>✈️ Férias</option>
                <option>🚗 Carro</option>
                <option>🏠 Casa</option>
                <option>🎓 Educação</option>
                <option>💍 Casamento</option>
              </select>
              <input
                type="date"
                placeholder="Data limite (opcional)"
                className="input-base"
              />
            </div>
            <div className="flex gap-3">
              <button className="btn-primary">Criar Cofrinho</button>
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

      {/* Jars Grid */}
      {jars.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jars.map((jar) => (
            <JarCard key={jar.id} jar={jar} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<TrendingUp className="w-16 h-16" />}
          title="Nenhum cofrinho criado"
          description="Comece a criar metas de poupança para sua família"
          action={{
            label: 'Criar Primeiro Cofrinho',
            onClick: () => setShowForm(true),
          }}
        />
      )}

      {/* Overall Progress */}
      {jars.length > 0 && (
        <Card title="Progresso Geral de Poupança">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Progresso Total</span>
                <span className="font-bold">
                  {((totalSavings / totalTarget) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(totalSavings / totalTarget) * 100}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center pt-4 border-t">
              <div>
                <p className="text-gray-600 text-sm">Total Acumulado</p>
                <p className="text-lg font-bold text-green-600">R$ {totalSavings.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Meta Total</p>
                <p className="text-lg font-bold text-blue-600">R$ {totalTarget.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Falta para Atingir</p>
                <p className="text-lg font-bold text-orange-600">
                  R$ {(totalTarget - totalSavings).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
