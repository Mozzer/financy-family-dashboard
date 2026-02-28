import React, { useState, useEffect } from 'react';
import { Card, Skeleton } from '@/components/common';
import { AlertTriangle, TrendingUp, Target, Activity } from 'lucide-react';
import { FinancialHealth } from '@/types';

export const SaudeFinanceira: React.FC = () => {
  const [healthData, setHealthData] = useState<FinancialHealth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading health data
    setTimeout(() => {
      setHealthData([
        {
          userId: 'user1',
          familyId: 'family1',
          monthlyIncome: 5000,
          totalExpenses: 3500,
          totalSavings: 1500,
          savingsRate: 30,
          healthScore: 85,
          status: 'excellent',
          recommendations: [
            'Continue mantendo sua disciplina de poupança',
            'Considere aumentar aporte em investimentos',
          ],
        },
        {
          userId: 'user2',
          familyId: 'family1',
          monthlyIncome: 3500,
          totalExpenses: 3200,
          totalSavings: 300,
          savingsRate: 8.5,
          healthScore: 60,
          status: 'warning',
          recommendations: [
            'Reduza despesas discricionárias',
            'Aumente sua taxa de poupança para 10-15%',
            'Revise assinaturas e serviços recorrentes',
          ],
        },
        {
          userId: 'user3',
          familyId: 'family1',
          monthlyIncome: 2800,
          totalExpenses: 2900,
          totalSavings: 0,
          savingsRate: 0,
          healthScore: 40,
          status: 'alert',
          recommendations: [
            'Suas despesas excedem sua renda',
            'Crie um orçamento de emergência',
            'Considere renda adicional',
            'Procure ajuda para reorganizar suas finanças',
          ],
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const getHealthColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      excellent: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
      },
      good: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
      },
      warning: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
      },
      alert: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
      },
    };
    return colors[status] || colors['good'];
  };

  const getHealthLabel = (status: string) => {
    const labels: Record<string, string> = {
      excellent: 'Excelente',
      good: 'Bom',
      warning: 'Atenção',
      alert: 'Crítico',
    };
    return labels[status] || 'Desconhecido';
  };

  const HealthScoreGauge: React.FC<{ score: number }> = ({ score }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg width="128" height="128" className="transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke={score >= 70 ? '#10b981' : score >= 50 ? '#eab308' : '#ef4444'}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold">{score}</p>
            <p className="text-xs text-gray-600">Score</p>
          </div>
        </div>
      </div>
    );
  };

  const HealthCard: React.FC<{ health: FinancialHealth }> = ({ health }) => {
    const color = getHealthColor(health.status);

    return (
      <Card className={`border-2 ${color.border} ${color.bg}`}>
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg">Membro {health.userId}</h3>
              <p className={`text-sm font-semibold ${color.text}`}>
                {getHealthLabel(health.status)}
              </p>
            </div>
            <HealthScoreGauge score={health.healthScore} />
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b-2 border-current border-opacity-10">
          <div>
            <p className="text-xs text-gray-600 mb-1">Renda Mensal</p>
            <p className="text-lg font-bold">R$ {health.monthlyIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Despesas</p>
            <p className="text-lg font-bold">R$ {health.totalExpenses.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Poupado</p>
            <p className="text-lg font-bold text-green-600">
              R$ {health.totalSavings.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Taxa de Poupança</p>
            <p className="text-lg font-bold">{health.savingsRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Savings Rate Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold">CAPACIDADE DE POUPANÇA</span>
            <span className="text-xs font-semibold">{health.savingsRate.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                health.savingsRate >= 20
                  ? 'bg-green-500'
                  : health.savingsRate >= 10
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(health.savingsRate, 100)}%` }}
            />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            {health.status === 'alert' ? (
              <AlertTriangle size={18} className="text-red-600" />
            ) : (
              <Target size={18} className="text-primary-600" />
            )}
            Recomendações
          </h4>
          <ul className="space-y-2">
            {health.recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm flex gap-2">
                <span className="text-primary-600 font-bold mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Saúde Financeira</h1>
        <p className="text-gray-600 mt-1">
          Análise da saúde financeira de cada membro da família
        </p>
      </div>

      {/* Overall Family Health */}
      <Card title="Situação Geral da Família" className="bg-gradient-to-r from-primary-50 to-blue-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <Activity className="w-8 h-8 mx-auto text-primary-600 mb-2" />
            <p className="text-sm text-gray-600 mb-1">Renda Total</p>
            <p className="text-2xl font-bold text-primary-600">
              R$ {healthData.reduce((sum, h) => sum + h.monthlyIncome, 0).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <p className="text-sm text-gray-600 mb-1">Total Poupado</p>
            <p className="text-2xl font-bold text-green-600">
              R$ {healthData.reduce((sum, h) => sum + h.totalSavings, 0).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <Target className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <p className="text-sm text-gray-600 mb-1">Total Despesas</p>
            <p className="text-2xl font-bold text-blue-600">
              R$ {healthData.reduce((sum, h) => sum + h.totalExpenses, 0).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Taxa Média</p>
            <p className="text-2xl font-bold text-primary-600">
              {(healthData.reduce((sum, h) => sum + h.savingsRate, 0) / healthData.length).toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>

      {/* Individual Health Cards */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Skeleton className="h-96" />
            </Card>
          ))}
        </div>
      ) : healthData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {healthData.map((health) => (
            <HealthCard key={health.userId} health={health} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <p className="text-gray-600">Nenhum dado de saúde financeira disponível</p>
        </Card>
      )}

      {/* Financial Tips */}
      <Card title="💡 Dicas Financeiras">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Regra 50/30/20</h4>
            <p className="text-sm text-gray-700">
              Organize 50% da renda para necessidades, 30% para desejos e 20% para poupança
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-2">Fundo de Emergência</h4>
            <p className="text-sm text-gray-700">
              Mantenha 3-6 meses de despesas em uma conta poupança segura
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-gray-900 mb-2">Revisão Mensal</h4>
            <p className="text-sm text-gray-700">
              Analise suas despesas mensalmente e ajuste o orçamento conforme necessário
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
