const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const CartPage = require('../pageobjects/cart.page');
const MenuPage = require('../pageobjects/menu.page');

describe('Testing Menu section:', () => {
    beforeAll('Open page and login with standard account', () => {
        LoginPage.standardLogin();
    })
    
    it ('Check that "All items" takes you back to the Products section', () => {
        let product = ProductsPage.selectProduct(2);
        product.name.click();
        MenuPage.goToItems();
        
        expect(ProductsPage.products).toBeElementsArrayOfSize({ gte: 1 });
    })
    
    it ('Check that "About" takes you to "Saucelabs" homepage', () => {
        MenuPage.goToAbout();
        
        expect(browser).toHaveUrl('https://saucelabs.com/');
    })
    
    it ('Check that "Reset app state" resets the state of the app', () => {
        ProductsPage.open();
        let product = ProductsPage.selectProduct(3);
        ProductsPage.addToCart(product);
        
        expect(CartPage.counter).toHaveText('1');

        MenuPage.resetApp();
        MenuPage.closeMenu();
        
        expect(CartPage.counter).not.toExist();
    })
    
    it ('Check that the cross button closes the menu', () => {
        MenuPage.openMenu();
        MenuPage.closeMenu();
        expect(MenuPage.menuContainer).toBeDisplayed(); 
    })

    it ('Check that "Logout" logs you out of the website', () => {
        MenuPage.logout();
        
        expect(browser).toHaveUrl('https://www.saucedemo.com/');
        
        ProductsPage.open();
        
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
    })
})