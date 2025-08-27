<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="text-sm font-medium opacity-90 mb-1">
            {{ $t('details.preOrder') }}
          </div>
          <div class="text-2xl md:text-3xl font-bold">
            {{ order.header.number }}
          </div>
          <div class="text-sm opacity-90 mt-1">
            #{{ order.header.serial }}
          </div>
        </div>
        
        <div class="text-right">
          <div class="text-2xl md:text-3xl font-bold mb-2">
            {{ order.header.currency }} {{ order.header.price?.toLocaleString() }}
          </div>
          <span 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="statusClasses"
          >
            <component :is="statusIcon" class="w-3 h-3 mr-1" />
            {{ displayStatus(order.header.status) }}
          </span>
          <div class="text-xs opacity-75 mt-2">
            {{ $t('details.createdAt', { date: formatDate(order.header.createdAt) }) }}
          </div>
        </div>
      </div>
    </div>

    <div class="p-6 bg-gray-50 dark:bg-gray-900">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {{ order.header.buyer }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
        <div class="flex items-center gap-2">
          <UserIcon class="w-4 h-4 text-gray-400" />
          {{ order.header.contact?.name }}
        </div>
        <div class="flex items-center gap-2">
          <EnvelopeIcon class="w-4 h-4 text-gray-400" />
          {{ order.header.contact?.email }}
        </div>
        <div class="flex items-center gap-2">
          <PhoneIcon class="w-4 h-4 text-gray-400" />
          {{ order.header.contact?.phone }}
        </div>
        <div v-if="order.header.contact?.fax" class="flex items-center gap-2">
          <PhoneIcon class="w-4 h-4 text-gray-400" />
          {{ order.header.contact.fax }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const { t, locale } = useI18n()

const statusIcon = computed(() => {
  const status = props.order.header.status?.toLowerCase()
  if (status === 'confirmed') return CheckCircleIcon
  if (status === 'shipped') return ClockIcon
  return ExclamationCircleIcon
})

const statusClasses = computed(() => {
  const status = props.order.header.status?.toLowerCase()
  if (status === 'confirmed') return 'bg-green-100 text-green-800 dark:bg-green-500 dark:text-green-900'
  if (status === 'shipped') return 'bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-blue-900'
  return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500 dark:text-yellow-900'
})

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
</script>
