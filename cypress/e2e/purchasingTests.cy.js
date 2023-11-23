import {faker} from '@faker-js/faker';
import user from '../fixtures/user.json';
import {closeStartedPopUps, registrationAndLoginAsNewUser} from "../support/helpersFunction";
import catalogPage from "../support/pages/CatalogPage";
import fillInOrderPage from "../support/pages/FillInOrderPage";


describe('Ordering items tests', () => {


    beforeEach(() => {
        user.email = faker.internet.email({lastName: "test"});
        cy.visit('/');
        closeStartedPopUps();
        registrationAndLoginAsNewUser();
    })

    it('Item purchasing', () => {
        let searchItem = 'Woodruff Syrup "Forest Master X-Treme" ';

        catalogPage.addNeededItemToTheCart(searchItem);

       catalogPage.openBasket();

        fillInOrderPage.getCheckoutButton().click();

        fillInOrderPage.addNewChippingAddress(user);
        fillInOrderPage.selectFirstAddress();
        fillInOrderPage.getContinueFromAddressButton().click();

        fillInOrderPage.selectFirstDeliveryType();
        fillInOrderPage.getContinueButton().click();

        fillInOrderPage.addNewPaymentMethod(user);
        fillInOrderPage.selectFirstPayCard();
        fillInOrderPage.getContinueButton().click();


        fillInOrderPage.passedConfirmOrderAndPAyPage();

        fillInOrderPage.checkFinalUserOrderInformation(user, searchItem);

    })

})
