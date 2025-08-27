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

    <div v-if="loading" class="flex justify-center items-center min-h-96">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Erro ao carregar pedido</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="order" class="space-y-6">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg">
        <div class="px-6 py-8 text-white">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <div class="text-sm font-medium opacity-90 mb-1">Pre-Order</div>
              <h1 class="text-3xl font-bold">{{ order.header.number }}</h1>
              <p class="text-sm opacity-80">#{{ order.header.serial }}</p>
              <p class="text-xs opacity-75 mt-2">Criado em {{ formatDate(order.header.createdAt) }}</p>
            </div>
            <div class="mt-4 sm:mt-0 text-right">
              <div class="text-3xl font-bold mb-2">
                {{ order.header.currency }} {{ order.header.price.toLocaleString() }}
              </div>
              <span 
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                :class="order.header.status === 'Need to confirm' 
                  ? 'bg-yellow-400 text-yellow-900' 
                  : order.header.status === 'Confirmed' 
                    ? 'bg-green-400 text-green-900' 
                    : 'bg-gray-400 text-gray-900'"
              >
                {{ order.header.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Buyer Information -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">{{ order.header.buyer }}</h2>
        </div>
        <div class="px-6 py-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center">
              <UserIcon class="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p class="text-sm font-medium text-gray-500">Contato</p>
                <p class="text-sm text-gray-900">{{ order.header.contact.name }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <EnvelopeIcon class="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p class="text-sm font-medium text-gray-500">Email</p>
                <a :href="`mailto:${order.header.contact.email}`" class="text-sm text-blue-600 hover:text-blue-800">
                  {{ order.header.contact.email }}
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <PhoneIcon class="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p class="text-sm font-medium text-gray-500">Telefone</p>
                <a :href="`tel:${order.header.contact.phone}`" class="text-sm text-gray-900">
                  {{ order.header.contact.phone }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SupplierInfo :supplier="order.supplier" />
      
      <AddressesSection :addresses="order.addresses" />
    </div>

    <OrderForm 
      v-if="showEditForm" 
      :order="order"
      :loading="formLoading"
      @close="showEditForm = false" 
      @submit="handleEdit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useOrders } from '../composables/useOrders'
import { 
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import OrderHeader from '../components/order/OrderHeader.vue'
import SupplierInfo from '../components/order/SupplierInfo.vue'
import AddressesSection from '../components/order/AddressesSection.vue'
import OrderForm from '../components/OrderForm.vue'

const route = useRoute()
const { orders, getOrderById, loading, error, fetchOrders, canEdit, updateOrder, deleteOrder } = useOrders()
const order = ref(null)
const showEditForm = ref(false)
const formLoading = ref(false)

const loadOrder = async () => {
  const orderId = parseInt(route.params.id)
  
  if (orders.value.length === 0) {
    await fetchOrders()
  }
  
  order.value = getOrderById(orderId)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(loadOrder)

const handleEdit = async (orderData) => {
  try {
    formLoading.value = true
    await updateOrder(order.value.id, orderData)
    await loadOrder() 
    showEditForm.value = false
  } catch (err) {
    console.error('Erro ao editar pedido:', err)
  } finally {
    formLoading.value = false
  }
}

const handleDelete = async () => {
  if (confirm('Tem certeza que deseja excluir este pedido?')) {
    try {
      await deleteOrder(order.value.id)
      window.location.href = '/orders'
    } catch (err) {
      console.error('Erro ao excluir pedido:', err)
    }
  }
}

watch(() => route.params.id, loadOrder)
</script>
