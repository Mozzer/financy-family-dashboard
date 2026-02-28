# Guia de Integração Firebase

Este documento descreve como configurar completamente o Firebase para o MR Family Legacy.

## 1. Criar um Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nomeie como "mr-family-legacy"
4. Desative Google Analytics (você pode habilitar depois)
5. Clique em "Criar projeto"

## 2. Configurar Autenticação

1. No console Firebase, vá para "Autenticação"
2. Clique em "Começar"
3. Habilite os seguintes provedores:
   - **Email/Senha**: Método de autenticação primário
   - **Google** (Opcional): Para login com Google
   - **GitHub** (Opcional): Para login com GitHub

## 3. Criar Firestore Database

1. Vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Configure como:
   - Local: `southamerica-east1` (São Paulo) ou conforme sua preferência
   - Modo de segurança: **Iniciar no modo de teste** (depois defina regras)
4. Clique em "Criar"

## 4. Configurar Estrutura de Coleções

Crie as seguintes coleções no Firestore:

### Coleção: `users`
```json
{
  "id": "user123",
  "name": "João Silva",
  "email": "joao@example.com",
  "familyId": "family123",
  "role": "admin",
  "monthlyIncome": 5000,
  "createdAt": "2024-01-15",
  "avatar": "https://..."
}
```

### Coleção: `families`
```json
{
  "id": "family123",
  "name": "Família Silva",
  "adminId": "user123",
  "members": ["user123", "user456"],
  "createdAt": "2024-01-15",
  "currency": "BRL"
}
```

### Sub-coleção: `families/{familyId}/transactions`
```json
{
  "id": "trans123",
  "userId": "user123",
  "familyId": "family123",
  "description": "Aluguel",
  "amount": 1500,
  "category": "expense",
  "type": "expense",
  "date": "2024-02-01",
  "paymentMethod": "Transferência",
  "status": "completed",
  "tags": ["moradia"],
  "createdAt": "2024-02-01T10:00:00Z"
}
```

### Sub-coleção: `families/{familyId}/savingsJars`
```json
{
  "id": "jar123",
  "familyId": "family123",
  "name": "Férias 2024",
  "description": "Poupança para as férias da família",
  "targetAmount": 5000,
  "currentAmount": 2500,
  "icon": "✈️",
  "color": "bg-blue-100",
  "deadline": "2024-08-31",
  "createdAt": "2024-01-15",
  "contributors": [
    { "userId": "user123", "amount": 1200 },
    { "userId": "user456", "amount": 1300 }
  ]
}
```

### Sub-coleção: `families/{familyId}/loans`
```json
{
  "id": "loan123",
  "familyId": "family123",
  "lenderId": "user123",
  "borrowerId": "user456",
  "amount": 2000,
  "description": "Empréstimo para reformas",
  "createdAt": "2024-01-15",
  "dueDate": "2024-04-15",
  "status": "active",
  "installments": [
    {
      "amount": 500,
      "dueDate": "2024-02-15",
      "paid": true
    }
  ],
  "notes": "Sem juros"
}
```

## 5. Obter Credenciais Firebase

1. No Firebase Console, vá para "Configurações do Projeto"
2. Clique na aba "Seu Apps"
3. Clique em "Adicionar app" > "Web"
4. Preencha o apelido: "mr-family-legacy"
5. Copie o config JSON

## 6. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto
2. Preenchao com suas credenciais:

```env
VITE_FIREBASE_API_KEY=AIzaSyDemoKey...
VITE_FIREBASE_AUTH_DOMAIN=mr-family-legacy.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mr-family-legacy
VITE_FIREBASE_STORAGE_BUCKET=mr-family-legacy.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

## 7. Configurar Regras de Segurança

1. Vá para "Firestore Database" > "Regras"
2. Copie e cole as regras do arquivo `firebase-rules.txt`
3. Clique em "Publicar"

⚠️ **Importante**: Essas são regras básicas. Ajuste conforme suas necessidades de segurança.

## 8. Configurar Storage (Opcionaisecém)

Se desejar armazenar avatares de usuários:

1. Vá para "Storage"
2. Clique em "Começar"
3. Configure as regras:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /families/{familyId}/avatars/{userId}/{allPaths=**} {
      allow read: if true;
      allow write, delete: if request.auth.uid == userId;
    }
  }
}
```

## 9. Testar Autenticação

No seu código, a autenticação funciona assim:

```typescript
import { auth } from '@/config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Registrar
await createUserWithEmailAndPassword(auth, email, password);

// Fazer login
await signInWithEmailAndPassword(auth, email, password);
```

## 10. Próximos Passos

1. Implemente autenticação na página de login
2. Crie função para sincronizar dados com Firestore
3. Configure listeners em tempo real
4. Implemente backup automático
5. Configure rules mais restritivas em produção

## Troubleshooting

### Erro: "Permission denied"
- Verifique se as regras do Firestore estão corretas
- Confirme que o usuário está autenticado
- Verifique se o usuário está na coleção de membros

### Erro: "Invalid API Key"
- Copie a chave API corretamente do Console
- Verifique se a chave está habilitada para a API do Firestore

### Dados não aparecem
- Verifique se os documentos existem no Firestore
- Confirm que as sub-coleções estão no caminho correto
- Verifique os logs do navegador para erros

---

Para mais informações, visite a [documentação oficial do Firebase](https://firebase.google.com/docs)
