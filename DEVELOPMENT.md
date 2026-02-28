# Guia de Desenvolvimento

Este documento descreve o processo de desenvolvimento para o MR Family Legacy.

## Estrutura de Pastas

```
src/
├── components/       # Componentes React reutilizáveis
│   ├── Layout.tsx
│   └── common/
├── pages/           # Páginas principais da aplicação
├── hooks/           # React Hooks customizados
├── types/           # Definições de tipos TypeScript
├── store/           # Estado global (Zustand)
├── utils/           # Funções utilitárias
├── config/          # Configurações (Firebase, etc)
├── App.tsx          # Componente raiz
├── main.tsx         # Entrada da aplicação
└── index.css        # Estilos globais
```

## Padrões de Código

### Componentes React

Sempre use componentes funcionais TypeScript:

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div>
      <h1>{title}</h1>
      {onAction && <button onClick={onAction}>Ação</button>}
    </div>
  );
};
```

### Hooks Customizados

Nomeie hooks com prefixo "use":

```typescript
export const useMyHook = () => {
  const [state, setState] = React.useState(null);

  return { state, setState };
};
```

### Tipos e Interfaces

Exporte interfaces do arquivo `src/types/index.ts`:

```typescript
export interface MyType {
  id: string;
  name: string;
  value: number;
}
```

## Desenvolvimento Local

1. Instale dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:5173](http://localhost:5173)

## Convenções de Nomenclatura

- **Arquivos de componente**: PascalCase (`MyComponent.tsx`)
- **Arquivos de utilidade**: camelCase (`myUtility.ts`)
- **Pastas**: camelCase (`components`, `pages`, `utils`)
- **Variáveis/funções**: camelCase (`myVariable`, `myFunction`)
- **Classes/Interfaces**: PascalCase (`MyInterface`, `MyClass`)

## Tailwind CSS

Use as classes do Tailwind CSS para estilizar:

```typescript
<div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
  Conteúdo
</div>
```

## Formulários

Use o hook nativo `useState` para gerenciar formulários:

```typescript
const [formData, setFormData] = useState({ email: '', password: '' });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
```

## Gerenciamento de Estado Global

Use Zustand para estado global:

```typescript
import { create } from 'zustand';

interface MyStore {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Usar no componente
const { count, increment } = useMyStore();
```

## Integração com Firebase

Importe do arquivo de configuração:

```typescript
import { auth, db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchData = async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map(doc => doc.data());
};
```

## Tratamento de Erros

Sempre trate erros adequadamente:

```typescript
try {
  const result = await someAsyncOperation();
  setData(result);
} catch (error) {
  console.error('Erro:', error);
  setError('Ocorreu um erro ao buscar dados');
}
```

## Testes (Futuro)

Testes serão implementados usando Jest e React Testing Library:

```bash
npm test
```

## Build para Produção

```bash
npm run build
```

Isso cria uma pasta `dist/` otimizada para produção.

## Deploy

### Vercel
```bash
npm install -g vercel
vercel
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## Checklist para Nova Features

- [ ] Criar branch com `feature/nome-da-feature`
- [ ] Implementar tipo/interface em `src/types`
- [ ] Criar componente ou página
- [ ] Adicionar testes (se aplicável)
- [ ] Atualizar documentação
- [ ] Fazer commit com mensagem clara
- [ ] Abrir Pull Request

## Commits Semânticos

Use mensagens de commit descritivas:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Atualizações de documentação
- `style:` Mudanças de estilo (sem lógica)
- `refactor:` Refatoração (sem mudança de funcionalidade)
- `perf:` Melhorias de performance
- `test:` Testes

Exemplo:
```
feat: adicionar página de cofrinhos
Implementa página completa de gestão de cofrinhos com suporte a criar, editar e deletar metas de poupança.

Fixes #123
```

## Performance

- Use `React.memo` para componentes que recebem props iguais
- Use `useMemo` e `useCallback` judiciosamente
- Implemente lazy loading de páginas com React Router
- Otimize imagens

## Acessibilidade

- Use atributos semânticos HTML
- Adicione `aria-labels` quando necessário
- Teste com leitores de tela
- Mantenha contraste adequado de cores

## Código Limpo

- Funções curtas e focadas
- Nomes descritivos
- DRY (Don't Repeat Yourself)
- Comente código complexo
- Use TypeScript ao máximo

---

Dúvidas? Abra uma issue no repositório!
