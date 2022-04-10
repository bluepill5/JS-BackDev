import express from 'express';
const router_products = express.Router();

import isAuthenticated from '../controllers/authentification.js';

import Product from '../controllers/Product.js';
import { get_products, get_product, post_product, update_product, delete_product } from '../controllers/ProductFunctions.js';
let path_file = './src/database/productos.json';

/* -------------------------------------------------------------------------- */
/*                                  Producto                                  */
/* -------------------------------------------------------------------------- */
let products = new Product();
/* ----------------------------------- GET ---------------------------------- */
router_products.get('/', (req, res) => {
    // let products = get_products(path_file);
    products.getAll().then((prods) => {
        res.status(200).render('products', {
            prods,
            exist_product: prods.length > 0
        });
    });
});

router_products.get('/:id', (req, res) => {
    let id = req.params.id;

    // let product = get_product(id);

    products.getById(id).then((data) => {
        console.log(`Id de producto: ${id}`);
        console.log(data);
        res.status(200).render('product', {
            prod: data,
        });
    });
});

router_products.get('/remover/:id', (req, res) => {
    let { id }  = req.params;
    // let product = delete_product(path_file, id);
    products.deleteById(id).then((data) => {
        console.log(data);
        res.status(204).send();
    });
});

/* ---------------------------------- POST ---------------------------------- */
router_products.post('/', (req, res) => {
    const { body } = req;

    if (!isAuthenticated) {
        return res.send({ 
            error : -1, 
            descripcion: `Ruta /productos/ método POST no autorizado`
        });
    }

    // let new_prod_id = post_product(path_file, body);
    products.save(body).then(() => {
        return res.status(201).send('<script>alert("Información guardada");window.location.href="/formulario";</script>');
    });
});

/* ----------------------------------- PUT ---------------------------------- */
router_products.put('/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;

    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return res.send({ 
            error : -1, 
            descripcion: `Ruta /productos/${id} método PUT no autorizado`
        });
    }

    // let prod = update_product(path_file, id, body);
    products.updateById(id, body).then((data) => {
        return res.status(200).json(data);
    });
});

/* --------------------------------- DELETE --------------------------------- */
router_products.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!isAuthenticated) {
        return res.send({ 
            error : -1, 
            descripcion: `Ruta /productos/${id} método DELETE no autorizado`
        });
    }
    
    // let del_prod = delete_product(path_file, id) ;
    products.deleteById(id).then((data) => {
        res.status(204).json(data);
    });
});

// module.exports = router_products;
export default router_products;