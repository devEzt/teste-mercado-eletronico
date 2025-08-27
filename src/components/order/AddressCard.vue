<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-full flex flex-col bg-white dark:bg-gray-800">
    <div class="flex items-center justify-between mb-4">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {{ typeLabel }}
      </h4>
      <span 
        v-if="address.code"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      >
        #{{ address.code }}
      </span>
    </div>

    <div class="space-y-4 flex-1">
      <!-- Name -->
      <h5 class="text-lg font-bold text-gray-900 dark:text-gray-100">
        {{ address.name }}
      </h5>

      <!-- Address -->
      <div class="flex items-start">
        <div class="flex-shrink-0 h-5 w-5 text-gray-400">
          <MapPinIcon class="h-5 w-5" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('labels.address') }}</p>
          <p class="text-sm text-gray-900 dark:text-gray-100">{{ address.address }}</p>
        </div>
      </div>

      <!-- Contact -->
      <div v-if="address.contact?.name" class="flex items-start">
        <div class="flex-shrink-0 h-5 w-5 text-gray-400">
          <UserIcon class="h-5 w-5" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('labels.contact') }}</p>
          <p class="text-sm text-gray-900 dark:text-gray-100">{{ address.contact.name }}</p>
        </div>
      </div>

      <!-- Email -->
      <div v-if="address.contact?.email" class="flex items-start">
        <div class="flex-shrink-0 h-5 w-5 text-gray-400">
          <EnvelopeIcon class="h-5 w-5" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('labels.email') }}</p>
          <a 
            :href="`mailto:${address.contact.email}`" 
            class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
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
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('labels.phone') }}</p>
          <a 
            :href="`tel:${address.contact.phone}`" 
            class="text-sm text-gray-900 dark:text-gray-100"
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
import { useI18n } from 'vue-i18n'

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

const { t } = useI18n()

const typeLabel = computed(() => {
  const map = {
    'ship_to': t('addressTypes.shipTo'),
    'bill_to': t('addressTypes.billTo'),
    'charge_to': t('addressTypes.chargeTo'),
    'default': t('addressTypes.default')
  }
  return map[props.type] || t('addressTypes.default')
})
</script>
