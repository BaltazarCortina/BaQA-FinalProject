const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const FooterPage = require('../pageobjects/footer.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const MenuPage = require('../pageobjects/menu.page');

describe('Testing Cart section:', () => {
    beforeAll('Open page and login with standard account', () => {
        LoginPage.standardLogin();
    })

// Products tests

    describe ('Add to cart', () => {
        afterEach('Go back to the Products section', () => {
            CartPage.continueShopping();
        })

        it ('Adding a first product to the cart', () => {
            let product = ProductsPage.selectProduct(0);
            let productName = product.name.getText();
            product.addToCart.click();
            CartPage.goToCart();
            let itemsList = CartPage.getItemsList('name');

            expect(itemsList).toContain(productName);
        })
        
        it ('Adding a second product to the cart', () => {
            let product = ProductsPage.selectProduct(1);
            let productName = product.name.getText();
            product.addToCart.click();
            CartPage.goToCart();
            let itemsList = CartPage.getItemsList('name');

            expect(itemsList).toContain(productName);
        })

        it ('Adding two products at the same time', () => {
            let product1 = ProductsPage.selectProduct(2);
            let product2 = ProductsPage.selectProduct(3);
            let product1Name = product1.name.getText();
            let product2Name = product2.name.getText();
            product1.addToCart.click();
            product2.addToCart.click();
            CartPage.goToCart();
            let itemsList = CartPage.getItemsList('name');
            
            expect(itemsList).toContain(product1Name);
            expect(itemsList).toContain(product2Name);
        })
    })

    describe ('Remove from cart', () => {
        beforeAll('Open cart', () => {
            CartPage.goToCart();
        })

        it ('Remove the first product from the cart', () => {
            let cartProduct = CartPage.selectProduct(2);
            let productName = cartProduct.name.getText();
            CartPage.removeFromCart(cartProduct);
            let itemsList = CartPage.getItemsList('name');

            expect(itemsList).not.toContain(productName);
        })
        it ('Remove the second product from the cart', () => {
            let cartProduct = CartPage.selectProduct(1);
            let productName = cartProduct.name.getText();
            CartPage.removeFromCart(cartProduct);
            let itemsList = CartPage.getItemsList('name');

            expect(itemsList).not.toContain(productName);
        })
        
        it ('Remove two products at the same time', () => {
            let cartProduct1 = CartPage.selectProduct(0);
            let cartProduct2 = CartPage.selectProduct(1);
            let product1Name = cartProduct1.name.getText();
            let product2Name = cartProduct2.name.getText();
            CartPage.removeFromCart(cartProduct1);
            CartPage.removeFromCart(cartProduct2);
            let itemsList = CartPage.getItemsList('name');

            expect(itemsList).not.toContain(product1Name);
            expect(itemsList).not.toContain(product2Name);
        })
    })

    describe ('Check that the prices are correct in the cart', () => {
        beforeEach('Open Products section', () => {
            MenuPage.resetApp();
            ProductsPage.open();
        })

        it ('Remove the first product from the cart', () => {
            let cartProduct = CartPage.selectProduct(2);
            let productName = cartProduct.name.getText();
            CartPage.removeFromCart(cartProduct);
            let itemsList = CartPage.getItemsList('name');

            expect(itemsList).not.toContain(productName);
        })
        it ('Remove the second product from the cart', () => {
            let cartProduct = CartPage.selectProduct(1);
            let productName = cartProduct.name.getText();
            CartPage.removeFromCart(cartProduct);
            let itemsList = CartPage.getItemsList('name');

            expect(itemsList).not.toContain(productName);
        })
        
        it ('Remove two products at the same time', () => {
            let cartProduct1 = CartPage.selectProduct(0);
            let cartProduct2 = CartPage.selectProduct(1);
            let product1Name = cartProduct1.name.getText();
            let product2Name = cartProduct2.name.getText();
            CartPage.removeFromCart(cartProduct1);
            CartPage.removeFromCart(cartProduct2);
            let itemsList = CartPage.getItemsList('name');

            expect(itemsList).not.toContain(product1Name);
            expect(itemsList).not.toContain(product2Name);
        })
    })
})