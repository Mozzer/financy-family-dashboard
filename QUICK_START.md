# ⚡ Quick Start - 5 Minutos

Comece a usar o MR Family Legacy em apenas 5 minutos!

## 1️⃣ Instalação (2 min)

```bash
# Entre no diretório do projeto
cd financy-family-dashboard

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação abrirá automaticamente em [http://localhost:5173](http://localhost:5173)

## 2️⃣ Brincando com a Aplicação (3 min)

A aplicação já vem com dados de exemplo! Explore:

### 📊 Dashboard
- Veja o resumo de receitas, despesas e saldo
- Visualize estatísticas da família

### 💰 Fluxo de Caixa
- Veja transações pré-carregadas
- Filtre por receitas/despesas
- Crie novas transações
- Experimente exportar para CSV

### 🏺 Cofrinhos
- Veja 3 metas de poupança exemplo
- Visualize o progresso em barras
- Veja contribuições de membros

### 🤝 Empréstimos
- Visualize empréstimos entre membros
- Veja diferentes status (ativo/pago)
- Registre novos empréstimos

### 📈 Saúde Financeira
- Veja o score de cada membro
- Analise taxa de poupança
- Obtenha recomendações personalizadas

## 🔥 Próximos Passos

Depois de explorar, configure o Firebase para dados reais:

1. **Criar conta Firebase**: [firebase.google.com](https://firebase.google.com)
2. **Leia o guia**: Veja `FIREBASE_SETUP.md`
3. **Configure credenciais**: Atualize `.env.local`
4. **Implemente autenticação**: Veja `src/hooks/useFirebase.ts`

## 📚 Documentação

- **README.md** - Visão geral do projeto
- **FIREBASE_SETUP.md** - Integração Firebase completa
- **DEVELOPMENT.md** - Guia de desenvolvimento
- **EXAMPLES.md** - Exemplos práticos de uso
- **ROADMAP.md** - Funcionalidades futuras

## 🎯 Estrutura de Pastas

```
src/
├── components/       # Componentes React
│   ├── Layout.tsx
│   └── common/
├── pages/           # Páginas principais
│   ├── Dashboard.tsx
│   ├── FluxoCaixa.tsx
│   ├── Cofrinhos.tsx
│   ├── Emprestimos.tsx
│   └── SaudeFinanceira.tsx
├── hooks/           # Hooks customizados
│   └── useFirebase.ts
├── store/           # Estado global (Zustand)
├── types/           # Tipos TypeScript
├── utils/           # Funções auxiliares
├── config/          # Configurações (Firebase)
└── App.tsx          # Componente raiz
```

## 🚀 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Visualizar build
npm run preview

# Linter
npm run lint
```

## 🎨 Personalizações Rápidas

### Mudar cores
Edite `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#seu-cor-aqui', // Azul padrão
  }
}
```

### Mudar nome da família
Edite `Layout.tsx`:
```typescript
<h1>Seu Nome Aqui</h1> // Mude "MR Family Legacy"
```

### Adicionar mais membros
No `App.tsx`:
```typescript
// Mude os dados simulados
const demoUser = {
  name: 'Seu Nome',
  email: 'seu@email.com',
  // ...
}
```

## 💡 Dicas

1. **Explore o design**: Teste em diferentes tamanhos (desktop/mobile)
2. **Verifique responsividade**: Redimensione a janela do navegador
3. **Teste os filtros**: Cada página com filtros para explorar
4. **Veja o código**: Componentes bem organizados para aprender

## 🐛 Problemas Comuns

### Porta 5173 já em uso
```bash
# Use outra porta
npm run dev -- --port 3000
```

### Node modules quebrado
```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Componentes não aparecem
Verifique se o Tailwind CSS está compilado (deve aparecer em `index.css`)

## 📞 Precisa de Ajuda?

- Leia `README.md` para visão geral
- Veja `DEVELOPMENT.md` para padrões  
- Consulte `EXAMPLES.md` para casos de uso
- Abra uma issue no repositório

## ✨ Próximas Features

Veja `ROADMAP.md` para ver o que vem por aí:

- [ ] Autenticação Firebase completa
- [ ] Gráficos com Chart.js
- [ ] Relatórios em PDF
- [ ] Temas customizáveis
- [ ] E muito mais!

---

**Happy coding! 🚀**

Qualquer dúvida, abra uma issue ou consulte a documentação completa.
