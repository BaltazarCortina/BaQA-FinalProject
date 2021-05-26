const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const ProductPage = require('../pageobjects/product.page');
const FooterPage = require('../pageobjects/footer.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const MenuPage = require('../pageobjects/menu.page');

//before each reset app status and refresh page

describe('Testing Products section:', () => {
    beforeAll('Open page and login with standard account', () => {
        LoginPage.open();
        LoginPage.standardLogin();
    })

    // Products tests
    
    it ('Check that there\'s at least one product showing', () => {
        expect(ProductsPage.products).toBeElementsArrayOfSize({ gte: 1 });
    })
    
    describe ('Open a product..', () => {
        afterEach('Reset app status and reopen products page', () => {
            MenuPage.openMenu();
            browser.pause(1000);        //Ver por que se necesita esperar
            MenuPage.resetApp();
            ProductsPage.open();
        })

        it ('..by clicking the image', () => {
            let product = ProductsPage.selectProduct(0);
            let productName = product.name.getText();
            product.image.click();
            expect(ProductPage.name).toHaveText(productName);
        })
        
        it ('..by clicking the name', () => {
            let product = ProductsPage.selectProduct(0);
            let productName = product.name.getText();
            product.name.click();
            expect(ProductPage.name).toHaveText(productName);
        })  
    })

    describe ('Add to cart', () => {
        it ('Adding a first product to the cart', () => {
            let product = ProductsPage.selectProduct(0);
            let productName = product.name.getText();
            product.addToCart.click();
            expect(CartPage.counter).toHaveText('1');
        })
        
        it ('Adding a second product to the cart', () => {
            let product = ProductsPage.selectProduct(1);
            let productName = product.name.getText();
            product.addToCart.click();
            expect(CartPage.counter).toHaveText('2');
        })  
    })

    describe ('Remove from cart', () => {
        it ('Removing the first product from the cart', () => {
            let product = ProductsPage.selectProduct(0);
            let productName = product.name.getText();
            product.addToCart.click();
            expect(CartPage.counter).toHaveText('1');
        })
        
        it ('Removing the second product from the cart', () => {
            let product = ProductsPage.selectProduct(1);
            let productName = product.name.getText();
            product.addToCart.click();
            expect(CartPage.counter).not.toExist();
        })  
    })

    describe ('Check that the items are displayed in the correct order', () => {
        it ('by name (A to Z)', () => {
            ProductsPage.sortBy('AtoZ');
            expect(ProductsPage.getSortedList('name')).toEqual(ProductsPage.getSortedList('name').sort());
        })

        it ('by name (Z to A)', () => {
            ProductsPage.sortBy('ZtoA');
            expect(ProductsPage.getSortedList('name')).toEqual(ProductsPage.getSortedList('name').sort().reverse());
        })

        it ('by price (Low to High)', () => {
            ProductsPage.sortBy('LtoH');
            let sortedList = ProductsPage.getSortedList('price').map(x => parseFloat(x.split('$').join('')));
            let unsortedList = sortedList.slice();
            sortedList.sort((a,b) => a - b);
            expect(unsortedList).toEqual(sortedList);
        })

        it ('by price (High to Low)', () => {
            ProductsPage.sortBy('HtoL');
            let sortedList = ProductsPage.getSortedList('price').map(x => parseFloat(x.split('$').join('')));
            let unsortedList = sortedList.slice();
            sortedList.sort((a,b) => b - a);
            expect(unsortedList).toEqual(sortedList);
        })

    })

/*
    it ('Click prod', () => {
        let product = ProductsPage.selectProduct(0);
    
        product.addToCart.click();
        expect(product.price).toHaveTextContaining('$');
    })
*/
})