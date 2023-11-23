import {faker} from '@faker-js/faker';
import user from '../fixtures/user.json';
import {closeStartedPopUps} from "../support/helpersFunction";
import BasePage from "../support/pages/BasePage";
import loginPage from "../support/pages/LoginPage";
import registrationPage from "../support/pages/RegistrationPage";

const basePage = new BasePage();


describe('Registration flow', () => {


    beforeEach(() => {
        cy.visit('/');
        closeStartedPopUps();
    })

    it('New user registration', () => {
        // user.email = faker.internet.email({lastName: "test"});
        // uncomment line above for further registrations,  because of every day cleaning DB on the web site

        basePage.openLoginPage();

        loginPage.getNotYetCustomerLink().click();

        registrationPage.fillInRegistrationFields(user);
        registrationPage.getSubmitRegistrationButton().click();

        loginPage.loginPageTitleIsExist();
        loginPage.loginPageHasRightUrl();
    })

    it('Check error messages for empty registration fields', () => {

        basePage.openLoginPage();

        loginPage.getNotYetCustomerLink().click();

        registrationPage.checkErrorMessagesForEmptyRegistrationFields();
    })

})