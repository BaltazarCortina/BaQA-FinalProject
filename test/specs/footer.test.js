const LoginPage = require('../pageobjects/login.page');
const FooterPage = require('../pageobjects/footer.page');

describe('Testing FOOTER section:', () => {
    beforeAll('Open page and login with standard account', () => {
        LoginPage.standardLogin();
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
        browser.pause(2000);                        //LinkedIn asks you to Sign in and the test sometimes fails if you don't wait long enough for it to redirect you to the Sign in page.
        browser.switchWindow('Sign Up | LinkedIn');
        expect(browser).toHaveTitle('Sign Up | LinkedIn');
        browser.switchWindow('https://www.saucedemo.com/inventory.html');
    })
})