const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');

describe('Login:', () => {
    it ('Login', () => {
        LoginPage.open();
        LoginPage.login('standard_user', 'secret_sauce');
    
        expect(browser.getUrl()).toBe('https://www.saucedemo.com/inventory.html');
    })

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