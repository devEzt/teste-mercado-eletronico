import { describe, it, expect, beforeEach } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import Layout from '../../components/Layout.vue'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('Layout', () => {
  it('alternar tema adiciona/remove classe dark e persiste no localStorage', async () => {
    const wrapper = mount(Layout, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(document.documentElement.classList.contains('dark')).toBe(false)

    const toggleButtons = wrapper.findAll('button[aria-label="Alternar tema"]')
    expect(toggleButtons.length).toBeGreaterThan(0)
    await toggleButtons[0].trigger('click')

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')

    await toggleButtons[0].trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
