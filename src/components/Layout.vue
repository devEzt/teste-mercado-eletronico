<template>
  <div class="h-screen overflow-hidden flex bg-gray-50 dark:bg-gray-900">
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64 h-screen border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div class="border-b border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center gap-1">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <FileText class="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 class="font-semibold text-gray-900 dark:text-gray-100">{{ $t('app.title') }}</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('app.subtitle') }}</p>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-start gap-1">
          <button 
            @click="toggleTheme" 
            class="inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-200 dark:hover:bg-gray-600" 
            :aria-label="$t('actions.toggleTheme')"
          >
            <MoonIcon v-if="!isDark" class="h-5 w-5" />
            <SunIcon v-else class="h-5 w-5" />
          </button>
          <LocaleSwitcher />
        </div>
      </div>
      
        <div class="flex-1 overflow-y-auto p-2">
          <nav class="space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.routeName"
              :to="{ name: item.routeName }"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.name === item.routeName
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 h-5 w-5 flex-shrink-0"
                :class="[
                  $route.name === item.routeName ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-500'
                ]"
                aria-hidden="true"
              />
              {{ item.label }}
            </router-link>
          </nav>
        </div>
      
      <div class="border-t border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span class="text-gray-600 dark:text-gray-200 font-medium text-sm">D</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">{{ $t('labels.developer') }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ $t('labels.challenge') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

    <div class="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 p-2"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 class="text-lg font-semibold">{{ $t('app.title') }}</h1>
      </div>
      <div class="flex items-center gap-2">
        <button 
          @click="toggleTheme" 
          class="inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-200 dark:hover:bg-gray-600" 
          :aria-label="$t('actions.toggleTheme')"
        >
          <MoonIcon v-if="!isDark" class="h-5 w-5" />
          <SunIcon v-else class="h-5 w-5" />
        </button>
        <LocaleSwitcher />
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" @click="mobileMenuOpen = false">
      <div class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl" @click.stop>
        <div class="flex flex-col h-full">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText class="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 class="font-semibold text-gray-900 dark:text-gray-100">{{ $t('app.title') }}</h2>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('app.subtitle') }}</p>
              </div>
            </div>
          </div>
          <nav class="flex-1 p-4 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.routeName"
              :to="{ name: item.routeName }"
              class="group flex items-center px-3 py-2 text-base font-medium rounded-md"
              :class="[
                $route.name === item.routeName
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              ]"
              @click="mobileMenuOpen = false"
            >
              <component
                :is="item.icon"
                class="mr-3 h-6 w-6 flex-shrink-0"
                :class="[
                  $route.name === item.routeName ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-500'
                ]"
                aria-hidden="true"
              />
              {{ item.label }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>

    <div class="flex-1 min-w-0 h-screen overflow-y-auto text-gray-900 dark:text-gray-100">
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  HomeIcon,
  ShoppingBagIcon,
  Bars3Icon,
  MoonIcon,
  SunIcon
} from '@heroicons/vue/24/outline'
import { FileText } from 'lucide-vue-next'
import LocaleSwitcher from './LocaleSwitcher.vue'

const route = useRoute()
const mobileMenuOpen = ref(false)

const { t } = useI18n()

const isDark = ref(false)
const applyTheme = (val) => {
  const root = document.documentElement
  if (val) {
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    root.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved ? saved === 'dark' : false
  applyTheme(isDark.value)
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
}

const navigation = computed(() => ([
  { routeName: 'Dashboard', label: t('nav.dashboard'), icon: HomeIcon, href: '/' },
  { routeName: 'Pedidos', label: t('nav.orders'), icon: ShoppingBagIcon, href: '/orders' },
]))
</script>
