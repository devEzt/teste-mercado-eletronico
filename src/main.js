import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

// Import components
import Dashboard from './views/Dashboard.vue'
import Orders from './views/Orders.vue'
import OrderDetails from './views/OrderDetails.vue'
import Layout from './components/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/orders',
        name: 'Pedidos',
        component: Orders
      },
      {
        path: '/orders/:id',
        name: 'OrderDetails',
        component: OrderDetails,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
