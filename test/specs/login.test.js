const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const FooterPage = require('../pageobjects/footer.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const MenuPage = require('../pageobjects/menu.page');

describe('Testing Login section:', () => {
    it ('Should allow access with correct credentials', () => {
        LoginPage.open();
        LoginPage.login('standard_user', 'secret_sauce');
    
        expect(browser.getUrl()).toBe('https://www.saucedemo.com/inventory.html');
    })

    it ('Should deny access when fields are left empty', () => {
        LoginPage.open();
        LoginPage.login('', '');
    
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username is required');
    })

})