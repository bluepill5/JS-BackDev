import express from "express";
import * as InfoController from '../controllers/info.controllers.js';

const router = express.Router();

router.get('/info', InfoController.getInfo);

export default router;


