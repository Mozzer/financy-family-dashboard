# MR Family Legacy - Dashboard de Gestão de Orçamento Familiar

Um dashboard responsivo moderno para gerenciar o orçamento e finanças de toda a família, construído com React, TypeScript e Firebase.

![MR Family Legacy](https://img.shields.io/badge/status-production--ready-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-06B6D4)

## ✨ Características

- 📊 **Dashboard Intuitivo**: Visão geral do fluxo de caixa familiar em tempo real
- 💰 **Gestão de Fluxo de Caixa**: Controle completo de receitas e despesas
- 🏺 **Cofrinhos Virtuais**: Crie metas de poupança para toda a família
- 🤝 **Gestão de Empréstimos**: Registre e acompanhe empréstimos entre membros
- 📈 **Indicador de Saúde Financeira**: Análise individual de cada membro da família
- 📱 **Design Responsivo**: Perfeito para desktop, tablet e mobile
- 🔐 **Autenticação Firebase**: Sistema seguro de login
- 🎨 **UI Moderna**: Interface limpa e profissional com Tailwind CSS
- 🌙 **Persistência em Nuvem**: Todos os dados salvos no Firebase Firestore

## 🚀 Quick Start

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Conta Firebase (ativa)

### Instalação

1. **Clone ou extraia o projeto:**
```bash
cd financy-family-dashboard
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure suas credenciais Firebase:**

Crie um arquivo `.env.local` na raiz do projeto:
```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

> Note: Configure essas variáveis em `src/config/firebase.ts` se preferir

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

A aplicação abrirá em `http://localhost:5173`

## 📖 Como Usar

### Dashboard
- Visualize o resumo de receitas, despesas e saldo da família
- Veja estatísticas rápidas de cofrinhos e empréstimos ativos
- Acesse ações rápidas para criar novas transações

### Fluxo de Caixa
- Registre receitas e despesas mensais
- Categorize suas transações
- Filtre por tipo (receitas/despesas)
- Exporte relatórios em CSV

### Cofrinhos
- Crie metas de poupança para a família
- Acompanhe o progresso de cada meta
- Veja contribuições de cada membro
- Defina prazos para as metas

### Empréstimos
- Registre empréstimos entre membros da família
- Acompanhe status (ativo, pago, vencido)
- Registre pagamentos e quitações
- Adicione observações sobre juros e condições

### Saúde Financeira
- Visualize o score de saúde financeira de cada membro
- Acompanhe taxa de poupança
- Obtenha recomendações personalizadas
- Veja análise geral de toda a família

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── Layout.tsx           # Layout principal com sidebar
│   ├── common/
│   │   └── index.tsx        # Componentes reutilizáveis
├── pages/
│   ├── Dashboard.tsx        # Página principal
│   ├── FluxoCaixa.tsx      # Gestão de transações
│   ├── Cofrinhos.tsx       # Metas de poupança
│   ├── Emprestimos.tsx     # Gestão de empréstimos
│   └── SaudeFinanceira.tsx # Indicadores financeiros
├── config/
│   └── firebase.ts         # Configuração Firebase
├── types/
│   └── index.ts            # Tipagens TypeScript
├── store/
│   └── index.ts            # Estado global (Zustand)
├── App.tsx                 # Componente raiz
├── main.tsx               # Entrada da aplicação
└── index.css              # Estilos globais

```

## 🛠️ Tecnologias Utilizadas

- **Frontend Framework**: React 18 com TypeScript
- **Estilização**: Tailwind CSS + PostCSS
- **Roteamento**: React Router v6
- **Gerenciamento de Estado**: Zustand
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Validação**: Zod

## 🔧 Scripts Disponíveis

```bash
# Desenvolver (com hot reload)
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint
```

## 📋 Planejamento de Funcionalidades

- [x] Dashboard principal com estatísticas
- [x] Gestão de fluxo de caixa
- [x] Sistema de cofrinhos virtuais
- [x] Gestão de empréstimos
- [x] Indicador de saúde financeira
- [x] Design responsivo mobile
- [ ] Integração completa do Firebase
- [ ] Autenticação com Google/Facebook
- [ ] Relatórios PDF
- [ ] Gráficos avançados com Chart.js
- [ ] Notificações push
- [ ] Modo offline
- [ ] Temas customizáveis
- [ ] Multi-idiomas (i18n)
- [ ] Dashboard de administrador
- [ ] Histórico de transações com filtros avançados

## 🔐 Segurança

- Credenciais Firebase nunca são expostas no frontend
- Use variáveis de ambiente para configurações sensíveis
- Implemente regras de segurança adequadas no Firestore
- Valide dados tanto no frontend quanto no backend

## 📱 Responsividade

O projeto é totalmente responsivo:

- **Desktop**: Layout com sidebar fixa
- **Tablet**: Sidebar colapsável
- **Mobile**: Menu hamburger com overlay

## 🚀 Deploy

### Vercel
```bash
vercel
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Netlify
Conecte seu GitHub e deixe o Netlify fazer build automático

## 📞 Suporte

Para reportar bugs ou sugestões, abra uma issue no repositório.

## 📄 Licença

Este projeto é licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

## 👨‍💼 Desenvolvedor

Desenvolvido com ❤️ para a MR Family Legacy

---

**Versão**: 1.0.0  
**Última atualização**: Fevereiro de 2026
