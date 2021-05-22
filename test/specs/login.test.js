const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const FooterPage = require('../pageobjects/footer.page');
const CartPage = require('../pageobjects/cart.page');

describe('Login:', () => {
    it ('Login', () => {
        LoginPage.open();
        LoginPage.login('standard_user', 'secret_sauce');
    
        expect(browser.getUrl()).toBe('https://www.saucedemo.com/inventory.html');
    })

//Footer Tests

    it ('Twitter\'s link', () => {
        FooterPage.openTwitter();
        browser.switchWindow('https://twitter.com/saucelabs');
        expect(browser.getUrl()).toBe('https://twitter.com/saucelabs');
        browser.switchWindow('https://www.saucedemo.com/inventory.html');
    })

    it ('Facebook\'s link', () => {
        FooterPage.openFacebook();
        browser.switchWindow('https://www.facebook.com/saucelabs');
        expect(browser.getUrl()).toBe('https://www.facebook.com/saucelabs');
        browser.switchWindow('https://www.saucedemo.com/inventory.html');
    })

    it ('Linkedin\'s link', () => {
        FooterPage.openLinkedin();
        browser.switchWindow('https://www.linkedin.com/company/sauce-labs/');
        expect(browser.getUrl()).toBe('https://www.linkedin.com/company/sauce-labs/');
        browser.switchWindow('https://www.saucedemo.com/inventory.html');
    })

    /*
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
*/
})