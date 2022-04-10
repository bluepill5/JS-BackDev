import Product from '../controllers/Product.js';
/* -------------------------------- Productos ------------------------------- */
export async function get_products(path_file) {
    const container = new Product(path_file);
    let prods = await container.getAll();
    return prods;
}

export async function get_product(path_file, id) {
    const container = new Product(path_file);
    let prod = await container.getById(id);
    return prod;
}

export async function post_product(path_file, newProduct) {
    const container = new Product(path_file);
    let new_prod_id = await container.save(newProduct);
    return new_prod_id;
}

export async function update_product(path_file, id, prodUpdate) {
    const container = new Product(path_file);
    let prod = await container.updateById(id, prodUpdate);
    return prod;
}

export async function delete_product(path_file, id) {
    const container = new Product(path_file);
    let prod = await container.deleteById(id);
    return prod;
}

export default {
    get_products,
    get_product,
    post_product,
    update_product,
    delete_product
}

