import BasePage from "./BasePage";
import {fillInFields} from "../helpersFunction";
import {faker} from "@faker-js/faker";

class LeaveFeedbackPage extends BasePage {


    constructor() {
        super();
        this.elements.customerFeedbackButton = '[href="#/contact"]';
        this.elements.commentInFeedbackField = '#comment';
        this.elements.ratingPointsInFeedbackField = '#rating';
        this.elements.captchaTask = '#captcha';
        this.elements.сaptchaResultField = '#captchaControl';

        this.elements.submitFeedbackFormButton = '#submitButton';
        this.elements.successMessageOfSubmitingForm = '[class="mat-simple-snack-bar-content"]';
    }

    getCustomerFeedbackButton(){
        return cy.get(this.elements.customerFeedbackButton);
    }

    getRatingPointsInFeedbackField(){
        return cy.get(this.elements.ratingPointsInFeedbackField);
    }
    getCaptchaTask(){
        return cy.get(this.elements.captchaTask);
    }
    getSubmitFeedbackFormButton(){
        return cy.get(this.elements.submitFeedbackFormButton);
    }
    getSuccessMessageOfSubmittingForm(){
        return cy.get(this.elements.successMessageOfSubmitingForm);
    }


    openCustomerFeedbackPage(){
        const basePage = new BasePage();
        basePage.openHamburgerMenu();
        this.getCustomerFeedbackButton().click();
        cy.url().should('include', '#/contact');
        cy.log("Customer feedback page is open");
    }

    fillInFeedbackForm(){
        fillInFields(this.elements.commentInFeedbackField, faker.lorem.sentences(2));
        this.getRatingPointsInFeedbackField().click('bottomRight');

        this.getCaptchaTask().then((captcha) => {
            let captchaResult = eval(captcha.text());
            fillInFields(this.elements.сaptchaResultField, captchaResult);
        })
        cy.log("Feedback page is filled in");
    }

    successfullySubmitFeedbackFormWithHighestMark(){

        this.getSubmitFeedbackFormButton().click();
        this.getSuccessMessageOfSubmittingForm()
            .should('be.visible')
            .should('have.text', 'Thank you so much for your amazing 5-star feedback!');
        cy.log("Feedback form is submitted");
    }

}
export default new LeaveFeedbackPage();