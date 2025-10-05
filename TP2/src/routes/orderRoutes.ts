import {Router} from 'express';
import * as orderController from "../controllers/orderControllers"

const router = Router();

router.get("/", orderController.list);
router.get("/:id", orderController.get);
router.post("/", orderController.create);
router.post("/:id/cancel", orderController.remove);
router.get("/order?status", orderController.getStatus);

export default router;