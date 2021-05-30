const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const MenuPage = require('../pageobjects/menu.page');

describe('Testing CHECKOUT section:', () => {
    beforeAll('Open page and login with standard account', () => {
        LoginPage.standardLogin();
    })

    describe ('Filling information in the Checkout section', () => {
        beforeAll('Add a product to the cart and proceed to checkout', () => {
            const product = ProductsPage.selectProduct(3);
            ProductsPage.addToCart(product);
            CartPage.goToCart();
            CartPage.checkout();
        })  
        
        afterEach('Open Products section', () => {
            CheckoutPage.open();
        })

        it ('Leaving every field empty', () => {
            CheckoutPage.fillInformation('', '', '');

            expect(CheckoutPage.errorMsg).toHaveText('Error: First Name is required');
        })

        it ('Filling only "First Name"', () => {
            CheckoutPage.fillInformation('FirstName', '', '');
            
            expect(CheckoutPage.errorMsg).toHaveText('Error: Last Name is required');
        })

        it ('Filling only "Last Name"', () => {
            CheckoutPage.fillInformation('', 'LastName', '');
            
            expect(CheckoutPage.errorMsg).toHaveText('Error: First Name is required');
        })

        it ('Filling only "Zip"', () => {
            CheckoutPage.fillInformation('', '', 'Zip');

            expect(CheckoutPage.errorMsg).toHaveText('Error: First Name is required');
        })

        it ('Leaving "First Name" empty', () => {
            CheckoutPage.fillInformation('', 'LastName', 'Zip');

            expect(CheckoutPage.errorMsg).toHaveText('Error: First Name is required');
        })

        it ('Leaving "Last Name" empty', () => {
            CheckoutPage.fillInformation('FirstName', '', 'Zip');

            expect(CheckoutPage.errorMsg).toHaveText('Error: Last Name is required');
        })
        
        it ('Leaving "Zip" empty', () => {
            CheckoutPage.fillInformation('FirstName', 'LastName', '');

            expect(CheckoutPage.errorMsg).toHaveText('Error: Postal Code is required');
        })

        it ('Filling every field', () => {
            CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');

            expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        })

        it ('Filling every field with a blank space. *COMMENT: Should have some kind of validation', () => {
            CheckoutPage.fillInformation(' ', ' ', ' ');

            expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        })
    })

    describe ('Check that the items are correct at checkout', () => {
        beforeEach('Reset app status and open Products section', () => {
            MenuPage.resetApp();
            ProductsPage.open();
        })  
        
        it ('Adding one product', () => {
            const product = ProductsPage.selectProduct(2);
            const productName = product.name.getText();
            const productPrice = product.price.getText();

            ProductsPage.addToCart(product);
            CartPage.goToCart();
            CartPage.checkout();
            CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');

            const itemsNameList = CheckoutPage.getItemsList('name');
            const itemsPriceList = CheckoutPage.getItemsList('price');

            expect(itemsNameList).toContain(productName);
            expect(itemsPriceList).toContain(productPrice);
        })

        it ('Adding two product', () => {
            const product1 = ProductsPage.selectProduct(1);
            const product2 = ProductsPage.selectProduct(5);
            const product1Name = product1.name.getText();
            const product2Name = product2.name.getText();
            const product1Price = product1.price.getText();
            const product2Price = product2.price.getText();

            ProductsPage.addToCart(product1);
            ProductsPage.addToCart(product2);
            CartPage.goToCart();
            CartPage.checkout();
            CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');

            const itemsNameList = CheckoutPage.getItemsList('name');
            const itemsPriceList = CheckoutPage.getItemsList('price');

            expect(itemsNameList).toContain(product1Name);
            expect(itemsNameList).toContain(product2Name);
            expect(itemsPriceList).toContain(product1Price);
            expect(itemsPriceList).toContain(product2Price);
        })
    })

    describe ('Check that the subtotal, taxes and total are correct at checkout', () => {
        beforeEach('Reset app status and open Products section', () => {
            MenuPage.resetApp();
            ProductsPage.open();
        })  
        
        it ('Adding one product', () => {
            const product = ProductsPage.selectProduct(4);
            let productPrice = product.price.getText();
            productPrice = parseFloat(productPrice.split('$').join(''));
            const productTax = productPrice * 0.08;

            ProductsPage.addToCart(product);
            CartPage.goToCart();
            CartPage.checkout();
            CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');

            const subtotal = parseFloat(CheckoutPage.subtotal.getText().split('Item total: $').join(''));
            const tax = parseFloat(CheckoutPage.tax.getText().split('Tax: $').join(''));
            const total = parseFloat(CheckoutPage.total.getText().split('Total: $').join(''));

            expect(subtotal).toEqual(productPrice);
            expect(tax).toBeCloseTo(productTax);
            expect(total).toBeCloseTo(productPrice + productTax);
        })

        it ('Adding two product', () => {
            const product1 = ProductsPage.selectProduct(0);
            const product2 = ProductsPage.selectProduct(3);
            const product1Price = parseFloat(product1.price.getText().split('$').join(''));
            const product2Price = parseFloat(product2.price.getText().split('$').join(''));
            const productsPrice = product1Price + product2Price;
            const productsTax = productsPrice * 0.08;

            ProductsPage.addToCart(product1);
            ProductsPage.addToCart(product2);
            CartPage.goToCart();
            CartPage.checkout();
            CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');

            const subtotal = parseFloat(CheckoutPage.subtotal.getText().split('Item total: $').join(''));
            const tax = parseFloat(CheckoutPage.tax.getText().split('Tax: $').join(''));
            const total = parseFloat(CheckoutPage.total.getText().split('Total: $').join(''));

            expect(subtotal).toEqual(productsPrice);
            expect(tax).toBeCloseTo(productsTax);
            expect(total).toBeCloseTo(productsPrice + productsTax);
        })
    })

    describe ('Cancel purchase and check that the cart doesn\'t reset', () => {
        it ('Cancel purchase', () => {
            CheckoutPage.cancel();
    
            expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        })
    
        it ('Check that the products are still in the cart', () => {
            CartPage.goToCart();
            
            expect(CartPage.cartProducts).toBeElementsArrayOfSize(2);
        })
    })
    
    describe ('Finish purchase and check that the cart resets', () => {
        beforeAll('Go back to checkout and fill in the information', () => {
            CartPage.goToCart();
            CartPage.checkout();
            CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');
        })  

        it ('Complete purchase', () => {
            CheckoutPage.finish();
    
            expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
            expect(CheckoutPage.successMsg).toHaveText('THANK YOU FOR YOUR ORDER');
        })
    
        it ('Check that the cart is empty', () => {
            CheckoutPage.backHome();
            CartPage.goToCart();
            
            expect(CartPage.cartProducts).toBeElementsArrayOfSize(0);
        })
    })

    describe ('Finish purchase with no items in the cart', () => {
        beforeAll('Reset app status and go to Products section', () => {
            MenuPage.resetApp();
            ProductsPage.open();
        })  

        it ('Open cart and check that there are no items', () => {
            CartPage.goToCart();
    
            expect(CartPage.cartProducts).toBeElementsArrayOfSize(0);
        })

        it ('Proceed to checkout and check that there are no items', () => {
            CartPage.checkout();
            CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');
    
            expect(CheckoutPage.cartProducts).toBeElementsArrayOfSize(0);
        })

        it ('Complete purchase. *COMMENT: Should not allow you to finish the purchase with no items', () => {
            CheckoutPage.finish();
    
            expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
            expect(CheckoutPage.successMsg).toHaveText('THANK YOU FOR YOUR ORDER');
        })
    })
})