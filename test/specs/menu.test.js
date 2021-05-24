const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const FooterPage = require('../pageobjects/footer.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const MenuPage = require('../pageobjects/menu.page');

describe('Testing Menu section:', () => {
    beforeAll('Open page and login with valid account', () => {
        LoginPage.open();
        LoginPage.login('standard_user', 'secret_sauce');
    })
    
    it ('Login', () => {

    })

})