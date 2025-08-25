<template>
  <div>
    <div class="mb-6">
      <router-link 
        to="/orders" 
        class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeftIcon class="h-4 w-4 mr-1" />
        Voltar para Pedidos
      </router-link>
    </div>

    <div v-if="loading" class="space-y-6">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="h-64 bg-gray-200 animate-pulse"></div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-lg shadow p-6 h-64 animate-pulse"></div>
        </div>
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6 h-64 animate-pulse"></div>
        </div>
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

    <div v-else-if="!order" class="text-center py-12">
      <ExclamationCircleIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">Pedido não encontrado</h3>
      <p class="mt-1 text-sm text-gray-500">O pedido solicitado não pôde ser encontrado.</p>
      <div class="mt-6">
        <router-link 
          to="/orders" 
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Voltar para a lista de pedidos
        </router-link>
      </div>
    </div>

    <div v-else class="space-y-6">
      <!-- Order Header -->
      <OrderHeader :order="order" />
      
      <!-- Supplier Info -->
      <SupplierInfo :supplier="order.supplier" />
      
      <!-- Addresses -->
      <AddressesSection :addresses="order.addresses" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useOrders } from '../services/OrderService'
import { 
  ArrowLeftIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'
import OrderHeader from '../components/order/OrderHeader.vue'
import SupplierInfo from '../components/order/SupplierInfo.vue'
import AddressesSection from '../components/order/AddressesSection.vue'

const route = useRoute()
const { getOrderById, loading, error } = useOrders()
const order = ref(null)

const loadOrder = async () => {
  const orderId = parseInt(route.params.id)
  order.value = getOrderById(orderId)
}

onMounted(loadOrder)

// Watch for changes in route params
watch(() => route.params.id, loadOrder)
</script>
