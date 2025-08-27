<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg relative border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-md">
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
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {{ title }}
            </dt>
            <dd>
              <div class="text-lg font-medium text-gray-900 dark:text-gray-100">
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
    blue: 'bg-blue-100 dark:bg-blue-900/30',
    green: 'bg-green-100 dark:bg-green-900/30',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30',
    red: 'bg-red-100 dark:bg-red-900/30',
    purple: 'bg-purple-100 dark:bg-purple-900/30',
    pink: 'bg-pink-100 dark:bg-pink-900/30',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30'
  }
  return colors[props.color] || 'bg-gray-100 dark:bg-gray-700'
})

const iconTextColor = computed(() => {
  const colors = {
    blue: 'text-blue-600 dark:text-blue-300',
    green: 'text-green-600 dark:text-green-300',
    yellow: 'text-yellow-600 dark:text-yellow-300',
    red: 'text-red-600 dark:text-red-300',
    purple: 'text-purple-600 dark:text-purple-300',
    pink: 'text-pink-600 dark:text-pink-300',
    indigo: 'text-indigo-600 dark:text-indigo-300'
  }
  return colors[props.color] || 'text-gray-600 dark:text-gray-300'
})
</script>
