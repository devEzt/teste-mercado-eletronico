<template>
  <div class="bg-white overflow-hidden shadow rounded-lg relative">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div 
            class="h-12 w-12 rounded-full flex items-center justify-center"
            :class="iconBgColor"
          >
            <component 
              :is="iconComponent" 
              class="h-6 w-6" 
              :class="iconTextColor"
              aria-hidden="true" 
            />
          </div>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ title }}
            </dt>
            <dd>
              <div class="text-lg font-medium text-gray-900">
                {{ value }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  ShoppingBagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    required: true,
    validator: (value) => {
      return ['ShoppingBagIcon', 'CurrencyDollarIcon', 'CheckCircleIcon', 'ClockIcon'].includes(value)
    }
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => {
      return ['blue', 'green', 'yellow', 'red', 'purple', 'pink', 'indigo'].includes(value)
    }
  }
})

const iconComponent = computed(() => {
  const icons = {
    ShoppingBagIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
    ClockIcon
  }
  return icons[props.icon] || ShoppingBagIcon
})

const iconBgColor = computed(() => {
  const colors = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
    purple: 'bg-purple-100',
    pink: 'bg-pink-100',
    indigo: 'bg-indigo-100'
  }
  return colors[props.color] || 'bg-gray-100'
})

const iconTextColor = computed(() => {
  const colors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
    indigo: 'text-indigo-600'
  }
  return colors[props.color] || 'text-gray-600'
})
</script>
