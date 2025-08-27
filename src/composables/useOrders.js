import { ref, computed } from 'vue'
import axios from 'axios'

const API_BASE_URL = '/api'

export const useOrders = () => {
  const orders = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchOrders = async () => {
    try {
      loading.value = true
      error.value = null
      
      // Busca order 1 da API
      let apiOrder = null
      try {
        console.log('Fazendo request para:', `${API_BASE_URL}/orders/1`)
        const response = await axios.get(`${API_BASE_URL}/orders/1`)
        console.log('Response recebida:', response.data)
        apiOrder = response.data
      } catch (error) {
        console.warn('API não disponível para order 1:', error.message)
        console.error('Erro completo:', error)
      }
      
      const allOrders = []
      
      if (apiOrder) {
        allOrders.push({ 
          id: 1, 
          isMock: false,
          ...apiOrder 
        })
      }
      
      orders.value = allOrders
      return allOrders
    } catch (err) {
      error.value = 'Erro ao buscar pedidos'
      console.error('Error fetching orders:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getOrderById = (id) => {
    return orders.value.find(order => order.id === Number(id))
  }

  const addOrder = (orderData) => {
    const newId = Math.max(...orders.value.map(o => o.id), 0) + 1
    const newOrder = {
      id: newId,
      isMock: true,
      header: {
        number: Math.floor(Math.random() * 1000000) + 4510000000,
        serial: Math.floor(Math.random() * 100000) + 10000000,
        buyer: orderData.buyer || '',
        price: orderData.price || 0,
        currency: orderData.currency || 'USD',
        createdAt: new Date().toISOString(),
        status: orderData.status || 'Need to confirm',
        contact: {
          name: orderData.contactName || '',
          email: orderData.contactEmail || '',
          phone: orderData.contactPhone || '',
          fax: orderData.contactFax || ''
        }
      },
      supplier: {
        code: orderData.supplierCode || '',
        name: orderData.supplierName || '',
        document: { 
          type: "CNPJ", 
          value: orderData.supplierDocument || '' 
        },
        address: orderData.supplierAddress || '',
        contact: {
          name: orderData.supplierContactName || '',
          email: orderData.supplierContactEmail || '',
          phone: orderData.supplierContactPhone || ''
        },
        readAt: new Date().toISOString()
      },
      addresses: [
        {
          label: "Ship To",
          name: orderData.shipToName || '',
          code: orderData.shipToCode || '',
          address: orderData.shipToAddress || '',
          contact: {
            name: orderData.shipToContactName || '',
            email: orderData.shipToContactEmail || '',
            phone: orderData.shipToContactPhone || ''
          }
        }
      ]
    }
    
    orders.value.push(newOrder)
    return newOrder
  }

  const updateOrder = (id, orderData) => {
    const orderIndex = orders.value.findIndex(order => order.id === Number(id))
    if (orderIndex === -1) return null
    
    const order = orders.value[orderIndex]
    
    if (!order.isMock) {
      throw new Error('Pedidos reais não podem ser editados')
    }
    
    const updatedOrder = {
      ...order,
      header: {
        ...order.header,
        buyer: orderData.buyer || order.header.buyer,
        price: orderData.price || order.header.price,
        currency: orderData.currency || order.header.currency,
        status: orderData.status || order.header.status,
        contact: {
          ...order.header.contact,
          name: orderData.contactName || order.header.contact.name,
          email: orderData.contactEmail || order.header.contact.email,
          phone: orderData.contactPhone || order.header.contact.phone,
          fax: orderData.contactFax || order.header.contact.fax
        }
      },
      supplier: {
        ...order.supplier,
        code: orderData.supplierCode || order.supplier.code,
        name: orderData.supplierName || order.supplier.name,
        document: { 
          ...order.supplier.document,
          value: orderData.supplierDocument || order.supplier.document.value 
        },
        address: orderData.supplierAddress || order.supplier.address,
        contact: {
          ...order.supplier.contact,
          name: orderData.supplierContactName || order.supplier.contact.name,
          email: orderData.supplierContactEmail || order.supplier.contact.email,
          phone: orderData.supplierContactPhone || order.supplier.contact.phone
        }
      }
    }
    
    orders.value[orderIndex] = updatedOrder
    return updatedOrder
  }

  const deleteOrder = (id) => {
    const orderIndex = orders.value.findIndex(order => order.id === Number(id))
    if (orderIndex === -1) return false
    
    const order = orders.value[orderIndex]
    
    // Só permite deletar orders mockadas
    if (!order.isMock) {
      throw new Error('Pedidos reais não podem ser deletados')
    }
    
    orders.value.splice(orderIndex, 1)
    return true
  }

  // Computed properties
  const ordersCount = computed(() => orders.value.length)
  const hasOrders = computed(() => orders.value.length > 0)
  const realOrders = computed(() => orders.value.filter(order => !order.isMock))
  const mockOrdersCount = computed(() => orders.value.filter(order => order.isMock).length)
  const canEdit = (order) => order?.isMock === true

  return {
    orders,
    loading,
    error,
    
    fetchOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
    
    ordersCount,
    hasOrders,
    realOrders,
    mockOrdersCount,
    canEdit
  }
}
