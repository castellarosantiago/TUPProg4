// import {Router} from 'express';
// import * as orderCtrl from '../controllers/orderControllers';

// const router = Router();

// router.get('/', orderCtrl.list);
// router.get('/:id', orderCtrl.get);
// router.post('/', orderCtrl.create);
// router.put('/:id', orderCtrl.update);
// router.delete('/:id', orderCtrl.remove);

// export default router;

import { Router } from 'express';
import * as orderCtrl from "../controllers/orderControllers";

const router = Router();

router.get("/", orderCtrl.list);
router.get("/:id", orderCtrl.get);
router.post("/", orderCtrl.create);

//endpoint para POST /cancelar

router.post("/:id/cancel", orderCtrl.remove);

//por si usamos handlers

router.put("/:id", orderCtrl.update);
router.delete("/:id"), orderCtrl.remove;

export default router;