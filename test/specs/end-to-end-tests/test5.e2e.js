const LoginPage = require('../../pageobjects/login.page');
const ProductsPage = require('../../pageobjects/products.page');
const CartPage = require('../../pageobjects/cart.page');
const CheckoutPage = require('../../pageobjects/checkout.page');
const MenuPage = require('../../pageobjects/menu.page');

describe('End to end test number 4:', () => {
    const cartItems = [];
    let itemsTotal = 0;

    it ('Open the website and login with standard account', () => {
        LoginPage.standardLogin();

        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })
    
    it ('Add a product to the cart', () => {
        const product = ProductsPage.selectProduct(0);
        const productName = product.name.getText();
        ProductsPage.addToCart(product);
        cartItems.push(productName);
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('1');
    })

    it ('Add a second product to the cart', () => {
        const product = ProductsPage.selectProduct(1);
        const productName = product.name.getText();
        ProductsPage.addToCart(product);
        cartItems.push(productName);
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('2');
    })

    it ('Add a third product to the cart', () => {
        const product = ProductsPage.selectProduct(2);
        const productName = product.name.getText();
        ProductsPage.addToCart(product);
        cartItems.push(productName);
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('3');
    })

    it ('Add a fourth product to the cart', () => {
        const product = ProductsPage.selectProduct(3);
        const productName = product.name.getText();
        ProductsPage.addToCart(product);
        cartItems.push(productName);
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('4');
    })

    it ('Add a fifth product to the cart', () => {
        const product = ProductsPage.selectProduct(4);
        const productName = product.name.getText();
        ProductsPage.addToCart(product);
        cartItems.push(productName);
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('5');
    })

    it ('Add a last product to the cart', () => {
        const product = ProductsPage.selectProduct(5);
        const productName = product.name.getText();
        ProductsPage.addToCart(product);
        cartItems.push(productName);
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('6');
    })

    it ('Open cart and check that the products have been added', () => {
        CartPage.goToCart();
        const itemsList = CartPage.getItemsList('name');

        expect(itemsList).toContain(cartItems[0]);
        expect(itemsList).toContain(cartItems[1]);
        expect(itemsList).toContain(cartItems[2]);
        expect(itemsList).toContain(cartItems[3]);
        expect(itemsList).toContain(cartItems[4]);
        expect(itemsList).toContain(cartItems[5]);
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