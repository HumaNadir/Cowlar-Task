/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })
describe ("Visit TOOLS QA Page", () => {
    it("should display 'TOOLS QA' page",() =>{
        
        // Visit the URL
        cy.visit("https://demoqa.com")

        // click on the interaction tab
        cy.contains ("Interactions").click()
        cy.contains("Interactions").should("be.visible")
        
        
        // Verifying Sidebar contains following tabs
        cy.get(".left-pannel")
        .should("contain", "Elements")
        .and("contain", "Forms")
        .and("contain", "Alerts, Frame & Windows")
        .and("contain", "Widgets")
        .and("contain", "Interactions")
        .and("contain", "Book Store Application")

        // click on the resizable tab
        cy.contains("Resizable").click()
        cy.get(".main-header").should("contain", "Resizable")
        

        // Verifying the current height and width of Box 1
        cy.get("#resizableBoxWithRestriction")
        .should("have.css", "height", "200px")
        .and("have.css", "width", "200px")

        // Resizing Box 1
        cy.get("#resizableBoxWithRestriction .react-resizable-handle")
        .trigger("mousedown", { which: 1 })
        .trigger("mousemove", 250, 250, { force: true })
        .trigger("mouseup", { force: true })


        // Verifying resizable behavior constraints
        cy.get("#resizableBoxWithRestriction")
        .invoke("height").should("be.greaterThan", 150).and("be.lessThan",300)
        cy.get("#resizableBoxWithRestriction")
        .invoke("width").should("be.greaterThan", 150).and("be.lessThan",500)
    

        // verifying Box 2 is resizeable
        cy.get("#resizable .react-resizable-handle-se")
        .should("exist")

        cy.get("#resizable")
         .invoke("css", "width", "200px") 
         .invoke("css", "height", "250px") 
    
        // Verifying the dimensions after resizing
        cy.get("#resizable")
        .should("have.css", "width", "200px")
        .should("have.css", "height", "250px")
    
})

})