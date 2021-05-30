const LoginPage = require('../pageobjects/login.page');
const ProductsPage = require('../pageobjects/products.page');
const ProductPage = require('../pageobjects/product.page');
const CartPage = require('../pageobjects/cart.page');
const MenuPage = require('../pageobjects/menu.page');

describe('Testing PRODUCTS section:', () => {
    beforeAll('Open page and login with standard account', () => {
        LoginPage.standardLogin();
    })
    
    it ('Check that there\'s at least one product showing', () => {
        expect(ProductsPage.products).toBeElementsArrayOfSize({ gte: 1 });
    })
    
    describe ('Open a product..', () => {
        afterEach('Reset app status and reopen products page', () => {
            MenuPage.resetApp();
            ProductsPage.open();
        })

        it ('..by clicking the image', () => {
            const product = ProductsPage.selectProduct(0);
            const productName = product.name.getText();
            product.image.click();

            expect(ProductPage.name).toHaveText(productName);
        })
        
        it ('..by clicking the name', () => {
            const product = ProductsPage.selectProduct(0);
            const productName = product.name.getText();
            product.name.click();

            expect(ProductPage.name).toHaveText(productName);
        })  
    })

    describe ('Add to cart', () => {
        it ('Adding a first product to the cart', () => {
            const product = ProductsPage.selectProduct(0);
            ProductsPage.addToCart(product);

            expect(CartPage.counter).toHaveText('1');
        })
        
        it ('Adding a second product to the cart', () => {
            const product = ProductsPage.selectProduct(1);
            ProductsPage.addToCart(product);

            expect(CartPage.counter).toHaveText('2');
        })  
    })

    describe ('Remove from cart', () => {
        it ('Removing the first product from the cart', () => {
            const product = ProductsPage.selectProduct(0);
            ProductsPage.addToCart(product);

            expect(CartPage.counter).toHaveText('1');
        })
        
        it ('Removing the second product from the cart', () => {
            const product = ProductsPage.selectProduct(1);
            ProductsPage.addToCart(product);

            expect(CartPage.counter).not.toExist();
        })  
    })

    describe ('Adding to cart from the product\'s page', () => {
        afterEach('Go back to the Products section', () => {
            ProductPage.goBack();
        })

        it ('Opening a product and adding it to the cart', () => {
            const product = ProductsPage.selectProduct(4);
            product.name.click();
            ProductPage.addToCart();

            expect(CartPage.counter).toHaveText('1');
        })
        
        it ('Opening a second product and adding it to the cart', () => {
            const product = ProductsPage.selectProduct(5);
            product.name.click();
            ProductPage.addToCart();

            expect(CartPage.counter).toHaveText('2');
        })  
    })

    describe ('Removing from cart from the product\'s page', () => {
        afterEach('Go back to Products section', () => {
            ProductPage.goBack();
        })

        it ('Opening the product and removing it from the cart', () => {
            const product = ProductsPage.selectProduct(4);
            product.name.click();
            ProductPage.addToCart();

            expect(CartPage.counter).toHaveText('1');
        })
        
        it ('Opening the second product and removing it from the cart', () => {
            const product = ProductsPage.selectProduct(5);
            product.name.click();
            ProductPage.addToCart();

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
            const sortedList = ProductsPage.getSortedList('price').map(x => parseFloat(x.split('$').join('')));
            const unsortedList = sortedList.slice();
            sortedList.sort((a,b) => a - b);

            expect(unsortedList).toEqual(sortedList);
        })

        it ('by price (High to Low)', () => {
            ProductsPage.sortBy('HtoL');
            const sortedList = ProductsPage.getSortedList('price').map(x => parseFloat(x.split('$').join('')));
            const unsortedList = sortedList.slice();
            sortedList.sort((a,b) => b - a);

            expect(unsortedList).toEqual(sortedList);
        })
    })

    describe ('Check that a specific product has the right information', () => {
        beforeAll('Open page and login with standard account', () => {
            ProductsPage.sortBy('AtoZ');
        })
        
        afterEach('Go back to the Products section', () => {
            ProductPage.goBack();
        })

        it ('Check name', () => {
            const product = ProductsPage.selectProduct(2);
            const productName = 'Sauce Labs Bolt T-Shirt';

            expect(product.name).toHaveText(productName);

            product.name.click();
            
            expect(ProductPage.name).toHaveText(productName);
        })

        it ('Check description', () => {
            const product = ProductsPage.selectProduct(2);
            const productDescription = 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.';

            expect(product.description).toHaveText(productDescription);

            product.name.click();
            
            expect(ProductPage.description).toHaveText(productDescription);
        })

        it ('Check price', () => {
            const product = ProductsPage.selectProduct(2);
            const productPrice = '$15.99';

            expect(product.price).toHaveText(productPrice);

            product.name.click();
            
            expect(ProductPage.price).toHaveText(productPrice);
        })

        it ('Check image', () => {
            const product = ProductsPage.selectProduct(2);
            const productImageAddress = 'https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c0dae290.jpg';

            expect(product.imageSrc).toHaveAttributeContaining('src', productImageAddress);

            product.name.click();
            
            expect(ProductPage.image).toHaveAttributeContaining('src', productImageAddress);
        })
    })
})