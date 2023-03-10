import { Router } from "express";
import { verifyUser } from "../middleware/verifyUser.middleware.js";
import userController from "../controllers/user.controller.js";

const router = Router(); //inicializamos el route

router.post('/', userController.registerUser);

router.post('/login', userController.login);

router.get('/data', userController.dataUser);

router.get('/verifyUser', verifyUser);

router.get('/logout', userController.logout);

router.get('*', (req, res)=>{
    req.logger.warn(`Se inteto ingresar a ${req.url} que no existe`);
    res.render('pages/problems', {problem: 'Esta pagina no es disponible :(', error: '404'});
})

export default router;