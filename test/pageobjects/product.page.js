const Page = require('./page');

class ProductPage extends Page {
    get name () { return $('.inventory_details_name') }
    get description () { return $('.inventory_details_desc') }
    get image () { return $('.inventory_details_img') }
    get price () { return $('.inventory_details_price') }
    get addToCartBtn () { return $('.inventory_details_desc_container button') }
    get goBackBtn () { return $('#back-to-products') }


    addToCart () {
        this.addToCartBtn.click();
    }

    goBack () {
        this.goBackBtn.click();
    }
}

module.exports = new ProductPage();