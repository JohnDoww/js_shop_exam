import user from '../fixtures/user.json';
import {closeStartedPopUps} from "../support/helpersFunction";
import BasePage from "../support/pages/BasePage";
import loginPage from "../support/pages/LoginPage";

const basePage = new BasePage();

describe('Login flow', () => {


    beforeEach(() => {
        cy.visit('/');
        closeStartedPopUps();
    })

    it('Login', () => {

        basePage.openLoginPage();

        loginPage.fillInLoginFields(user);

        loginPage.getRememberMeCheckbox().click();
        loginPage.getSubmitLoginFormButton().click();

        basePage.checkLocationOnGeneralPage();
        basePage.checkAccountToolBarContainUsersEmail(user);
    })

    it('Check error messages for empty login fields', () => {
        basePage.openLoginPage();
        loginPage.checkErrorMessagesForEmptyRegistrationFields();
    })

})