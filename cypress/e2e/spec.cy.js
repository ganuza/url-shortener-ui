describe('url shortener on page load', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'data'
    }).as('getShortUrl')
    cy.visit("http://localhost:3000")
    cy.wait('@getShortUrl')
  })

  it('should have a title, 2 input fields, and a button', () => {
    cy.get('h1').should('exist').contains('URL Shortener')
    cy.get('[placeholder="Title..."]').should('exist')
    cy.get('[placeholder="URL to Shorten..."]').should('exist')
    cy.get('button').should('exist')
  })
  
  it('should show existing title, long url, and shortened url', () => {
    cy.get('section')
    .children()
    .get(':nth-child(1)').contains('Awesome photo')
    cy.get(':nth-child(1) > a').contains('http://localhost:3001/useshorturl/1')
    cy.get(':nth-child(1) > p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('should allow user to type into inputs', () => {
    cy.get('[placeholder="Title..."]').type('test2').should('have.value', 'test2')
    cy.get('[placeholder="URL to Shorten..."]').type('test description').should('have.value', 'test description')
  })

describe('Tests for POST', () => {

  it('should allow user to fill out form', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls',
    {
      statusCode:201,
      body: {"long_url": "https://images.unsplash.com/photo-1695790952932-386b9d66c18a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      "title": "Amazing Tree",
      "id": 28,
      "short_url": "http://localhost:3001/useshorturl/28"}
    })
    cy.get('[placeholder="Title..."]').type('Amazing Tree')
    cy.get('[placeholder="URL to Shorten..."]').type('https://images.unsplash.com/photo-1695790952932-386b9d66c18a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')
    cy.get('button').first().click()
    cy.get('section').children().should('have.length', 2)
    cy.get(':nth-child(2) > h3').contains('Amazing Tree')
    cy.get(':nth-child(2) > a').contains('http://localhost:3001/useshorturl/28')
    cy.get(':nth-child(2) > p').contains('https://images.unsplash.com/photo-1695790952932-386b9d66c18a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')
  })
})


})
