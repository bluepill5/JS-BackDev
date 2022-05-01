import createProduct from '../faker/product-test.faker.js';

export default class ProductService {
    constructor () {
        this.products = [];
        this.lastId = 0; 
    }
    async createProduct(n=28) {
        for (let i = this.lastId; i < this.lastId + n; i++) {
            const product = createProduct();
            product._id = i + 1;
            this.products.push(product);
        }
        this.lastId = this.lastId + n;
        return this.products;
    }

    async getProducts(id) {
        if(id) {
            return this.products.filter(product => product._id === Number(id));
        } else {
            return this.products;
        }
    }
}


