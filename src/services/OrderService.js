import { ref } from 'vue'
import axios from 'axios'

export const useOrders = () => {
  const orders = ref([])
  const loading = ref(true)
  const error = ref(null)

  const fetchOrders = async () => {
    try {
      loading.value = true
      // Use real API data as base and create variations
      const response = await axios.get('https://api.mercadoe.space/orders/1')
      const originalOrder = response.data
      
      // Add ID to original order and create variations
      const baseOrder = { ...originalOrder, id: 1 }
      
      const mockOrder = {
        id: 1,
        header: {
          number: 4510001114,
          serial: 11223344,
          buyer: "MTP West Buyer",
          price: 20000,
          currency: "USD",
          createdAt: "2020-04-16T15:32:55.382Z",
          status: "Need to confirm",
          contact: {
            name: "Jacksonville Group (Jason Burn)",
            email: "jacksonvillegroup@me.com",
            phone: "903-575-3050",
            fax: "999-575-3050"
          }
        },
        supplier: {
          code: "101908",
          name: "Industrial Motion Equipment",
          document: { type: "CNPJ", value: "00.823.053/0001-02" },
          address: "P Box 2588 - Houston TX - 77001-2588 - United States of America",
          contact: {
            name: "John Smith",
            email: "john.smith@industrialmotion.com",
            phone: "800-297-6622"
          },
          readAt: "2020-05-23T14:30:00.000Z"
        },
        addresses: [
          {
            label: "Ship To",
            name: "MTP West Plant",
            code: "TR01",
            address: "1234 Industrial Way, Houston, TX 77001, United States",
            contact: {
              name: "Michael Johnson",
              email: "michael.johnson@mtpwest.com",
              phone: "713-555-1234"
            }
          },
          {
            label: "Bill To",
            name: "MTP Corporate",
            code: "BILL01",
            address: "500 Corporate Dr, Houston, TX 77002, United States",
            contact: {
              name: "Accounting Department",
              email: "ap@mtpcorp.com",
              phone: "713-555-5678"
            }
          }
        ]
      }

      // Create variations of the order
      orders.value = [
        mockOrder,
        {
          ...mockOrder,
          id: 2,
          header: {
            ...mockOrder.header,
            number: mockOrder.header.number + 1,
            serial: mockOrder.header.serial + 1,
            price: mockOrder.header.price * 1.75,
            status: "Confirmed",
            createdAt: "2020-04-17T10:15:30.120Z",
            contact: {
              ...mockOrder.header.contact,
              name: "Jacksonville Group (Sarah Williams)",
              email: "sarah.williams@groups.com",
              phone: "903-575-3051",
              fax: "999-575-3051"
            }
          },
          supplier: {
            ...mockOrder.supplier,
            code: "101909",
            name: "Advanced Motion Systems INC.",
            readAt: "2020-05-24T08:30:15.200Z",
            document: { type: "CNPJ", value: "00.823.053/0001-03" },
            contact: {
              name: "Sarah Johnson Miller",
              email: "sarah.j.miller@advancedmotion.com",
              phone: "800-297-6633",
              fax: "800-297-6634"
            }
          },
          addresses: mockOrder.addresses.map((addr, index) => ({
            ...addr,
            name: index === 0 ? "East Plant" : addr.name,
            code: index === 0 ? "TR02" : addr.code,
            address: index === 0 
              ? "2455 E Commerce St, Houston, TX 77003, United States" 
              : addr.address,
            contact: {
              ...addr.contact,
              name: index === 0 ? "Carlos Roberto Silva" : addr.contact.name,
              email: index === 0 ? "carlos.shipping@eastplant.com" : addr.contact.email,
              phone: index === 0 ? "713-456-7890" : addr.contact.phone
            }
          }))
        },
        {
          ...mockOrder,
          id: 3,
          header: {
            ...mockOrder.header,
            number: mockOrder.header.number + 2,
            serial: mockOrder.header.serial + 2,
            price: Math.floor(mockOrder.header.price * 0.65),
            status: "Shipped",
            createdAt: "2020-04-18T14:22:45.890Z",
            contact: {
              ...mockOrder.header.contact,
              name: "Jacksonville Group (Michael Chen)",
              email: "michael.chen@groups.com",
              phone: "903-575-3052",
              fax: "999-575-3052"
            }
          },
          supplier: {
            ...mockOrder.supplier,
            code: "101910",
            name: "Industrial Motion Corp.",
            readAt: "2020-05-25T11:45:33.150Z",
            document: { type: "CNPJ", value: "00.823.053/0001-04" },
            contact: {
              name: "Robert Anderson Smith",
              email: "robert.anderson@industrialmotion.com",
              phone: "800-298-7744",
              fax: "800-298-7745"
            }
          }
        }
      ]
      
      return orders.value
    } catch (err) {
      console.error('Error fetching orders:', err)
      error.value = 'Failed to fetch orders'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getOrderById = (id) => {
    return orders.value.find(order => order.id === Number(id))
  }

  return {
    orders,
    loading,
    error,
    fetchOrders,
    getOrderById
  }
}

export default useOrders
