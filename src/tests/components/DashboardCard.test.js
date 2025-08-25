import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardCard from '../../components/DashboardCard.vue'

describe('DashboardCard', () => {
  it('renders card with title and value', () => {
    const wrapper = mount(DashboardCard, {
      props: {
        title: 'Total Orders',
        value: '42',
        icon: 'ShoppingBagIcon',
        color: 'blue'
      }
    })

    expect(wrapper.text()).toContain('Total Orders')
    expect(wrapper.text()).toContain('42')
  })

  it('applies correct color classes', () => {
    const wrapper = mount(DashboardCard, {
      props: {
        title: 'Test',
        value: '1',
        icon: 'ShoppingBagIcon',
        color: 'green'
      }
    })

    expect(wrapper.find('.bg-green-100').exists()).toBe(true)
    expect(wrapper.find('.text-green-600').exists()).toBe(true)
  })
})
