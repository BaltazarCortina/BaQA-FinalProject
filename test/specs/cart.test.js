const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const MenuPage = require('../pageobjects/menu.page');

describe('Testing CART section:', () => {
    beforeAll('Open page and login with standard account', () => {
        LoginPage.standardLogin();
    })

    describe ('Add to cart', () => {
        afterEach('Go back to the Products section', () => {
            CartPage.continueShopping();
        })

        it ('Adding a first product to the cart', () => {
            const product = ProductsPage.selectProduct(0);
            const productName = product.name.getText();
            ProductsPage.addToCart(product);
            CartPage.goToCart();
            const itemsList = CartPage.getItemsList('name');

            expect(itemsList).toContain(productName);
        })
        
        it ('Adding a second product to the cart', () => {
            const product = ProductsPage.selectProduct(1);
            const productName = product.name.getText();
            ProductsPage.addToCart(product);
            CartPage.goToCart();
            const itemsList = CartPage.getItemsList('name');

            expect(itemsList).toContain(productName);
        })

        it ('Adding two products at the same time', () => {
            const product1 = ProductsPage.selectProduct(2);
            const product2 = ProductsPage.selectProduct(3);
            const product1Name = product1.name.getText();
            const product2Name = product2.name.getText();
            ProductsPage.addToCart(product1);
            ProductsPage.addToCart(product2);
            CartPage.goToCart();
            const itemsList = CartPage.getItemsList('name');
            
            expect(itemsList).toContain(product1Name);
            expect(itemsList).toContain(product2Name);
        })
    })

    describe ('Remove from cart', () => {
        beforeAll('Open cart', () => {
            CartPage.goToCart();
        })

        it ('Remove the first product from the cart', () => {
            const cartProduct = CartPage.selectProduct(2);
            const productName = cartProduct.name.getText();
            CartPage.removeFromCart(cartProduct);
            const itemsList = CartPage.getItemsList('name');

            expect(itemsList).not.toContain(productName);
        })
        it ('Remove the second product from the cart', () => {
            const cartProduct = CartPage.selectProduct(1);
            const productName = cartProduct.name.getText();
            CartPage.removeFromCart(cartProduct);
            const itemsList = CartPage.getItemsList('name');

            expect(itemsList).not.toContain(productName);
        })
        
        it ('Remove two products at the same time', () => {
            const cartProduct1 = CartPage.selectProduct(0);
            const cartProduct2 = CartPage.selectProduct(1);
            const product1Name = cartProduct1.name.getText();
            const product2Name = cartProduct2.name.getText();
            CartPage.removeFromCart(cartProduct1);
            CartPage.removeFromCart(cartProduct2);
            const itemsList = CartPage.getItemsList('name');

            expect(itemsList).not.toContain(product1Name);
            expect(itemsList).not.toContain(product2Name);
        })
    })
    describe ('Check that the prices are correct in the cart', () => {
        beforeAll('Open Products section', () => {
            MenuPage.resetApp();
        })

        beforeEach('Open Products section', () => {
            ProductsPage.open();
        })
        
        it ('Check the prize of one product', () => {
            const product = ProductsPage.selectProduct(1);
            const productPrize = product.price.getText();
            ProductsPage.addToCart(product);
            CartPage.goToCart();
            const cartProduct = CartPage.selectProduct(0);

            expect(cartProduct.price).toHaveText(productPrize);
        })

        it ('Check the prize of a second product', () => {
            const product = ProductsPage.selectProduct(5);
            const productPrize = product.price.getText();
            ProductsPage.addToCart(product);
            CartPage.goToCart();
            const cartProduct = CartPage.selectProduct(1);

            expect(cartProduct.price).toHaveText(productPrize);
        })
    })
    
    it ('Proceed to checkout', () => {
        CartPage.checkout();
        
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
    })
})