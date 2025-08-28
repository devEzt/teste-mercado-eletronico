describe('Create Mock Order Flow', () => {
  it('cria um novo pedido mock e o exibe na lista', () => {
    cy.visit('/orders')

    cy.contains('Nenhum pedido encontrado').should('be.visible')

    cy.contains('button', 'Novo Pedido').click()

    cy.contains('label', 'Comprador').parent().find('input').type('Cliente E2E')
    cy.contains('label', 'Preço').parent().find('input').clear().type('250')
    cy.contains('label', 'Status').parent().find('select').select('Confirmed')
    cy.contains('label', 'Moeda').parent().find('select').select('USD')

    cy.contains('label', 'Nome').parent().find('input').type('Contato E2E')
    cy.contains('label', 'Email').parent().find('input').type('contato@example.com')
    cy.contains('label', 'Telefone').parent().find('input').type('+55 11 90000-0000')

    cy.contains('label', 'Nome').parent().find('input').eq(1).type('Fornecedor E2E')
    cy.contains('label', 'Código').parent().find('input').type('F-001')
    cy.contains('label', 'Endereço').parent().find('textarea').type('Rua 1, 100')

    cy.contains('button', 'Criar Pedido').click()

    cy.contains('Buyer Test').should('not.exist')
    cy.contains('Cliente E2E').should('be.visible')
    cy.contains('Fornecedor E2E').should('not.exist')
  })
})
