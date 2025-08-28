describe('Smoke E2E', () => {
  it('carrega a home e navega para Pedidos', () => {
    cy.visit('/')

    cy.contains('OrderManager').should('be.visible')

    cy.contains('Ver todos').click({ force: true })

    cy.location('pathname').should('eq', '/orders')
    cy.contains('Meus Pedidos').should('be.visible')
  })
})
