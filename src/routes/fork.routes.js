import express from "express";
import * as ForkController from '../controllers/fork.controllers.js';

const router = express.Router();

router.get('/api/randoms', ForkController.getRandomFork);

export default router;


