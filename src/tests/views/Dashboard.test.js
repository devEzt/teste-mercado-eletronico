import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { mount, RouterLinkStub } from '@vue/test-utils'

vi.mock('../../composables/useOrders', () => {
  const makeOrder = (id, { price, status, createdAt }) => ({
    id,
    isMock: false,
    header: {
      number: 4510000000 + id,
      buyer: `Buyer ${id}`,
      price,
      currency: 'USD',
      status,
      createdAt,
      contact: { name: `Contact ${id}` }
    }
  })

  const orders = ref([
    makeOrder(1, { price: 100, status: 'Confirmed', createdAt: '2024-01-01T10:00:00.000Z' }),
    makeOrder(2, { price: 200, status: 'Need to confirm', createdAt: '2024-01-02T10:00:00.000Z' }),
    makeOrder(3, { price: 300, status: 'Confirmed', createdAt: '2024-01-03T10:00:00.000Z' }),
    makeOrder(4, { price: 400, status: 'Shipped', createdAt: '2024-01-04T10:00:00.000Z' }),
    makeOrder(5, { price: 500, status: 'Shipped', createdAt: '2024-01-05T10:00:00.000Z' }),
    makeOrder(6, { price: 600, status: 'Need to confirm', createdAt: '2024-01-06T10:00:00.000Z' }),
  ])

  return {
    useOrders: () => ({ orders, fetchOrders: vi.fn(), loading: ref(false) })
  }
})

import Dashboard from '../../views/Dashboard.vue'

describe('Dashboard view', () => {
  it('renderiza cards com totais corretos e lista de recentes', async () => {
    const DashboardCardStub = {
      name: 'DashboardCard',
      props: ['title', 'value', 'icon', 'color'],
      template: '<div class="card">{{ title }}|{{ value }}</div>'
    }

    const wrapper = mount(Dashboard, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          DashboardCard: DashboardCardStub,
        },
      },
    })

    const cards = wrapper.findAll('.card')
    expect(cards.length).toBe(4)

    const totalOrders = cards.find(c => c.text().startsWith('Total de Pedidos|'))
    expect(totalOrders).toBeTruthy()
    expect(totalOrders.text()).toBe('Total de Pedidos|6')

    const totalValueCard = cards.find(c => c.text().startsWith('Valor Total|'))
    expect(totalValueCard).toBeTruthy()
    const valueText = totalValueCard.text().split('|')[1]
    const onlyDigits = valueText.replace(/[^0-9]/g, '')
    expect(onlyDigits).toBe(String(100 + 200 + 300 + 400 + 500 + 600)) // 2100

    const confirmedCard = cards.find(c => c.text().startsWith('Confirmados|'))
    expect(confirmedCard).toBeTruthy()
    expect(confirmedCard.text()).toBe('Confirmados|2')

    const pendingCard = cards.find(c => c.text().startsWith('Pendentes|'))
    expect(pendingCard).toBeTruthy()
    expect(pendingCard.text()).toBe('Pendentes|2')

    const rlStubs = wrapper.findAllComponents(RouterLinkStub)
    expect(rlStubs.length).toBeGreaterThanOrEqual(6)
  })
})
