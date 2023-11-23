import {faker} from "@faker-js/faker";
import user_for_API from "../fixtures/user_for_API.json";




export function fillInFields(webElement, data) {
    cy.get(webElement)
        .type(data)
        .should('have.value', data);
}

export function fillInFieldsWithSelect(webElement, data) {
    let secretQuestionDropdownValue = '[class="mat-option-text"]';

    if (webElement.toString() === '[class="mat-select-arrow-wrapper ng-tns-c130-17"]') {
        cy.get(webElement).click();
        cy.get(secretQuestionDropdownValue).eq(data).click();
        cy.get('[class="mat-select-min-line ng-tns-c130-17 ng-star-inserted"]').should('have.text', "Father's birth date? (MM/DD/YY)");
        return;
    }

    if (webElement.toString() === "#mat-input-13" || "#mat-input-12") {
        cy.get(webElement).select(data);
        cy.get(webElement).should('have.value', data);
    }
}

export function registrationAndLoginAsNewUser(){
    let userId;
    let token;
    let sessionId;

    user_for_API.registration.email = faker.internet.email();
    cy.request({
        method: 'POST',
        url: 'https://juice-shop-sanitarskyi.herokuapp.com/api/Users/',
        body: user_for_API.registration
    }).then(response=>{
        expect(response.status).to.eq(201);
        userId = response.body.data.id;
    })

    user_for_API.verifySecretAnswer.UserId = userId;
    cy.request({
        method: 'POST',
        url: 'https://juice-shop-sanitarskyi.herokuapp.com/api/SecurityAnswers/',
        body: user_for_API.verifySecretAnswer
    }).then(response=>{
        expect(response.status).to.eq(201);
    })
    cy.log('Registrate a new user by API')


    user_for_API.login.email = user_for_API.registration.email;
    cy.request({
        method: 'POST',
        url: 'https://juice-shop-sanitarskyi.herokuapp.com/rest/user/login',
        body: user_for_API.login
    }).then(response =>{
        token = response.body.authentication.token;
        sessionId =response.body.authentication.bid;


        window.localStorage.setItem("email", user_for_API.login.email);
        window.localStorage.setItem("token", token);
        window.sessionStorage.setItem("bid", sessionId);
        cy.log('We are login by API');

    })
}

export function closeStartedPopUps(){
    let closePopupButton = '[aria-label="Close Welcome Banner"]';

    cy.get(closePopupButton).click();
    cy.get('[aria-label="dismiss cookie message"]').click();
}

export function checkValidationForRegistrationOrLoginFields(webElement) {
    let errorMessageWebElement;
    let errorMessage;
    let validValue;

    switch (webElement.toString()) {
        case '#emailControl':
            errorMessageWebElement = '#mat-error-2';
            errorMessage = "Please provide an email address.";
            validValue = "test@mail.com";
            break;
        case '#passwordControl':
            errorMessageWebElement = '#mat-error-3';
            errorMessage = "Please provide a password. ";
            validValue = "password"
            break;
        case '#repeatPasswordControl':
            errorMessageWebElement = '#mat-error-4';
            errorMessage = " Please repeat your password. ";
            validValue = "password"
            break;
        case '#securityAnswerControl':
            errorMessageWebElement = '#mat-error-6';
            errorMessage = " Please provide an answer to your security question. ";
            validValue = "My answer"
            break;
        case '#email':
            errorMessageWebElement = '#mat-error-0';
            errorMessage = "Please provide an email address.";
            validValue = "My answer"
            break;
        case '#password':
            errorMessageWebElement = '#mat-error-1';
            errorMessage = "Please provide a password.";
            validValue = "My answer"
            break;
        default:
            cy.log("Sorry, something went wrong. Try again");
    }

    cy.get(webElement).click();
    cy.get('[fxlayoutalign="center"]').click();
    cy.get(webElement).should('be.empty');
    cy.get(errorMessageWebElement).should('have.text', errorMessage);
    cy.get(webElement).type(validValue);
}

