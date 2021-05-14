const Page = require('./page');

class ProductsPage extends Page {
    // get inputUsername () { return $('input[name="user-name"]') }
    
    get products () { return $$('.inventory_item') }
    get cartBtn () { return $('.shopping_cart_link') }

    // get productsImages () { return $$('.inventory_item_img a') }
    // get productsNames () { return $$('.inventory_item_img a') }
    // get productsPrices () { return $$('.inventory_item_price') }
    // get productsAddToCart () { return $$('.inventory_item_price') }

    

    open () {
        super.open('inventory.html');
    }

    selectProduct (position) {
        let image = this.products[position].$('.inventory_item_img a');
        let name = this.products[position].$('.inventory_item_img a');
        let price = this.products[position].$('.inventory_item_price');
        let addToCart = this.products[position].$('button');

        return { image, name, price, addToCart }
    }

    addToCart (product) {
        product.addToCart.click();
    }

    goToCart () {
        this.cartBtn.click();
    }

    /*
    login (username, password) {
        this.inputUsername.setValue(username);  
        this.inputPassword.setValue(password);
        this.submit();
    }

    submit () {
        this.submitBtn.click();
    }

    inputValue (field, value) {
        this[field].setValue(value);
        browser.keys('Tab');
    }
    */
}

module.exports = new ProductsPage();
