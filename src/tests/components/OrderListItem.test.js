import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderListItem from '../../components/OrderListItem.vue'

function makeOrder(overrides = {}) {
  return {
    id: 123,
    header: {
      number: 4510001234,
      serial: 10023456,
      buyer: 'Buyer Test',
      price: 1500,
      currency: 'USD',
      status: 'Confirmed',
      createdAt: '2024-01-02T03:04:00.000Z',
      contact: {
        name: 'Alice',
        email: 'alice@example.com',
        phone: '+55 11 99999-9999',
      },
    },
    supplier: {
      name: 'ACME',
    },
    ...overrides,
  }
}

describe('OrderListItem', () => {
  it('exibe dados básicos do pedido e status traduzido', () => {
    const wrapper = mount(OrderListItem, {
      props: { order: makeOrder() },
    })

    expect(wrapper.text()).toContain('Buyer Test')
    expect(wrapper.text()).toContain('4510001234')
    expect(wrapper.text()).toContain('USD')
    expect(wrapper.text()).toMatch(/1[,.]500/)
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('alice@example.com')

    expect(wrapper.text()).toContain('Confirmado')

    const badge = wrapper.find('span.inline-flex')
    expect(badge.exists()).toBe(true)
    expect(badge.classes().join(' ')).toContain('bg-green-100')
  })

  it('aplica classes de status corretas para Shipped e Need to confirm', () => {
    const shipped = mount(OrderListItem, {
      props: { order: makeOrder({ header: { ...makeOrder().header, status: 'Shipped' } }) },
    })
    expect(shipped.find('span.inline-flex').classes().join(' ')).toContain('bg-blue-100')

    const pending = mount(OrderListItem, {
      props: { order: makeOrder({ header: { ...makeOrder().header, status: 'Need to confirm' } }) },
    })
    expect(pending.find('span.inline-flex').classes().join(' ')).toContain('bg-yellow-100')
  })
})
