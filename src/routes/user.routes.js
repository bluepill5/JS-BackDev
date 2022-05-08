import express from "express";
import UserController from "../controllers/user.controller.js";

export default class UserRouter extends express.Router {
    constructor() {
        super();
        this.userController = new UserController();

        this.get('/login', this.userController.getLogin);
        this.post('/login', this.userController.postLogin);
        this.get('/logout', this.userController.getLogout);
    }
}

