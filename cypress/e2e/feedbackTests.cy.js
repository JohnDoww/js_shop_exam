import {faker} from '@faker-js/faker';
import user from '../fixtures/user.json';
import {closeStartedPopUps, registrationAndLoginAsNewUser} from "../support/helpersFunction";
import leaveFeedbackPage from "../support/pages/LeaveFeedbackPage";


describe('Feedback functional tests', () => {
    beforeEach(() => {
        cy.visit('/');
        closeStartedPopUps();
        user.email = faker.internet.email({lastName: "test"});
        registrationAndLoginAsNewUser();
    })

    it('Leave feedback', () => {
        leaveFeedbackPage.openCustomerFeedbackPage();

        leaveFeedbackPage.fillInFeedbackForm();

        leaveFeedbackPage.successfullySubmitFeedbackFormWithHighestMark();
    })

})