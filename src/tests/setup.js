import { config } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '../i18n/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

i18n.global.locale.value = 'pt-BR'

config.global.plugins = [router, i18n]
