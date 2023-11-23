import BasePage from "./BasePage";
import {fillInFields, fillInFieldsWithSelect} from "../helpersFunction";
import {checkValidationForRegistrationOrLoginFields} from "../helpersFunction";


class RegistrationPage extends BasePage {

    constructor() {
        super();
        this.elements.emailField = '#emailControl';
        this.elements.passwordField = '#passwordControl';
        this.elements.passwordRepeatField = '#repeatPasswordControl';
        this.elements.secretQuestionDropdown = '[class="mat-select-arrow-wrapper ng-tns-c130-17"]';
        this.elements.secretQuestionAnswerField = '#securityAnswerControl';
        this.elements.submitRegistrationButton = '#registerButton';
    }

    getSubmitRegistrationButton(){
        return cy.get(this.elements.submitRegistrationButton);
    }

    fillInRegistrationFields(user){
        fillInFields(this.elements.emailField, user.email);
        fillInFields(this.elements.passwordField, user.password);
        fillInFields(this.elements.passwordRepeatField, user.password);
        fillInFieldsWithSelect(this.elements.secretQuestionDropdown, 3);
        fillInFields(this.elements.secretQuestionAnswerField, user.answer_to_secret_question);
        cy.log("Registration fields are filled in");
    }

    checkErrorMessagesForEmptyRegistrationFields(){
        checkValidationForRegistrationOrLoginFields(this.elements.emailField);
        checkValidationForRegistrationOrLoginFields(this.elements.passwordField);
        checkValidationForRegistrationOrLoginFields(this.elements.passwordRepeatField);
        fillInFieldsWithSelect(this.elements.secretQuestionDropdown, 3)
        checkValidationForRegistrationOrLoginFields(this.elements.secretQuestionAnswerField);
        cy.log("Error messages checked for registration fields");
    }


}
export default new RegistrationPage();