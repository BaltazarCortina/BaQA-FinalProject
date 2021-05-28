const LoginPage = require('../../pageobjects/login.page');
const ProductsPage = require('../../pageobjects/products.page');
const CartPage = require('../../pageobjects/cart.page');
const CheckoutPage = require('../../pageobjects/checkout.page');
const MenuPage = require('../../pageobjects/menu.page');

describe('End to end test number 1:', () => {
    const cartItems = [];
    let itemsTotal = 0;

    it ('Open the website and login with standard account', () => {
        LoginPage.standardLogin();

        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })
    
    it ('Add a product to the cart', () => {
        const product = ProductsPage.selectProduct(4);
        cartItems.push(product.name.getText());
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));
        ProductsPage.addToCart(product);

        expect(CartPage.counter).toHaveText('1');
    })
    
    it ('Add a second product to the cart', () => {
        const product = ProductsPage.selectProduct(2);
        cartItems.push(product.name.getText());
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));
        ProductsPage.addToCart(product);

        expect(CartPage.counter).toHaveText('2');
    })

    it ('Open cart and check that the products have been added', () => {
        CartPage.goToCart();
        const itemsList = CartPage.getItemsList('name');

        expect(itemsList).toContain(cartItems[0]);
        expect(itemsList).toContain(cartItems[1]);
    })
    
    it ('Proceed to checkout', () => {
        CartPage.checkout();
        CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');

        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
    })
    
    it ('Check that the subtotal, tax and total are correct', () => {
        const itemsTax = itemsTotal * 0.08;

        const subtotal = parseFloat(CheckoutPage.subtotal.getText().split('Item total: $').join(''));
        const tax = parseFloat(CheckoutPage.tax.getText().split('Tax: $').join(''));
        const total = parseFloat(CheckoutPage.total.getText().split('Total: $').join(''));

        expect(subtotal).toEqual(itemsTotal);
        expect(tax).toBeCloseTo(itemsTax);
        expect(total).toBeCloseTo(itemsTotal + itemsTax);
    })
    
    it ('Finish purchase', () => {
        CheckoutPage.finish();
    
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        expect(CheckoutPage.successMsg).toHaveText('THANK YOU FOR YOUR ORDER');
    })

    it ('Go back to products section', () => {
        CheckoutPage.backHome();

        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })
    
    it ('Logout', () => {
        MenuPage.logout();

        expect(browser).toHaveUrl('https://www.saucedemo.com/');
    })
})