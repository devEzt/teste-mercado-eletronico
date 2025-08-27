<template>
  <div>
    <div class="mb-6">
      <router-link 
        to="/orders" 
        class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
      >
        <ArrowLeftIcon class="h-4 w-4 mr-1" />
        {{ $t('details.backToOrders') }}
      </router-link>
    </div>

    <div v-if="loading" class="flex justify-center items-center min-h-96">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-300">{{ $t('errors.loadOrder') }}</h3>
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
              <div class="text-sm font-medium opacity-90 mb-1">{{ $t('details.preOrder') }}</div>
              <h1 class="text-3xl font-bold">{{ order.header.number }}</h1>
              <p class="text-sm opacity-80">#{{ order.header.serial }}</p>
              <p class="text-xs opacity-75 mt-2">{{ $t('details.createdAt', { date: order.header.createdAt ? formatDate(order.header.createdAt) : '-' }) }}</p>
            </div>
            <div class="mt-4 sm:mt-0 text-right">
              <div class="text-3xl font-bold mb-2">
                {{ order.header.currency }} {{ order.header.price.toLocaleString() }}
              </div>
              <span 
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                :class="statusClasses(order.header.status)"
              >
                {{ displayStatus(order.header.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ order.header.buyer }}</h2>
        </div>
        <div class="px-6 py-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center">
              <UserIcon class="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('labels.contact') }}</p>
                <p class="text-sm text-gray-900 dark:text-gray-100">{{ order.header.contact?.name || '-' }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <EnvelopeIcon class="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('labels.email') }}</p>
                <a :href="order.header.contact?.email ? `mailto:${order.header.contact.email}` : '#'" class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200">
                  {{ order.header.contact?.email || '-' }}
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <PhoneIcon class="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ $t('labels.phone') }}</p>
                <a :href="order.header.contact?.phone ? `tel:${order.header.contact.phone}` : '#'" class="text-sm text-gray-900 dark:text-gray-100">
                  {{ order.header.contact?.phone || '-' }}
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
import { useI18n } from 'vue-i18n'
import { 
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/vue/24/outline'
import OrderHeader from '../components/order/OrderHeader.vue'
import SupplierInfo from '../components/order/SupplierInfo.vue'
import AddressesSection from '../components/order/AddressesSection.vue'
import OrderForm from '../components/OrderForm.vue'

const route = useRoute()
const { locale, t } = useI18n()
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
  return new Date(dateString).toLocaleString(locale.value || 'pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const displayStatus = (status) => {
  if (!status) return ''
  const s = status.toLowerCase()
  if (s === 'confirmed') return t('status.confirmed')
  if (s === 'shipped') return t('status.shipped')
  if (s.includes('confirm')) return t('status.needConfirm')
  return status
}

const statusClasses = (status) => {
  if (!status) return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-900'
  const s = status.toLowerCase()
  if (s === 'confirmed') return 'bg-green-100 text-green-800 dark:bg-green-500 dark:text-green-900'
  if (s === 'shipped') return 'bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-blue-900'
  if (s.includes('confirm')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500 dark:text-yellow-900'
  return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-900'
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


watch(() => route.params.id, loadOrder)
</script>
