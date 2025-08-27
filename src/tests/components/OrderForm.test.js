import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderForm from '../../components/OrderForm.vue'

function mountForm(props = {}) {
  return mount(OrderForm, { props })
}

describe('OrderForm', () => {
  it('emite close ao clicar fora do modal e no botão Cancelar', async () => {
    const wrapper = mountForm()

    await wrapper.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()

    await wrapper.find('button[type="button"]').trigger('click')
    expect(wrapper.emitted('close').length).toBeGreaterThanOrEqual(2)
  })

  it('cria pedido novo e emite submit com os dados do formulário', async () => {
    const wrapper = mountForm()

    const textInputs = wrapper.findAll('input[type="text"]')
    const numberInput = wrapper.find('input[type="number"]')
    const emailInput = wrapper.find('input[type="email"]')
    const telInput = wrapper.find('input[type="tel"]')
    const selects = wrapper.findAll('select')
    const textarea = wrapper.find('textarea')

    await textInputs[0].setValue('Buyer X')
    await numberInput.setValue('123.45')
    await selects[0].setValue('Confirmed')
    await selects[1].setValue('BRL')
    await textInputs[1].setValue('Alice')
    await emailInput.setValue('alice@example.com')
    await telInput.setValue('+55 11 99999-9999')
    await textInputs[2].setValue('ACME')
    await textInputs[3].setValue('X123')
    await textarea.setValue('Rua 1, 100')

    await wrapper.find('form').trigger('submit')

    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    const payload = emitted[0][0]

    expect(payload).toMatchObject({
      buyer: 'Buyer X',
      price: 123.45,
      status: 'Confirmed',
      currency: 'BRL',
      contactName: 'Alice',
      contactEmail: 'alice@example.com',
      contactPhone: '+55 11 99999-9999',
      supplierName: 'ACME',
      supplierCode: 'X123',
      supplierAddress: 'Rua 1, 100'
    })
  })

  it('preenche campos no modo edição e mostra botão Salvar', async () => {
    const order = {
      header: {
        buyer: 'Buyer Old',
        price: 10,
        status: 'Need to confirm',
        currency: 'USD',
        contact: { name: 'Bob', email: 'bob@example.com', phone: '123' }
      },
      supplier: {
        name: 'Supplier A', code: 'S1', address: 'Addr'
      }
    }

    const wrapper = mountForm({ order })

    const submitBtn = wrapper.find('button[type="submit"]')
    expect(submitBtn.text()).toContain('Salvar')

    const textInputs = wrapper.findAll('input[type="text"]')
    await textInputs[0].setValue('Buyer New')

    await wrapper.find('form').trigger('submit')

    const payload = wrapper.emitted('submit')[0][0]
    expect(payload.buyer).toBe('Buyer New')
    expect(payload.status).toBe('Need to confirm')
  })

  it('desabilita botão e mostra "Salvando..." quando loading=true', async () => {
    const wrapper = mountForm({ loading: true })
    const submitBtn = wrapper.find('button[type="submit"]')
    expect(submitBtn.attributes('disabled')).toBeDefined()
    expect(submitBtn.text()).toContain('Salvando...')
  })
})
