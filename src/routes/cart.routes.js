const express = require('express');
const router_cart = express.Router();

// const Product = require('../controllers/Product');
const Cart = require('../controllers/Cart');

const {get_products, get_product, post_product, update_product, delete_product} = require('../controllers/ProductFunctions');
let path_file = './productos.json';


/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- POST ---------------------------------- */
router_cart.post('/agregar/:id', (req, res) => {
    const id = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);
    const product = get_product(path_file, id);

    const cart = new Cart(req.session.cart ? req.session.cart : {});
    product.then((prod) => {
        cart.add(prod, id, quantity);
    
        req.session.cart = cart;
        // console.log(cart);
    
        res.redirect('/');
    });

});

/* ----------------------------------- GET ---------------------------------- */
router_cart.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(id);
    req.session.cart = cart;

    res.redirect('/carrito');
});


router_cart.get('/', (req, res) => {
    if (!req.session.cart) {
        return res.render('cart', {products: null, exist_prods: false});
    }
    const cart = new Cart(req.session.cart);

    if (cart.generateArray().length == 0) {
        return res.render('cart', {products: false, exist_prods: false});
    }

    return res.render('cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty,
        exist_prods: true
    });
});

/* --------------------------------- DELETE --------------------------------- */
router_cart.delete('/:id', (req, res) => {
    const { id } = req.params;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(id);
    req.session.cart = cart;

    return res.status(200).json(req.session.cart);
});

router_cart.delete('/carrito', (req, res) => {
    req.session.cart = {products: null, exist_prods: false}

    return res.status(200).json(req.session.cart);
});

module.exports = router_cart;
