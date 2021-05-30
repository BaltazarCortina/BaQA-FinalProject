const LoginPage = require('../../pageobjects/login.page');
const ProductsPage = require('../../pageobjects/products.page');
const FooterPage = require('../../pageobjects/footer.page');
const CartPage = require('../../pageobjects/cart.page');
const CheckoutPage = require('../../pageobjects/checkout.page');
const MenuPage = require('../../pageobjects/menu.page');

describe('End to end test number 4:', () => {
    const cartItems = [];
    let itemsTotal = 0;

    it ('Open website and try to login with wrong credentials', () => {
        LoginPage.open();
        LoginPage.login('standard_user', 'wrong_password');
    
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
    
    it ('Login with standard account', () => {
        LoginPage.standardLogin();

        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })

    it ('Open Facebook\'s page', () => {
        FooterPage.openFacebook();
        browser.switchWindow('https://www.facebook.com/saucelabs');
        expect(browser.getUrl()).toBe('https://www.facebook.com/saucelabs');
    })
    
    it ('Switch back to the Products page and add a product to the cart', () => {
        browser.switchWindow('https://www.saucedemo.com/inventory.html');

        const product = ProductsPage.selectProduct(2);
        const productName = product.name.getText();
        ProductsPage.addToCart(product);
        cartItems.push(productName);
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('1');
    })

    it ('Add a second product to the cart', () => {
        const product = ProductsPage.selectProduct(5);
        const productName = product.name.getText();
        ProductsPage.addToCart(product);
        cartItems.push(productName);
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('2');
    })

    it ('Open cart and check that the products have been added', () => {
        CartPage.goToCart();
        const itemsList = CartPage.getItemsList('name');

        expect(itemsList).toContain(cartItems[0]);
        expect(itemsList).toContain(cartItems[1]);
    })

    it ('Proceed to checkout and leave some fields empty', () => {
        CartPage.checkout();
        CheckoutPage.fillInformation('FirstName', '', '');

        expect(CheckoutPage.errorMsg).toHaveText('Error: Last Name is required');
    })

    it ('Fill all the fields and continue', () => {
        CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');

        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
    })

    it ('Check that the subtotal, tax and total are correct', () => {
        const itemsTax = itemsTotal * 0.08;

        const subtotal = parseFloat(CheckoutPage.subtotal.getText().split('Item total: $').join(''));
        const tax = parseFloat(CheckoutPage.tax.getText().split('Tax: $').join(''));
        const total = parseFloat(CheckoutPage.total.getText().split('Total: $').join(''));

        expect(subtotal).toBeCloseTo(itemsTotal);
        expect(tax).toBeCloseTo(itemsTax);
        expect(total).toBeCloseTo(itemsTotal + itemsTax);
    })

    it ('Check that the items are correct at checkout', () => {
        const itemsNameList = CheckoutPage.getItemsList('name');

        expect(itemsNameList).toContain(cartItems[0]);
        expect(itemsNameList).toContain(cartItems[1]);
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