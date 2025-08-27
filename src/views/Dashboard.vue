<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ $t('dashboard.heading') }}</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">{{ $t('dashboard.subheading') }}</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <template v-if="loading">
        <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div class="ml-4 flex-1">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </template>
      
      <template v-else>
        <DashboardCard 
          :title="$t('dashboard.totalOrders')" 
          :value="orders.length"
          icon="ShoppingBagIcon"
          color="blue"
        />
        
        <DashboardCard 
          :title="$t('dashboard.totalValue')" 
          :value="`$${totalValue.toLocaleString()}`"
          icon="CurrencyDollarIcon"
          color="green"
        />
        
        <DashboardCard 
          :title="$t('dashboard.confirmed')" 
          :value="confirmedOrders"
          icon="CheckCircleIcon"
          color="green"
        />
        
        <DashboardCard 
          :title="$t('dashboard.pending')" 
          :value="pendingOrders"
          icon="ClockIcon"
          color="yellow"
        />
      </template>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ $t('dashboard.recentOrders') }}</h2>
          <router-link 
            to="/orders" 
            class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            {{ $t('actions.viewAll') }}
          </router-link>
        </div>
      </div>
      
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <template v-if="loading">
          <div v-for="i in 3" :key="i" class="p-4 animate-pulse">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between">
              <div class="flex-1 min-w-0">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/5"></div>
              </div>
              <div class="mt-2 sm:mt-0 sm:ml-4 sm:text-right">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
              </div>
            </div>
          </div>
        </template>
        
        <template v-else>
          <div 
            v-for="order in recentOrders" 
            :key="order.id"
            class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <router-link :to="`/orders/${order.id}`" class="block">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    #{{ order.header?.number ?? '—' }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {{ order.header?.buyer || '' }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ order.header?.contact?.name || '' }}
                  </p>
                </div>
                <div class="mt-2 sm:mt-0 sm:ml-4 sm:text-right">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {{ (order.header?.currency || '') }} {{ (order.header?.price ?? 0).toLocaleString() }}
                  </p>
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1"
                    :class="getStatusClasses(order.header?.status)"
                  >
                    {{ displayStatus(order.header?.status) }}
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useOrders } from '../composables/useOrders'
import DashboardCard from '../components/DashboardCard.vue'

const { orders, fetchOrders, loading } = useOrders()
const { t } = useI18n()

onMounted(async () => {
  await fetchOrders()
})

const totalValue = computed(() => {
  return orders.value.reduce((sum, order) => sum + (order?.header?.price ?? 0), 0)
})

const confirmedOrders = computed(() => {
  return orders.value.filter(order => order?.header?.status === 'Confirmed').length
})

const pendingOrders = computed(() => {
  return orders.value.filter(order => order?.header?.status === 'Need to confirm').length
})

const recentOrders = computed(() => {
  return [...orders.value]
    .sort((a, b) => new Date(b?.header?.createdAt ?? 0) - new Date(a?.header?.createdAt ?? 0))
    .slice(0, 5)
})

const getStatusClasses = (status) => {
  const statusMap = {
    'Confirmed': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    'Shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    'Need to confirm': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    'default': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
  
  return statusMap[status] || statusMap.default
}

const displayStatus = (status) => {
  if (!status) return '—'
  const map = {
    'Confirmed': t('status.confirmed'),
    'Shipped': t('status.shipped'),
    'Need to confirm': t('status.needConfirm'),
  }
  return map[status] || status
}
</script>
