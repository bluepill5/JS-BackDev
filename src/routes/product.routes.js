import express from 'express';
const router_products = express.Router();

import isAuthenticated from '../controllers/authentification.js';

import Product from '../controllers/Product.js';

/* -------------------------------------------------------------------------- */
/*                                  Producto                                  */
/* -------------------------------------------------------------------------- */
let products = new Product();
/* ----------------------------------- GET ---------------------------------- */
router_products.get('/', (req, res) => {
    products.getAll().then((prods) => {
        res.status(200).render('products', {
            prods,
            exist_product: prods.length > 0
        });
    });
});

router_products.get('/:id', (req, res) => {
    let id = req.params.id;

    products.getById(id).then((data) => {
        res.status(200).render('product', {
            prod: data,
        });
    });
});

router_products.get('/remover/:id', (req, res) => {
    let { id }  = req.params;
    products.deleteById(id).then((data) => {
        res.status(204).redirect('/productos');
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
    
    products.deleteById(id).then((data) => {
        res.status(204).json(data);
    });
});

// module.exports = router_products;
export default router_products;