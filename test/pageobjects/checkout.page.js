const Page = require('./page');

class CheckoutPage extends Page {
    get cancelBtn () { return $('#cancel') }
    get continueBtn () { return $('#continue') }
    get finishBtn () { return $('#finish') }

    get inputFirstName () { return $('#first-name') }
    get inputLastName () { return $('#last-name') }
    get inputZip () { return $('#postal-code') }

    get subtotal () { return $('.summary_subtotal_label') }
    get tax () { return $('.summary_tax_label') }
    get total () { return $('.summary_total_label') }
    
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
}

module.exports = new CheckoutPage();