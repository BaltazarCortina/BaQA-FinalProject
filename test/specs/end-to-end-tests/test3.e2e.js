const LoginPage = require('../../pageobjects/login.page');
const ProductsPage = require('../../pageobjects/products.page');
const ProductPage = require('../../pageobjects/product.page');
const CartPage = require('../../pageobjects/cart.page');
const CheckoutPage = require('../../pageobjects/checkout.page');
const MenuPage = require('../../pageobjects/menu.page');

describe('End to end test number 3:', () => {
    let cartItems = [];
    let itemsTotal = 0;

    it ('Open the website and login with standard account', () => {
        LoginPage.standardLogin();

        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })
    
    it ('Open a product', () => {
        const product = ProductsPage.selectProduct(3);
        const productName = product.name.getText();
        product.name.click();

        expect(ProductPage.name).toHaveText(productName);
    })

    it ('Go back and open a second product', () => {
        ProductPage.goBack();
        const product = ProductsPage.selectProduct(5);
        const productName = product.name.getText();
        product.name.click();

        expect(ProductPage.name).toHaveText(productName);
    })

    it ('Add the second product to the cart', () => {
        ProductPage.addToCart();
        cartItems.push(ProductPage.name.getText());
        itemsTotal += parseFloat(ProductPage.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('1');
    })

    it ('Go back and open a third product', () => {
        ProductPage.goBack();
        const product = ProductsPage.selectProduct(2);
        const productName = product.name.getText();
        product.name.click();

        expect(ProductPage.name).toHaveText(productName);
    })

    it ('Add the third product to the cart', () => {
        ProductPage.addToCart();
        cartItems.push(ProductPage.name.getText());
        itemsTotal += parseFloat(ProductPage.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('2');
    })

    it ('Go back and open the first product', () => {
        ProductPage.goBack();
        const product = ProductsPage.selectProduct(3);
        const productName = product.name.getText();
        product.name.click();

        expect(ProductPage.name).toHaveText(productName);
    })

    it ('Add the first product to the cart', () => {
        ProductPage.addToCart();
        cartItems.push(ProductPage.name.getText());
        itemsTotal += parseFloat(ProductPage.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('3');
    })

    it ('Remove the first product from the cart', () => {
        const productName = ProductPage.name.getText();
        cartItems = cartItems.filter(item => item !== productName);
        itemsTotal -= parseFloat(ProductPage.price.getText().split('$').join(''));
        ProductPage.addToCart();

        expect(CartPage.counter).toHaveText('2');
    })
    
    it ('Go back and open the third product again', () => {
        ProductPage.goBack();
        const product = ProductsPage.selectProduct(2);
        const productName = product.name.getText();
        product.name.click();

        expect(ProductPage.name).toHaveText(productName);
    })

    it ('Remove the third product from the cart', () => {
        const productName = ProductPage.name.getText();
        cartItems = cartItems.filter(item => item !== productName);
        itemsTotal -= parseFloat(ProductPage.price.getText().split('$').join(''));
        ProductPage.addToCart();

        expect(CartPage.counter).toHaveText('1');
    })

    it ('Open cart and check that the product has been added', () => {
        CartPage.goToCart();
        const itemsList = CartPage.getItemsList('name');

        expect(itemsList).toContain(cartItems[0]);
    })

    it ('Go back and sort the list by prize from Low to High', () => {
        CartPage.continueShopping();
        ProductsPage.sortBy('LtoH');
        const sortedList = ProductsPage.getSortedList('price').map(x => parseFloat(x.split('$').join('')));
        const unsortedList = sortedList.slice();
        sortedList.sort((a,b) => a - b);

        expect(unsortedList).toEqual(sortedList);
    })

    it ('Open the product with the lowest prize', () => {
        const product = ProductsPage.selectProduct(0);
        const productName = product.name.getText();
        product.name.click();

        expect(ProductPage.name).toHaveText(productName);
    })

    it ('Add the product with the lowest prize to the cart', () => {
        ProductPage.addToCart();
        cartItems.push(ProductPage.name.getText());
        itemsTotal += parseFloat(ProductPage.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('2');
    })

    it ('Open cart and check that the last product has been added', () => {
        CartPage.goToCart();
        const itemsList = CartPage.getItemsList('name');

        expect(itemsList).toContain(cartItems[1]);
    })

    it ('Proceed to checkout', () => {
        CartPage.checkout();
        CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');

        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
    })

    it ('Check that the subtotal, tax and total are correct', () => {
        const itemsTax = itemsTotal * 0.08;

        const subtotal = parseFloat(CheckoutPage.subtotal.getText().split('Item total: $').join(''));
        const tax = parseFloat(CheckoutPage.tax.getText().split('Tax: $').join(''));
        const total = parseFloat(CheckoutPage.total.getText().split('Total: $').join(''));

        expect(subtotal).toBeCloseTo(itemsTotal);
        expect(tax).toBeCloseTo(itemsTax);
        expect(total).toBeCloseTo(itemsTotal + itemsTax);
    })

    it ('Check that the items are correct at checkout', () => {
        const itemsNameList = CheckoutPage.getItemsList('name');

        expect(itemsNameList).toContain(cartItems[0]);
        expect(itemsNameList).toContain(cartItems[1]);
    })

    it ('Cancel purchase', () => {
        CheckoutPage.cancel();

        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })

    it ('Sort the list by prize from High to Low', () => {
        ProductsPage.sortBy('HtoL');
        const sortedList = ProductsPage.getSortedList('price').map(x => parseFloat(x.split('$').join('')));
        const unsortedList = sortedList.slice();
        sortedList.sort((a,b) => b - a);

        expect(unsortedList).toEqual(sortedList);
    })

    it ('Open the product with the highest prize', () => {
        const product = ProductsPage.selectProduct(0);
        const productName = product.name.getText();
        ProductsPage.addToCart(product);
        cartItems.push(productName);
        itemsTotal += parseFloat(product.price.getText().split('$').join(''));

        expect(CartPage.counter).toHaveText('3');
    })

    it ('Open cart and check that the last product has been added', () => {
        CartPage.goToCart();
        const itemsList = CartPage.getItemsList('name');

        expect(itemsList).toContain(cartItems[2]);
    })

    it ('Proceed to checkout', () => {
        CartPage.checkout();
        CheckoutPage.fillInformation('FirstName', 'LastName', 'Zip');

        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
    })
    
    it ('Check that the subtotal, tax and total are correct', () => {
        const itemsTax = itemsTotal * 0.08;

        const subtotal = parseFloat(CheckoutPage.subtotal.getText().split('Item total: $').join(''));
        const tax = parseFloat(CheckoutPage.tax.getText().split('Tax: $').join(''));
        const total = parseFloat(CheckoutPage.total.getText().split('Total: $').join(''));

        expect(subtotal).toEqual(itemsTotal);
        expect(tax).toBeCloseTo(itemsTax);
        expect(total).toBeCloseTo(itemsTotal + itemsTax);
    })
    
    it ('Finish purchase', () => {
        CheckoutPage.finish();
    
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        expect(CheckoutPage.successMsg).toHaveText('THANK YOU FOR YOUR ORDER');
    })

    it ('Go back to products section', () => {
        CheckoutPage.backHome();

        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })
    
    it ('Logout', () => {
        MenuPage.logout();

        expect(browser).toHaveUrl('https://www.saucedemo.com/');
    })
})