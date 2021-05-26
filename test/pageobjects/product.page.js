const Page = require('./page');

class ProductPage extends Page {    
    get name () { return $('.inventory_details_name') }
    get price () { return $('.inventory_details_price') }
    get addToCart () { return $('.inventory_details_desc_container button') }
    get goBackBtn () { return $('#back-to-products') }


    addToCart () {
        this.addToCart.click();
    }

    goBack () {
        this.goBackBtn.click();
    }
}

module.exports = new ProductPage();