<template>
  <div class="inline-flex items-stretch h-9 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden">
    <button
      :class="['px-3 h-full flex items-center gap-1.5 text-sm font-medium transition',
        locale === 'pt-BR'
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700']"
      @click="setLocale('pt-BR')"
      :aria-pressed="locale === 'pt-BR'"
      :aria-label="$t('actions.changeLanguage', { lang: 'Português' })"
    >
      <span class="w-5 h-4" aria-hidden="true" v-html="flags.br" />
      <span>PT</span>
    </button>
    <button
      :class="['px-3 h-full flex items-center gap-1.5 text-sm font-medium transition border-l border-gray-300 dark:border-gray-600',
        locale === 'en-US'
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700']"
      @click="setLocale('en-US')"
      :aria-pressed="locale === 'en-US'"
      :aria-label="$t('actions.changeLanguage', { lang: 'English' })"
    >
      <span class="w-5 h-4" aria-hidden="true" v-html="flags.us" />
      <span>EN</span>
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const setLocale = (lang) => {
  if (locale.value === lang) return
  locale.value = lang
  localStorage.setItem('locale', lang)
}

const flags = {
  br: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'>
      <rect width='24' height='16' fill='#009b3a'/>
      <polygon points='12,2 22,8 12,14 2,8' fill='#ffdf00'/>
      <circle cx='12' cy='8' r='3.2' fill='#002776'/>
    </svg>
  `,
  us: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 16'>
      <rect width='24' height='16' fill='#b22234'/>
      <g fill='#fff'>
        <rect y='2' width='24' height='2'/>
        <rect y='6' width='24' height='2'/>
        <rect y='10' width='24' height='2'/>
        <rect y='14' width='24' height='2'/>
      </g>
      <rect width='10' height='7' fill='#3c3b6e'/>
      <g fill='#fff'>
        <circle cx='1.2' cy='1' r='.3'/>
        <circle cx='2.8' cy='1' r='.3'/>
        <circle cx='4.4' cy='1' r='.3'/>
        <circle cx='6.0' cy='1' r='.3'/>
        <circle cx='7.6' cy='1' r='.3'/>
        <circle cx='1.2' cy='2.4' r='.3'/>
        <circle cx='2.8' cy='2.4' r='.3'/>
        <circle cx='4.4' cy='2.4' r='.3'/>
        <circle cx='6.0' cy='2.4' r='.3'/>
        <circle cx='7.6' cy='2.4' r='.3'/>
        <circle cx='2.0' cy='3.6' r='.3'/>
        <circle cx='3.6' cy='3.6' r='.3'/>
        <circle cx='5.2' cy='3.6' r='.3'/>
        <circle cx='6.8' cy='3.6' r='.3'/>
        <circle cx='2.0' cy='5.0' r='.3'/>
        <circle cx='3.6' cy='5.0' r='.3'/>
        <circle cx='5.2' cy='5.0' r='.3'/>
        <circle cx='6.8' cy='5.0' r='.3'/>
      </g>
    </svg>
  `
}
</script>
