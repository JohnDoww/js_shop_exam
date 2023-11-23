import BasePage from "./BasePage";

class CatalogPage extends BasePage {

    constructor() {
        super();
        this.elements.notYetCustomerLink = 'div #newCustomerLink';
        this.elements.basket = '[routerlink="/basket"]';

    }

    getBasket() {
        return cy.get(this.elements.basket);
    }

    addNeededItemToTheCart(searchItem) {
        cy.get('[class="mat-grid-tile-content"]').then((itemTitles) => {
            if (itemTitles.text().includes(searchItem)) {
                cy.log("Item is detected")
                cy.contains(searchItem)
                    .parents('[class="mat-grid-tile-content"]')
                    .find('[aria-label="Add to Basket"]').click();
                cy.get('[class="cdk-overlay-pane"]').should('include.text', searchItem);
            } else {
                cy.log("Item isn't detected on the page");
                cy.get('[aria-label="Next page"]').click();
                this.addNeededItemToTheCart(searchItem);
            }
        })
    }

    openBasket (){
        this.getBasket().click();
        cy.url().should("include",'/#/basket' )
        cy.log("Basket is open");
    }



}

export default new CatalogPage();