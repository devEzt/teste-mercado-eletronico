<template>
  <div class="border border-gray-200 rounded-lg p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-lg font-semibold text-gray-900">
        {{ typeLabel }}
      </h4>
      <span 
        v-if="address.code"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
      >
        #{{ address.code }}
      </span>
    </div>

    <div class="space-y-4 flex-1">
      <!-- Name -->
      <h5 class="text-lg font-bold text-gray-900">
        {{ address.name }}
      </h5>

      <!-- Address -->
      <div class="flex items-start">
        <div class="flex-shrink-0 h-5 w-5 text-gray-400">
          <MapPinIcon class="h-5 w-5" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-gray-500">Endereço</p>
          <p class="text-sm text-gray-900">{{ address.address }}</p>
        </div>
      </div>

      <!-- Contact -->
      <div v-if="address.contact?.name" class="flex items-start">
        <div class="flex-shrink-0 h-5 w-5 text-gray-400">
          <UserIcon class="h-5 w-5" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-gray-500">Contato</p>
          <p class="text-sm text-gray-900">{{ address.contact.name }}</p>
        </div>
      </div>

      <!-- Email -->
      <div v-if="address.contact?.email" class="flex items-start">
        <div class="flex-shrink-0 h-5 w-5 text-gray-400">
          <EnvelopeIcon class="h-5 w-5" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-gray-500">Email</p>
          <a 
            :href="`mailto:${address.contact.email}`" 
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            {{ address.contact.email }}
          </a>
        </div>
      </div>

      <!-- Phone -->
      <div v-if="address.contact?.phone" class="flex items-start">
        <div class="flex-shrink-0 h-5 w-5 text-gray-400">
          <PhoneIcon class="h-5 w-5" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-gray-500">Telefone</p>
          <a 
            :href="`tel:${address.contact.phone}`" 
            class="text-sm text-gray-900"
          >
            {{ address.contact.phone }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  MapPinIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon 
} from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const props = defineProps({
  address: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['ship_to', 'bill_to', 'charge_to', 'default'].includes(value)
    }
  }
})

const typeLabel = computed(() => {
  const labels = {
    'ship_to': 'Enviar para',
    'bill_to': 'Cobrança',
    'charge_to': 'Cobrar de',
    'default': 'Endereço'
  }
  return labels[props.type] || 'Endereço'
})
</script>
