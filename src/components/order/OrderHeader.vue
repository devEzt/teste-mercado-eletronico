<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <!-- Header with gradient background -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="text-sm font-medium opacity-90 mb-1">
            Pre-Order
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
            {{ order.header.status }}
          </span>
          <div class="text-xs opacity-75 mt-2">
            Criado em {{ formatDate(order.header.createdAt) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Buyer Info Section -->
    <div class="p-6 bg-gray-50">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">
        {{ order.header.buyer }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
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

const statusIcon = computed(() => {
  const status = props.order.header.status?.toLowerCase()
  if (status === 'confirmed') return CheckCircleIcon
  if (status === 'shipped') return ClockIcon
  return ExclamationCircleIcon
})

const statusClasses = computed(() => {
  const status = props.order.header.status?.toLowerCase()
  if (status === 'confirmed') return 'bg-green-100 text-green-800'
  if (status === 'shipped') return 'bg-blue-100 text-blue-800'
  return 'bg-yellow-100 text-yellow-800'
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
