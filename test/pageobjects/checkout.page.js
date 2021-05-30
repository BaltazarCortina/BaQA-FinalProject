const Page = require('./page');

class CheckoutPage extends Page {
    get cancelBtn () { return $('#cancel') }
    get continueBtn () { return $('#continue') }
    get finishBtn () { return $('#finish') }

    get inputFirstName () { return $('#first-name') }
    get inputLastName () { return $('#last-name') }
    get inputZip () { return $('#postal-code') }

    get errorMsg () { return $('.error-message-container h3') }

    get cartProducts () { return $$('.cart_item') }
    get subtotal () { return $('.summary_subtotal_label') }
    get tax () { return $('.summary_tax_label') }
    get total () { return $('.summary_total_label') }

    get backHomeBtn () { return $('#back-to-products') }
    get successMsg () { return $('.complete-header') }
    
    open () {
        super.open('checkout-step-one.html');
    }

    fillInformation (firstName, lastName, zip) {
        this.inputFirstName.setValue(firstName);  
        this.inputLastName.setValue(lastName);
        this.inputZip.setValue(zip);
        this.continue();
    }

    cancel () {
        this.cancelBtn.click();
    }
    
    continue () {
        this.continueBtn.click();
    }

    finish () {
        this.finishBtn.click();
    }

    backHome () {
        this.backHomeBtn.click();
    }

    selectProduct (position) {
        const quantity = this.cartProducts[position].$('.cart_quantity');
        const name = this.cartProducts[position].$('a .inventory_item_name');
        const price = this.cartProducts[position].$('.inventory_item_price');
        const remove = this.cartProducts[position].$('button');

        return { quantity, name, price, remove }
    }

    getItemsList (criteria) {
        const productsList = [];
        for (let i = 0; i < this.cartProducts.length; i++) {
            let product = this.selectProduct(i);
            if (criteria === 'name') {
                productsList.push(product.name.getText());
            } else if (criteria === 'price') {
                productsList.push(product.price.getText());
            }
        }
        return productsList;
    }
}

module.exports = new CheckoutPage();