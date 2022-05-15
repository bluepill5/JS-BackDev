import express from "express";
import passport from "../utils/passport.utils.js";
import * as AuthController from '../controllers/auth.controllers.js';
// import * as AuthMiddleware from '../middlewares/auth.middlewares.js';

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                   singup                                   */
/* -------------------------------------------------------------------------- */
router.get('/signup', AuthController.getSignUp);
router.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/failSignup'
}), AuthController.postSignup);
router.get('failSignup', AuthController.failSignup);

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */
router.get('/login', AuthController.getLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }) , AuthController.postLogin);
router.get('/failLogin', AuthController.failLogin, AuthController.failLogin);

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */
router.get('/logout', AuthController.logout);

/* -------------------------------------------------------------------------- */
/*                                Authenticated                               */
/* -------------------------------------------------------------------------- */
// router.get('/protected', AuthMiddleware.checkAuthentication, (req, res) => {
//     console.log('Está autenticado');
//     res.send('<h1>Está autenticado</h1>');
// });

export default router;


