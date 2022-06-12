import express from "express";
import * as InfoController from '../controllers/info.controllers.js';
import compression from 'compression';

const router = express.Router();

router.get('/info', compression(), InfoController.getInfo);

export default router;


