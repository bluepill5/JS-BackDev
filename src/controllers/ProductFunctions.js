const Product = require('../controllers/Product');
/* -------------------------------- Productos ------------------------------- */
async function get_products(path_file) {
    const container = new Product(path_file);
    let prods = await container.getAll();
    return prods;
}

async function get_product(path_file, id) {
    const container = new Product(path_file);
    let prod = await container.getById(id);
    return prod;
}

async function post_product(path_file, newProduct) {
    const container = new Product(path_file);
    let new_prod_id = await container.save(newProduct);
    return new_prod_id;
}

async function update_product(path_file, id, prodUpdate) {
    const container = new Product(path_file);
    let prod = await container.updateById(id, prodUpdate);
    return prod;
}

async function delete_product(path_file, id) {
    const container = new Product(path_file);
    let prod = await container.deleteById(id);
    return prod;
}

module.exports = {
    get_products: get_products,
    get_product: get_product,
    post_product: post_product,
    update_product: update_product,
    delete_product: delete_product
}

