import Product from '../controllers/Product.js';
/* -------------------------------- Productos ------------------------------- */
export async function get_products() {
    const products = new Product();
    let prods = await products.getAll();
    return prods;
}

export async function get_product(id) {
    const product = new Product();
    let prod = await product.getById(id);
    return prod;
}

export async function post_product(newProduct) {
    const product = new Product();
    let new_prod_id = await product.save(newProduct);
    return new_prod_id;
}

export async function update_product(id, prodUpdate) {
    const product = new Product();
    let prod = await product.updateById(id, prodUpdate);
    return prod;
}

export async function delete_product(id) {
    const product = new Product();
    let prod = await product.deleteById(id);
    return prod;
}

export default {
    get_products,
    get_product,
    post_product,
    update_product,
    delete_product
}

