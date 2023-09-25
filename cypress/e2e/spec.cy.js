describe('url shortener on page load', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'data'
    })
    cy.visit("http://localhost:3000")
  })

  it('should have a title, 2 input fields, and a button', () => {
    cy.get('h1').should('exist').contains('URL Shortener')
    cy.get('[placeholder="Title..."]').should('exist')
    cy.get('[placeholder="URL to Shorten..."]').should('exist')
    cy.get('button').should('exist')
  })
  
  it('should show existing shortened url', () => {
    cy.get('section')
    .children()
    .get(':nth-child(1)')
    .contains('http://localhost')
  })

  it('should allow user to fill out form', () => {
    cy.get('[placeholder="Title..."]').type('testTitle')
    cy.get('[placeholder="URL to Shorten..."]').type('testDescription')
    cy.get('button').first().click()
    cy.get('section > :nth-child(3)').contains('a', 'http://localhost:3001')
  })


})
