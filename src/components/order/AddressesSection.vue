<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center">
        <div class="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
          <MapPinIcon class="h-5 w-5" />
        </div>
        <h3 class="text-lg font-medium text-gray-900">Endereços</h3>
      </div>
    </div>
    
    <div class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AddressCard 
          v-for="(address, index) in addresses" 
          :key="index"
          :address="address"
          :type="getAddressType(address.label)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon } from '@heroicons/vue/24/outline'
import AddressCard from './AddressCard.vue'

const props = defineProps({
  addresses: {
    type: Array,
    required: true,
    default: () => []
  }
})

const getAddressType = (label) => {
  if (!label) return 'default'
  return label.toLowerCase().replace(' ', '_')
}
</script>
