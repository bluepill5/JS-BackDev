// import Product from "../controllers/Product.js";
import { get_products, get_product, post_product, update_product, delete_product } from '../controllers/ProductFunctions.js';


let products =get_products();
products.then((prods) => {
    console.log(prods.length);
});




