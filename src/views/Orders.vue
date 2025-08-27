<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Meus Pedidos</h1>
        <p class="text-gray-500 mt-1">Lista completa dos seus pedidos</p>
      </div>
      <button 
        @click="showOrderForm = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Novo Pedido
      </button>
    </div>

  <div v-if="loading" class="space-y-4">
    <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow p-6 animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div class="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div class="h-4 bg-gray-100 rounded w-3/4"></div>
    </div>
  </div>

  <div v-else-if="error" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">Erro ao carregar pedidos</h3>
        <p class="mt-1 text-sm text-red-700">{{ error }}</p>
      </div>
    </div>
  </div>

  <div v-else-if="orders.length === 0" class="text-center py-16 bg-white rounded-lg shadow-sm">
    <ShoppingBagIcon class="mx-auto h-16 w-16 text-gray-300" />
    <h3 class="mt-4 text-lg font-medium text-gray-900">Nenhum pedido encontrado</h3>
    <p class="mt-2 text-sm text-gray-500">Quando você tiver pedidos, eles aparecerão aqui.</p>
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

  <!-- Order Form Modal -->
  <OrderForm 
    v-if="showOrderForm" 
    :order="editingOrder"
    :loading="formLoading"
    @close="closeOrderForm" 
    @submit="handleOrderSubmit"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrders } from '../composables/useOrders'
import OrderListItem from '../components/OrderListItem.vue'
import OrderForm from '../components/OrderForm.vue'
import { ExclamationCircleIcon, PlusIcon } from '@heroicons/vue/24/outline'

const { orders, loading, error, fetchOrders, addOrder, updateOrder } = useOrders()

const showOrderForm = ref(false)
const editingOrder = ref(null)
const formLoading = ref(false)

onMounted(async () => {
  await fetchOrders()
})

const closeOrderForm = () => {
  showOrderForm.value = false
  editingOrder.value = null
}

const handleOrderSubmit = async (orderData) => {
  try {
    formLoading.value = true
    
    if (editingOrder.value) {
      await updateOrder(editingOrder.value.id, orderData)
    } else {
      addOrder(orderData)
    }
    
    closeOrderForm()
  } catch (err) {
    console.error('Erro ao salvar pedido:', err)
  } finally {
    formLoading.value = false
  }
}
</script>
