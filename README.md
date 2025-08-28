<img src="https://cdn.me.com.br/logos/me_primary.png" alt="ME">

# Teste Técnico - Front-end Challenge

Sistema de gerenciamento de pedidos desenvolvido como parte do teste técnico para desenvolvedor front-end. 🚀

**🌐 Demo:** [https://teste-mercado-eletronico.vercel.app/](https://teste-mercado-eletronico.vercel.app/orders)

---

## ⚡ O Projeto

Aplicação Vue 3 que implementa uma **página de detalhes de pedidos** seguindo layout específico, consumindo dados da API do Mercado Eletrônico.

### 📱 Funcionalidades Implementadas

- **Dashboard**: Visão geral dos pedidos com métricas principais
- **Lista de Pedidos**: Visualização de todos os pedidos com filtros
- **Detalhes do Pedido**: Página completa com informações detalhadas
- **Design Responsivo**: Adaptação para diferentes tamanhos de tela
- **Internacionalização**: Suporte a múltiplos idiomas (PT/EN)
- **Interface Moderna**: UI clean com Tailwind CSS

---

## 🛠️ Tecnologias Utilizadas

### Core

- **Vue 3** - Framework principal (Composition API)
- **Vue Router** - Roteamento SPA
- **Vue I18n** - Internacionalização
- **Vite** - Build tool e dev server

### UI/UX

- **Tailwind CSS** - Framework CSS utilitário
- **Heroicons** - Ícones SVG
- **Lucide Vue** - Biblioteca de ícones adicional
- **@tailwindcss/forms** - Estilos para formulários

### HTTP & API

- **Axios** - Cliente HTTP para requisições à API

### Testes

- **Vitest** - Framework de testes unitários
- **@vue/test-utils** - Utilitários para testes Vue
- **Cypress** - Testes end-to-end
- **JSDOM** - Ambiente DOM para testes

### Qualidade de Código

- **ESLint** - Linting JavaScript/Vue
- **Commitizen** - Padronização de commits

---

## 🧩 Componentes Desenvolvidos

### **Componentes Principais**

- **`Layout.vue`** - Layout base da aplicação
- **`DashboardCard.vue`** - Cards informativos do dashboard
- **`OrderForm.vue`** - Formulário de pedidos
- **`OrderListItem.vue`** - Item da lista de pedidos
- **`LocaleSwitcher.vue`** - Seletor de idiomas

### **Componentes de Pedido**

- **`OrderHeader.vue`** - Cabeçalho com informações do pedido
- **`AddressCard.vue`** - Card individual de endereço
- **`AddressesSection.vue`** - Seção completa de endereços
- **`SupplierInfo.vue`** - Informações do fornecedor

### **Composables**

- **`useOrders.js`** - Lógica reativa para gerenciamento de pedidos

---

## 📋 Como Executar

### Pré-requisitos

- Node.js 16+ e npm 8+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/devEzt/teste-mercado-eletronico
cd teste-mercado-eletronico

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Scripts ativos

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Inicia script de Build
npm run preview      # Preview do build local
npm run test:unit    # Testes unitários (Vitest)
npm run test:e2e     # Testes e2e (Cypress)
```

---

## 🧪 Testes Implementados

### **Testes Unitários (Vitest)**

Localizados em `src/tests/`, cobrindo:

- **Componentes**: Testes de renderização e comportamento
- **Composables**: Testes de lógica reativa
- **Views**: Testes das páginas principais

### **Testes End-to-End (Cypress)**

Localizados em `cypress/e2e/`:

- **`smoke.cy.js`** - Testes básicos de funcionalidade
- **`create-order.cy.js`** - Fluxo completo de criação de pedidos

---

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── order/           # Componentes específicos de pedidos
│   ├── DashboardCard.vue
│   ├── Layout.vue
│   └── [outros...]
├── composables/         # Composables Vue
├── i18n/               # Configuração de internacionalização
├── tests/              # Testes unitários
│   ├── components/
│   ├── composables/
│   └── views/
└── views/              # Páginas da aplicação

cypress/
├── e2e/                # Testes end-to-end
└── support/            # Configurações do Cypress
```

---

## 🎥 Demonstração em Vídeo

_[Seção reservada para link do vídeo de demonstração]_

---

## 🚀 Deploy

Aplicação deployada na **Vercel**:

- **URL de Produção**: [https://teste-mercado-eletronico.vercel.app/](https://teste-mercado-eletronico.vercel.app/orders)
- **Configuração** via `vercel.json`

---

## 📡 API Integration

Consome dados da API oficial:

- **Endpoint**: `GET https://api.mercadoe.space/orders/1`
- **Tratamento de erros** e estados de loading implementados
- **Interface reativa** com Vue 3 Composition API

---

## 👨‍💻 Autor

Desenvolvido por Alexandre Maciel.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Alexandre-blue.svg)](https://www.linkedin.com/in/alexandreh-maciel/)
