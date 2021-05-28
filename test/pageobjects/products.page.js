const Page = require('./page');

class ProductsPage extends Page {    
    get products () { return $$('.inventory_item') }
    get sortBtn () { return $('select') }
    get options () { return $$('select option') }

    open () {
        super.open('inventory.html');
    }

    selectProduct (position) {
        let image = this.products[position].$('.inventory_item_img a');
        let imageSrc = this.products[position].$('.inventory_item_img a img');
        let name = this.products[position].$('.inventory_item_description a');
        let description = this.products[position].$('.inventory_item_desc');
        let price = this.products[position].$('.inventory_item_price');
        let addToCart = this.products[position].$('button');

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
        let productsList = [];
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
