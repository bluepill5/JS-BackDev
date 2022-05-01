import express from "express";
import ProductController from "../controllers/product-test.controllers.js";

export default class ProductTestRouter extends express.Router {
    constructor() {
        super();
        this.productController = new ProductController();

        this.get('/', this.productController.getProducts);
    }
}


