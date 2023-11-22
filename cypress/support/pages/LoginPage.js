import BasePage from "./BasePage";
import {checkValidationForRegistrationOrLoginFields, fillInFields} from "../helpersFunction";
class LoginPage extends BasePage {

    constructor() {
        super();
        this.elements.notYetCustomerLink = 'div #newCustomerLink';
         this.elements.loginPageTitle = 'h1';
         this.elements.emailLoginField = '#email';
         this.elements.passwordLoginField = '#password';
         this.elements.rememberMeCheckbox = '#rememberMe';
         this.elements.submitLoginFormButton = '#loginButton';

    }

    getNotYetCustomerLink(){
        return cy.get(this.elements.notYetCustomerLink);
    }
    getRememberMeCheckbox(){
        return cy.get(this.elements.rememberMeCheckbox);
    }
    getSubmitLoginFormButton(){
        return cy.get(this.elements.submitLoginFormButton);
    }




    loginPageTitleIsExist(){
        cy.get(this.elements.loginPageTitle)
            .should("contain.text", "Login");
        cy.log("Page has Login title");
    }

    loginPageHasRightUrl(){
        cy.url()
            .should('eq', "https://juice-shop-sanitarskyi.herokuapp.com/#/login");
    }

    fillInLoginFields(user){
        fillInFields(this.elements.emailLoginField, user.email);
        fillInFields(this.elements.passwordLoginField, user.password);
        cy.log("Login fields are filled in");
    }

    checkErrorMessagesForEmptyRegistrationFields(){
        checkValidationForRegistrationOrLoginFields(this.elements.emailLoginField);
        checkValidationForRegistrationOrLoginFields(this.elements.passwordLoginField);
        cy.log("Error messages checked for login fields");
    }

    }
export default new LoginPage();