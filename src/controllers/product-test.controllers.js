import ProductService from "../services/product-test.services.js";

export default class ProductController {
    constructor() {
        this.ProductService = new ProductService();

        this.getProducts = this.getProducts.bind(this);
    }

    async getProducts(req, res) {
        let id = req.query?.id;
        try {
            await this.ProductService.createProduct();
            const prods = await this.ProductService.getProducts(id);
            // res.status(200).json({productos: prods});
            res.render('indexFaker', {
                prods,
                exist_product: prods.length > 0
            });
        } catch (error) {
            console.log(error);
        }
    }
}



