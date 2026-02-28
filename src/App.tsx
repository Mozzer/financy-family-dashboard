import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { FluxoCaixa } from '@/pages/FluxoCaixa';
import { Cofrinhos } from '@/pages/Cofrinhos';
import { Emprestimos } from '@/pages/Emprestimos';
import { SaudeFinanceira } from '@/pages/SaudeFinanceira';
import { useAuthStore } from '@/store';
import { useEffect } from 'react';

function App() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    // Simulate loading user from Firebase
    if (!user) {
      const demoUser = {
        id: 'user1',
        name: 'João Silva',
        email: 'joao@familylegacy.com',
        familyId: 'family1',
        role: 'admin' as const,
        monthlyIncome: 5000,
        createdAt: new Date(),
      };
      setUser(demoUser);
    }
  }, [user, setUser]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fluxo-caixa" element={<FluxoCaixa />} />
          <Route path="/cofrinhos" element={<Cofrinhos />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
          <Route path="/saude-financeira" element={<SaudeFinanceira />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
