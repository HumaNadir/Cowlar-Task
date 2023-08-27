/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })

  describe("Intercept and Verify API Response", () => {
    it("should intercept and verify the API response", () => {
      // Intercept the API request and capture the response
      cy.intercept("GET", "https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574").as("getBookDetails")
  
      // Visit the URL
      cy.visit("https://demoqa.com/")
      cy.get('img[src="/images/Toolsqa.jpg"]').should("be.visible")
  
      // Click on Book Store Application Card/Button
      cy.contains("Book Store Application").click()
      cy.url().should("include", "/books")

  
      // Click on Book Store Tab under Book Store Application section
      cy.contains("Book Store").click()
      cy.get(".main-header").should("contain", "Book Store")

     
  
      // Click on the specific book named "Understanding ECMAScript 6"
      cy.contains("Understanding ECMAScript 6").click()
      //verify some attributes of the book
      cy.get(".profile-wrapper")
        .should("contain", "Author").and("contain","Nicholas C. Zakas")
        .should("contain", "Publisher").and("contain","No Starch Press")
  
      // Waiting for the API response to be intercepted and verifying response
      cy.wait("@getBookDetails", { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.deep.equal({
          "isbn": "9781593277574",
          "title": "Understanding ECMAScript 6",
          "subTitle": "The Definitive Guide for JavaScript Developers",
          "author": "Nicholas C. Zakas",
          "publish_date": "2016-09-03T00:00:00.000Z",
          "publisher": "No Starch Press",
          "pages": 352,
          "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
          "website": "https://leanpub.com/understandinges6/read"
        
        })
      })
    })
  })