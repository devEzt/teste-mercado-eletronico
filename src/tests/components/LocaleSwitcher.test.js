import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LocaleSwitcher from '../../components/LocaleSwitcher.vue'

beforeEach(() => {
  localStorage.clear()
})

describe('LocaleSwitcher', () => {
  it('altera o idioma para EN e volta para PT, persistindo no localStorage', async () => {
    const wrapper = mount(LocaleSwitcher)

    const buttons = wrapper.findAll('button')
    const ptBtn = buttons[0]
    const enBtn = buttons[1]

    // muda para EN
    await enBtn.trigger('click')
    expect(enBtn.attributes('aria-pressed')).toBe('true')
    expect(ptBtn.attributes('aria-pressed')).toBe('false')
    expect(localStorage.getItem('locale')).toBe('en-US')

    // volta para PT
    await ptBtn.trigger('click')
    expect(ptBtn.attributes('aria-pressed')).toBe('true')
    expect(enBtn.attributes('aria-pressed')).toBe('false')
    expect(localStorage.getItem('locale')).toBe('pt-BR')
  })
})
