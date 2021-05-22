const Page = require('./page');

class CartPage extends Page {
    get cartBtn () { return $('a.shopping_cart_link') }
    get continueShoppingBtn () { return $('#continue-shopping') }
    get checkoutBtn () { return $('#checkout') }
    get cartProducts () { return $$('.cart_item') }
    
    goToCart () {
        this.cartBtn.click();
    }

    selectProduct (position) {
        let quantity = this.cartProducts[position].$('.cart_quantity');
        let name = this.cartProducts[position].$('a .inventory_item_name');
        let price = this.cartProducts[position].$('.inventory_item_price');
        let remove = this.cartProducts[position].$('button');

        return { quantity, name, price, remove }
    }

    removeFromCart (product) {
        product.remove.click();
    }

    continueShopping () {
        this.continueShoppingBtn.click();
    }

    checkout () {
        this.checkoutBtn.click();
    }
}

module.exports = new CartPage();