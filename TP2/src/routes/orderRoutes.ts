import {Router} from 'express';
import * as orderController from "../controllers/orderControllers"

const router = Router();

router.get("/", orderController.list);
router.post("/", orderController.create);
router.post("/:id/cancel", orderController.remove);
router.get("/order", orderController.getStatus);
router.get("/:id", orderController.get);

export default router;