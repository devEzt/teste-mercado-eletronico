<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">Visão geral dos seus pedidos</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard 
        title="Total de Pedidos" 
        :value="orders.length"
        icon="ShoppingBagIcon"
        color="blue"
      />
      
      <DashboardCard 
        title="Valor Total" 
        :value="`$${totalValue.toLocaleString()}`"
        icon="CurrencyDollarIcon"
        color="green"
      />
      
      <DashboardCard 
        title="Confirmados" 
        :value="confirmedOrders"
        icon="CheckCircleIcon"
        color="green"
      />
      
      <DashboardCard 
        title="Pendentes" 
        :value="pendingOrders"
        icon="ClockIcon"
        color="yellow"
      />
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900">Pedidos Recentes</h2>
          <router-link 
            to="/orders" 
            class="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Ver todos →
          </router-link>
        </div>
      </div>
      
      <div class="divide-y divide-gray-200">
        <div 
          v-for="order in recentOrders" 
          :key="order.id"
          class="p-4 hover:bg-gray-50 transition-colors"
        >
          <router-link :to="`/orders/${order.id}`" class="block">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  #{{ order.header.number }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ order.header.buyer }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ order.header.contact.name }}
                </p>
              </div>
              <div class="mt-2 sm:mt-0 sm:ml-4 sm:text-right">
                <p class="text-sm font-medium text-gray-900">
                  {{ order.header.currency }} {{ order.header.price.toLocaleString() }}
                </p>
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1"
                  :class="getStatusClasses(order.header.status)"
                >
                  {{ order.header.status }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useOrders } from '../services/OrderService'
import DashboardCard from '../components/DashboardCard.vue'
import { 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  CheckCircleIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline'

const { orders, fetchOrders } = useOrders()

onMounted(async () => {
  await fetchOrders()
})

const totalValue = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.header.price, 0)
})

const confirmedOrders = computed(() => {
  return orders.value.filter(order => order.header.status === 'Confirmed').length
})

const pendingOrders = computed(() => {
  return orders.value.filter(order => order.header.status === 'Need to confirm').length
})

const recentOrders = computed(() => {
  return [...orders.value]
    .sort((a, b) => new Date(b.header.createdAt) - new Date(a.header.createdAt))
    .slice(0, 5)
})

const getStatusClasses = (status) => {
  const statusMap = {
    'Confirmed': 'bg-green-100 text-green-800',
    'Shipped': 'bg-blue-100 text-blue-800',
    'Need to confirm': 'bg-yellow-100 text-yellow-800',
    'default': 'bg-gray-100 text-gray-800'
  }
  
  return statusMap[status] || statusMap.default
}
</script>
