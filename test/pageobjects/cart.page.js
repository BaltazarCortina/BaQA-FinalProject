const Page = require('./page');

class CartPage extends Page {
    get cartBtn () { return $('a.shopping_cart_link') }
    get continueShoppingBtn () { return $('#continue-shopping') }
    get checkoutBtn () { return $('#checkout') }
    get cartProducts () { return $$('.cart_item') }
    get counter () { return $$('.shopping_cart_badge') }
    
    goToCart () {
        this.cartBtn.click();
    }

    selectProduct (position) {
        const quantity = this.cartProducts[position].$('.cart_quantity');
        const name = this.cartProducts[position].$('a .inventory_item_name');
        const price = this.cartProducts[position].$('.inventory_item_price');
        const remove = this.cartProducts[position].$('button');

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

module.exports = new CartPage();