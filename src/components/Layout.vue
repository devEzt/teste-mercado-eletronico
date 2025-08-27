<template>
  <div class="min-h-screen flex bg-gray-50">
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64 border-r border-gray-200 bg-white">
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
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 h-5 w-5 flex-shrink-0"
                :class="[
                  $route.name === item.name ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-500'
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
  </div>

    <div class="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 p-2"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 class="text-lg font-semibold">OrderManager</h1>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" @click="mobileMenuOpen = false">
      <div class="fixed inset-y-0 left-0 w-64 bg-white shadow-xl" @click.stop>
        <div class="flex flex-col h-full">
          <div class="p-4 border-b border-gray-200">
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
          <nav class="flex-1 p-4 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="{ name: item.name }"
              class="group flex items-center px-3 py-2 text-base font-medium rounded-md"
              :class="[
                $route.name === item.name
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              ]"
              @click="mobileMenuOpen = false"
            >
              <component
                :is="item.icon"
                class="mr-3 h-6 w-6 flex-shrink-0"
                :class="[
                  $route.name === item.name ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-500'
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="md:hidden h-16"></div>
      
      <main class="flex-1">
        <div class="p-4 md:p-6 lg:p-8">
          <router-view />
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
  { name: 'Pedidos', icon: ShoppingBagIcon, href: '/orders' },
]
</script>
