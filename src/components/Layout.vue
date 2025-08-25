<template>
  <div class="min-h-screen flex w-full bg-gray-50">
    <!-- Sidebar -->
    <div class="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white">
      <div class="border-b border-gray-200 p-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <FileText class="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 class="font-semibold text-gray-900">OrderManager</h2>
            <p class="text-xs text-gray-500">Sistema de Pedidos</p>
          </div>
        </div>
      </div>
      
      <div class="flex-1 overflow-y-auto p-2">
        <nav class="space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="{ name: item.name }"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md"
            :class="[
              $route.name === item.name
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
            ]"
          >
            <component
              :is="item.icon"
              class="mr-3 h-5 w-5 flex-shrink-0"
              :class="[
                $route.name === item.name ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-500',
                'h-5 w-5 flex-shrink-0'
              ]"
              aria-hidden="true"
            />
            {{ item.name }}
          </router-link>
        </nav>
      </div>
      
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span class="text-gray-600 font-medium text-sm">D</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 text-sm truncate">Developer</p>
            <p class="text-xs text-gray-500 truncate">Front-end Challenge</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu button -->
    <div class="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 p-2"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 class="text-xl font-semibold">OrderManager</h1>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden fixed inset-0 z-20 bg-white p-4 pt-16 overflow-y-auto">
      <nav class="space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="{ name: item.name }"
          class="group flex items-center px-3 py-2 text-base font-medium rounded-md"
          :class="[
            $route.name === item.name
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
            'group flex items-center px-3 py-2 text-base font-medium rounded-md'
          ]"
          @click="mobileMenuOpen = false"
        >
          <component
            :is="item.icon"
            class="mr-3 h-6 w-6 flex-shrink-0"
            :class="[
              $route.name === item.name ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-500',
              'h-6 w-6 flex-shrink-0'
            ]"
            aria-hidden="true"
          />
          {{ item.name }}
        </router-link>
      </nav>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col md:pl-64">
      <main class="flex-1">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { 
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { FileText } from 'lucide-vue-next'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Orders', icon: ShoppingBagIcon, href: '/orders' },
]
</script>
