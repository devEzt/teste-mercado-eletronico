import { createI18n } from 'vue-i18n'

const messages = {
  'pt-BR': {
    app: {
      title: 'OrderManager',
      subtitle: 'Sistema de Pedidos',
    },
    nav: {
      dashboard: 'Dashboard',
      orders: 'Pedidos',
    },
    actions: {
      viewAll: 'Ver todos →',
      newOrder: 'Novo Pedido',
      cancel: 'Cancelar',
      save: 'Salvar',
      toggleTheme: 'Alternar tema',
      changeLanguage: 'Alterar idioma para {lang}',
    },
    dashboard: {
      heading: 'Dashboard',
      subheading: 'Visão geral dos seus pedidos',
      totalOrders: 'Total de Pedidos',
      totalValue: 'Valor Total',
      confirmed: 'Confirmados',
      pending: 'Pendentes',
      recentOrders: 'Pedidos Recentes',
    },
    orders: {
      heading: 'Meus Pedidos',
      subheading: 'Lista completa dos seus pedidos',
      emptyTitle: 'Nenhum pedido encontrado',
      emptySubtitle: 'Quando você tiver pedidos, eles aparecerão aqui.'
    },
    details: {
      backToOrders: 'Voltar para Pedidos',
      preOrder: 'Pre-Order',
      createdAt: 'Criado em {date}'
    },
    status: {
      confirmed: 'Confirmado',
      shipped: 'Enviado',
      needConfirm: 'A confirmar',
    },
    labels: {
      contact: 'Contato',
      email: 'Email',
      phone: 'Telefone',
      fax: 'Fax',
      address: 'Endereço',
      viewedAt: 'Visualizado em',
      supplier: 'Fornecedor',
      addresses: 'Endereços',
      developer: 'Developer',
      challenge: 'Front-end Challenge'
    },
    addressTypes: {
      shipTo: 'Enviar para',
      billTo: 'Cobrança',
      chargeTo: 'Cobrar de',
      default: 'Endereço'
    },
    errors: {
      loadOrders: 'Erro ao carregar pedidos',
      loadOrder: 'Erro ao carregar pedido'
    }
  },
  'en-US': {
    app: {
      title: 'OrderManager',
      subtitle: 'Orders System',
    },
    nav: {
      dashboard: 'Dashboard',
      orders: 'Orders',
    },
    actions: {
      viewAll: 'View all →',
      newOrder: 'New Order',
      cancel: 'Cancel',
      save: 'Save',
      toggleTheme: 'Toggle theme',
      changeLanguage: 'Change language to {lang}',
    },
    dashboard: {
      heading: 'Dashboard',
      subheading: 'Overview of your orders',
      totalOrders: 'Total Orders',
      totalValue: 'Total Value',
      confirmed: 'Confirmed',
      pending: 'Pending',
      recentOrders: 'Recent Orders',
    },
    orders: {
      heading: 'My Orders',
      subheading: 'Full list of your orders',
      emptyTitle: 'No orders found',
      emptySubtitle: 'When you have orders, they will appear here.'
    },
    details: {
      backToOrders: 'Back to Orders',
      preOrder: 'Pre-Order',
      createdAt: 'Created at {date}'
    },
    status: {
      confirmed: 'Confirmed',
      shipped: 'Shipped',
      needConfirm: 'Need to confirm',
    },
    labels: {
      contact: 'Contact',
      email: 'Email',
      phone: 'Phone',
      fax: 'Fax',
      address: 'Address',
      viewedAt: 'Viewed at',
      supplier: 'Supplier',
      addresses: 'Addresses',
      developer: 'Developer',
      challenge: 'Front-end Challenge'
    },
    addressTypes: {
      shipTo: 'Ship to',
      billTo: 'Bill to',
      chargeTo: 'Charge to',
      default: 'Address'
    },
    errors: {
      loadOrders: 'Error loading orders',
      loadOrder: 'Error loading order'
    }
  }
}

function detectLocale() {
  const saved = localStorage.getItem('locale')
  if (saved) return saved
  // Default to Portuguese (Brazil) when nothing is saved
  return 'pt-BR'
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectLocale(),
  fallbackLocale: 'en-US',
  messages,
})
