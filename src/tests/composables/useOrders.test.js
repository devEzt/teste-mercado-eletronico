import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { useOrders } from '../../composables/useOrders'

vi.mock('axios', () => ({
  default: {
    get: vi.fn()
  }
}))

describe('useOrders composable', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  it('inicia com estado padrão vazio', () => {
    const {
      orders,
      loading,
      error,
      ordersCount,
      hasOrders,
      realOrders,
      mockOrdersCount,
      canEdit
    } = useOrders()

    expect(orders.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
    expect(ordersCount.value).toBe(0)
    expect(hasOrders.value).toBe(false)
    expect(realOrders.value).toEqual([])
    expect(mockOrdersCount.value).toBe(0)
    expect(canEdit({ isMock: true })).toBe(true)
    expect(canEdit({ isMock: false })).toBe(false)
  })

  it('addOrder adiciona pedido mock com id incremental', () => {
    const { addOrder, orders, ordersCount, mockOrdersCount } = useOrders()

    const o1 = addOrder({ buyer: 'Buyer 1', price: 100 })
    const o2 = addOrder({ buyer: 'Buyer 2', price: 200 })

    expect(o1.id).toBe(1)
    expect(o2.id).toBe(2)
    expect(orders.value).toHaveLength(2)
    expect(ordersCount.value).toBe(2)
    expect(mockOrdersCount.value).toBe(2)
    expect(o1.isMock).toBe(true)
  })

  it('updateOrder atualiza pedido mock e lança erro para pedido real', async () => {
    const { addOrder, updateOrder, fetchOrders } = useOrders()

    const o1 = addOrder({ buyer: 'Old', price: 10, status: 'Need to confirm' })
    const updated = updateOrder(o1.id, { buyer: 'New Buyer', price: 999, status: 'Confirmed' })
    expect(updated.header.buyer).toBe('New Buyer')
    expect(updated.header.price).toBe(999)
    expect(updated.header.status).toBe('Confirmed')

    axios.get.mockResolvedValueOnce({
      data: {
        header: { price: 50, currency: 'USD', status: 'Confirmed', createdAt: new Date().toISOString() }
      }
    })
    await fetchOrders()

    expect(() => updateOrder(1, { buyer: 'Should fail' })).toThrow('Pedidos reais não podem ser editados')
  })

  it('deleteOrder remove mock e impede remoção de pedido real', async () => {
    const { addOrder, deleteOrder, fetchOrders, orders } = useOrders()

    const o1 = addOrder({ buyer: 'X' })
    expect(deleteOrder(o1.id)).toBe(true)
    expect(orders.value.find(o => o.id === o1.id)).toBeUndefined()

    axios.get.mockResolvedValueOnce({
      data: {
        header: { price: 10, currency: 'USD', status: 'Confirmed', createdAt: new Date().toISOString() }
      }
    })
    await fetchOrders()

    expect(() => deleteOrder(1)).toThrow('Pedidos reais não podem ser deletados')
  })

  it('fetchOrders popula pedido real quando API responde e mantém vazio quando falha', async () => {
    const { fetchOrders, orders, error, realOrders, ordersCount } = useOrders()

    axios.get.mockResolvedValueOnce({
      data: {
        header: { price: 123, currency: 'USD', status: 'Confirmed', createdAt: new Date().toISOString() },
        supplier: { name: 'ACME' }
      }
    })
    let res = await fetchOrders()
    expect(Array.isArray(res)).toBe(true)
    expect(orders.value).toHaveLength(1)
    expect(orders.value[0].id).toBe(1)
    expect(orders.value[0].isMock).toBe(false)
    expect(realOrders.value).toHaveLength(1)

    axios.get.mockRejectedValueOnce(new Error('Network down'))
    res = await fetchOrders()
    expect(res).toEqual([])
    expect(ordersCount.value).toBe(0) 
    expect(error.value).toBe(null) 
  })

  it('getOrderById retorna o pedido correto e undefined para inexistente', () => {
    const { addOrder, getOrderById } = useOrders()
    const a = addOrder({ buyer: 'A' })
    const b = addOrder({ buyer: 'B' })
    expect(getOrderById(a.id).header.buyer).toBe('A')
    expect(getOrderById(b.id).header.buyer).toBe('B')
    expect(getOrderById(9999)).toBeUndefined()
  })

  it('updateOrder mantém valores originais quando campos não são passados ou são strings vazias', () => {
    const { addOrder, updateOrder } = useOrders()
    const o = addOrder({ buyer: 'Buyer Base', price: 10, currency: 'USD', status: 'Need to confirm', contactName: 'C1' })

    const u1 = updateOrder(o.id, {})
    expect(u1.header.buyer).toBe('Buyer Base')
    expect(u1.header.price).toBe(10)
    expect(u1.header.currency).toBe('USD')
    expect(u1.header.status).toBe('Need to confirm')
    expect(u1.header.contact.name).toBe('C1')

    const u2 = updateOrder(o.id, { buyer: '' })
    expect(u2.header.buyer).toBe('Buyer Base')
  })

  it('computeds refletem mocks e pedidos reais', async () => {
    const { addOrder, fetchOrders, ordersCount, realOrders, mockOrdersCount } = useOrders()

    addOrder({ buyer: 'Mock 1' })
    addOrder({ buyer: 'Mock 2' })
    expect(ordersCount.value).toBe(2)
    expect(mockOrdersCount.value).toBe(2)
    expect(realOrders.value.length).toBe(0)

    axios.get.mockResolvedValueOnce({
      data: {
        header: { price: 1, currency: 'USD', status: 'Confirmed', createdAt: new Date().toISOString() }
      }
    })
    await fetchOrders()
    expect(ordersCount.value).toBe(1)
    expect(realOrders.value.length).toBe(1)
    expect(mockOrdersCount.value).toBe(0)
  })
})
