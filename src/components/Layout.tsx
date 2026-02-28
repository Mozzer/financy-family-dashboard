import React, { useState } from 'react';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '@/store';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const menuItems = [
    { label: 'Dashboard', href: '/', icon: '📊' },
    { label: 'Fluxo de Caixa', href: '/fluxo-caixa', icon: '💰' },
    { label: 'Cofrinhos', href: '/cofrinhos', icon: '🏺' },
    { label: 'Empréstimos', href: '/emprestimos', icon: '🤝' },
    { label: 'Saúde Financeira', href: '/saude-financeira', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-primary-600">MR Family Legacy</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings size={24} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              {user && (
                <>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      window.location.href = '/';
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Sair"
                  >
                    <LogOut size={24} className="text-gray-600" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed md:translate-x-0 md:static left-0 top-0 w-64 bg-white border-r border-gray-200 h-screen md:h-auto overflow-y-auto transition-transform duration-200 z-30 pt-4`}
        >
          <nav className="space-y-2 px-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
              >
                <span className="text-xl mr-2">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Backdrop mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 w-full md:w-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
