<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="$emit('close')">
    <div class="relative top-4 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-lg bg-white" @click.stop>
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-gray-900">
          {{ isEditing ? 'Editar Pedido' : 'Novo Pedido' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-900 mb-3">Informações do Pedido</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Comprador *</label>
              <input 
                v-model="form.buyer" 
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Preço *</label>
              <input 
                v-model.number="form.price" 
                type="number" 
                required
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Need to confirm">Need to confirm</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Moeda</label>
              <select 
                v-model="form.currency"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD</option>
                <option value="BRL">BRL</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>

        <div class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-semibold text-green-900 mb-3">Contato</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input 
                v-model="form.contactName" 
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input 
                v-model="form.contactEmail" 
                type="email" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input 
                v-model="form.contactPhone" 
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div class="bg-purple-50 p-4 rounded-lg">
          <h4 class="font-semibold text-purple-900 mb-3">Fornecedor</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input 
                v-model="form.supplierName" 
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Código</label>
              <input 
                v-model="form.supplierCode" 
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <textarea 
                v-model="form.supplierAddress" 
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4 border-t">
          <button 
            type="button" 
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            :disabled="loading"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ loading ? 'Salvando...' : (isEditing ? 'Salvar' : 'Criar Pedido') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  order: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const isEditing = ref(!!props.order)

const form = ref({
  buyer: '',
  price: 0,
  status: 'Need to confirm',
  currency: 'USD',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  supplierName: '',
  supplierCode: '',
  supplierAddress: ''
})

watch(() => props.order, (newOrder) => {
  if (newOrder) {
    form.value = {
      buyer: newOrder.header?.buyer || '',
      price: newOrder.header?.price || 0,
      status: newOrder.header?.status || 'Need to confirm',
      currency: newOrder.header?.currency || 'USD',
      contactName: newOrder.header?.contact?.name || '',
      contactEmail: newOrder.header?.contact?.email || '',
      contactPhone: newOrder.header?.contact?.phone || '',
      supplierName: newOrder.supplier?.name || '',
      supplierCode: newOrder.supplier?.code || '',
      supplierAddress: newOrder.supplier?.address || ''
    }
    isEditing.value = true
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>
