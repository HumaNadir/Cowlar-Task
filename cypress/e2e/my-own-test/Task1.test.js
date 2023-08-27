/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })
describe ("Visit TOOLS QA Page", () => {
    it("should fill out the practice form, submit form and verify form information" ,() =>{

        cy.viewport(1700, 1200)
         // Visit the URL
        cy.visit("https://demoqa.com")
        
        // click on the form
        cy.contains ("Forms").click()
        // click on practice form tab
        cy.contains("Practice Form").click()
        // Form Filling
        cy.get("#firstName").type("Cowlar")
        cy.get("#lastName").type("Developer")
        cy.get("#userEmail").type("qaengineer@cowlar.com")
        cy.get("#genterWrapper").contains("Male").click()
        cy.get("#userNumber").type("0123456789")
        cy.get("#subjectsWrapper").click().type("Computer Science{enter}")
        cy.get('#hobbies-checkbox-3').check({ force: true })
        cy.get("#currentAddress-wrapper").type("Address 1")
        cy.get("#state").click().type("NCR{enter}")
        cy.get("#city").click().type("Delhi{enter}")     
        //submit form
        cy.get("#submit").click()

        //Verifying modal information
        cy.get(".modal-body")
        .should("contain", "Cowlar")
        .and("contain", "Developer")
        .and("contain", "qaengineer@cowlar.com")
        .and("contain", "Male")
        .and("contain", "0123456789")
        .and("contain", "27 August,2023")
        .and("contain", "Computer Science")
        .and("contain", "Music")
        .and("contain", "NCR")
        .and("contain", "Delhi")
        //close modal
        cy.get("#closeLargeModal").click({ force: true })

        
    })
   
})