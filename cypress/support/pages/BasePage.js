export default class BasePage {

    constructor() {
        this.elements = {};
        this.elements.accountButton = '#navbarAccount';
        this.elements.loginButton = '#navbarLoginButton';
        this.elements.userToolBar = '#mat-menu-panel-0';
        this.elements.hamburgerMenuButton = '[fxlayout="row"] .mat-button-wrapper mat-icon';
    }

    getLoginButton() {
        return cy.get(this.elements.loginButton);
    }

    getAccountButton() {
        return cy.get(this.elements.accountButton);
    }

    getUserToolBar() {
        return cy.get(this.elements.userToolBar);
    }

    getHamburgerMenuButton() {
        return cy.get(this.elements.hamburgerMenuButton).eq(0);
    }


    openLoginPage() {
        this.getAccountButton().click();
        this.getLoginButton().click();
        cy.log("Login page is opened");
    }

    checkLocationOnGeneralPage() {
        cy.url().should('include', '/#/search');
    }

    checkAccountToolBarContainUsersEmail(user) {
        this.getAccountButton().click();
        this.getUserToolBar().should("contain.text", user.email);
        cy.log("Toolbar contains user's email");
    }

    openHamburgerMenu() {
        this.getHamburgerMenuButton().click();
    }


}