const Page = require('./page');

class ProductsPage extends Page {    
    get products () { return $$('.inventory_item') }
    get sortBtn () { return $('select') }
    get options () { return $$('select option') }

    open () {
        super.open('inventory.html');
    }

    selectProduct (position) {
        const image = this.products[position].$('.inventory_item_img a');
        const imageSrc = this.products[position].$('.inventory_item_img a img');
        const name = this.products[position].$('.inventory_item_description a');
        const description = this.products[position].$('.inventory_item_desc');
        const price = this.products[position].$('.inventory_item_price');
        const addToCart = this.products[position].$('button');

        return { image, imageSrc, name, description, price, addToCart }
    }

    addToCart (product) {
        product.addToCart.click();
    }

    sortBy (criteria) {
        this.sortBtn.click();
        switch (criteria) {
            case 'AtoZ':
                this.options[0].click();
                break;
            case 'ZtoA':
                this.options[1].click();
                break;
            case 'LtoH':
                this.options[2].click();
                break;
            case 'HtoL':
                this.options[3].click();
                break;
        }
    }

    getSortedList (criteria) {
        const productsList = [];
        for (let i = 0; i < this.products.length; i++) {
            let product = this.selectProduct(i);
            if (criteria === 'name') {
                productsList.push(product.name.getText());
            } else if (criteria === 'price') {
                productsList.push(product.price.getText());
            }
        }
        return productsList;
    }
}

module.exports = new ProductsPage();
