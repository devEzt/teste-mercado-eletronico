<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
      <p class="text-gray-600 mt-1">Lista completa dos seus pedidos</p>
    </div>

  <div v-if="loading" class="space-y-4">
    <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow p-6 animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div class="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div class="h-4 bg-gray-100 rounded w-3/4"></div>
    </div>
  </div>

  <div v-else-if="error" class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm text-red-700">
          {{ error }}
        </p>
      </div>
    </div>
  </div>

  <div v-else class="space-y-4">
    <OrderListItem 
      v-for="order in orders" 
      :key="order.id" 
      :order="order" 
      class="transition-transform hover:scale-[1.01]"
    />
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrders } from '../services/OrderService'
import OrderListItem from '../components/OrderListItem.vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const { orders, loading, error, fetchOrders } = useOrders()

onMounted(async () => {
  await fetchOrders()
})
</script>
