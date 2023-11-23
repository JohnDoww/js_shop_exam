import BasePage from "./BasePage";
import {fillInFields, fillInFieldsWithSelect} from "../helpersFunction";


class FillInOrderPage extends BasePage {
    constructor() {
        super();
        this.elements.countryFieldAddressPage = '[placeholder="Please provide a country."]';
        this.elements.userNameFieldAddressPage = '[placeholder="Please provide a name."]';
        this.elements.mobileNumberFieldAddressPage = '[placeholder="Please provide a mobile number."]';
        this.elements.zipCodeFieldAddressPage = '[placeholder="Please provide a ZIP code."]';
        this.elements.addressFieldAddressPage = '#address';
        this.elements.cityFieldAddressPage = '[placeholder="Please provide a city."]';
        this.elements.stateFieldAddressPage = '[placeholder="Please provide a state."]';

        this.elements.OwnersCardNameField = '#mat-input-8';
        this.elements.cardNumberField = '[type="number"]';
        this.elements.monthsOfCardField = '#mat-input-10';
        this.elements.yearOfCardField = '#mat-input-11';

        this.elements.addNewPayCardDropDown = '#mat-expansion-panel-header-0';
        this.elements.submitFormButton = '#submitButton';
        this.elements.checkoutButton = '#checkoutButton';

        this.elements.addNewAddressButton = '[aria-label="Add a new address"]';

        this.elements.selectPayCardRadioBtn = '[class="mat-radio-button mat-accent"]';
        this.elements.selectAddressRadioBtn = '[class="mat-radio-label"]';

        this.elements.deliveryTypesRadioBtn = '[class="mat-radio-button mat-accent"]';

        this.elements.continueFromAddressButton = '.mat-focus-indicator.btn.btn-next';
        this.elements.continueButton = '.mat-focus-indicator.btn.nextButton';

    }


    getCheckoutButton() {
        return cy.get(this.elements.checkoutButton);
    }

    getAddNewPayCardDropDown() {
        return cy.get(this.elements.addNewPayCardDropDown);
    }

    getSubmitFormButton() {
        return cy.get(this.elements.submitFormButton);
    }

    getAddNewAddressButton() {
        return cy.get(this.elements.addNewAddressButton);
    }

    getContinueFromAddressButton() {
        return cy.get(this.elements.continueFromAddressButton);
    }

    getContinueButton() {
        return cy.get(this.elements.continueButton);
    }


    addNewChippingAddress(user) {

        this.getAddNewAddressButton().click();

        this.getSubmitFormButton().should('have.attr', 'disabled');

        fillInFields(this.elements.countryFieldAddressPage, user.country);
        fillInFields(this.elements.userNameFieldAddressPage, user.userName);
        fillInFields(this.elements.mobileNumberFieldAddressPage, user.mobile_phone);
        fillInFields(this.elements.zipCodeFieldAddressPage, user.zip_code);
        fillInFields(this.elements.addressFieldAddressPage, user.address);
        fillInFields(this.elements.cityFieldAddressPage, user.city);
        fillInFields(this.elements.stateFieldAddressPage, user.state);

        this.getSubmitFormButton().should('not.have.attr', 'disabled');
        this.getSubmitFormButton().click({force: true});
        cy.log("Shipping address is added");

    }

    addNewPaymentMethod(user) {

        this.getAddNewPayCardDropDown().click();

        fillInFields(this.elements.OwnersCardNameField, user.userName);
        fillInFields(this.elements.cardNumberField, '4441223411123324');
        fillInFieldsWithSelect(this.elements.monthsOfCardField, "2");
        fillInFieldsWithSelect(this.elements.yearOfCardField, "2099");

        this.getSubmitFormButton().click({force: true});
        cy.log("New Payment method card is added");
    }

    checkFinalUserOrderInformation(user, searchItem) {
        cy.url().should('include', 'order-completion');
        cy.get('h1[class="confirmation"]').should('have.text', 'Thank you for your purchase!');
        cy.get('.mat-cell.cdk-cell.cdk-column-product').should('have.text', searchItem);
        cy.get('div[class="ng-star-inserted"]').then(userAddressBlock => {
            expect(userAddressBlock.text()).to.includes(user.city);
            expect(userAddressBlock.text()).to.includes(user.country);
            expect(userAddressBlock.text()).to.includes(user.userName);
            expect(userAddressBlock.text()).to.includes(user.zip_code);
            expect(userAddressBlock.text()).to.includes(user.address);
            expect(userAddressBlock.text()).to.includes(user.mobile_phone);
            cy.log("Order is payed and order has valid user data");
        })
    }

    selectFirstPayCard() {
        cy.get(this.elements.selectPayCardRadioBtn).eq(0).click();
    }

    selectFirstAddress() {
        cy.get(this.elements.selectAddressRadioBtn).eq(0).click();
    }

    selectFirstDeliveryType() {
        cy.get(this.elements.deliveryTypesRadioBtn).eq(0).click();
    }

    passedConfirmOrderAndPAyPage() {
        cy.url().should('include', 'order-summary');
        this.getCheckoutButton().click({force: true});
    }

}

export default new FillInOrderPage();