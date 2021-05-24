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

    //Resolver como testearlo. Pide que te loguees
    it ('Linkedin\'s link', () => {
        FooterPage.openLinkedin();
        browser.pause(2000);
        browser.switchWindow('https://www.linkedin.com/company/sauce-labs/');
        browser.pause(2000);
        expect(browser.getUrl()).toBe('https://www.linkedin.com/company/sauce-labs/');
        browser.switchWindow('https://www.saucedemo.com/inventory.html');
    })
})