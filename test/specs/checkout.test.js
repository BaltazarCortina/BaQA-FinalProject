const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const FooterPage = require('../pageobjects/footer.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const MenuPage = require('../pageobjects/menu.page');

describe('Testing Checkout section:', () => {
    beforeAll('Open page and login with standard account', () => {
        LoginPage.open();
        LoginPage.standardLogin();
    })

// Products tests

    it ('Check prod', () => {
    
        expect(ProductsPage.products).toBeElementsArrayOfSize({ gte: 1 });
        browser.pause(2000);
    })

    
    it ('Click prod', () => {
        let product = ProductsPage.selectProduct(1);
    
        product.image.click();
        browser.pause(2000);
        ProductsPage.open();
        product.name.click();
        browser.pause(2000);
        ProductsPage.open();
        product.addToCart.click();
        browser.pause(2000);
        ProductsPage.open();
        expect(product.price).toHaveTextContaining('$');
        browser.pause(2000);
    })

})