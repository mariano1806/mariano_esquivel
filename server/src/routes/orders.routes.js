import { Router } from "express";
import {
  createOrderCtrl,
  getOrdersCtrl,
  getOrderByIdCtrl,
  deleteOrderByIdCtrl,
} from "../controllers/order.controller.js";
import { validateJwt } from "../middlewares/validateJwt.js";

const ordersRouter = Router();

ordersRouter.get("/", validateJwt, getOrdersCtrl);

ordersRouter.post("/", validateJwt, createOrderCtrl);

ordersRouter.get("/:id", validateJwt, getOrderByIdCtrl);

ordersRouter.delete("/:id", validateJwt, deleteOrderByIdCtrl);

export { ordersRouter };
