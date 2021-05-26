const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const FooterPage = require('../pageobjects/footer.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const MenuPage = require('../pageobjects/menu.page');

describe('Footer:', () => {
    beforeAll('Open page and login with valid account', () => {
        LoginPage.open();
        LoginPage.login('standard_user', 'secret_sauce');
    })

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
        browser.switchWindow('Sign Up | LinkedIn');
        expect(browser).toHaveTitle('Sign Up | LinkedIn');
        browser.switchWindow('https://www.saucedemo.com/inventory.html');
    })
})