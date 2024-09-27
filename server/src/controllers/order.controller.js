import { body } from "express-validator";
import {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
} from "../models/order.model.js";

const orderValidation = [body("coffee").isString().notEmpty()];

export const createOrderCtrl = [
  orderValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { coffee } = req.body;

    const order = createOrder(coffee, userId);

    res.status(201).json(order);
  },
];

export const getOrdersCtrl = [
  orderValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const orders = getOrders(req.user.id);

    res.status(200).json(orders);
  },
];

export const getOrderByIdCtrl = [
  orderValidation,
  async (req, res) => {
    try {
      const order = ordersCollection.find(
        (order) => order.id === req.params.id
      );
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

export const deleteOrderByIdCtrl = [
  orderValidation,
  async (req, res) => {
    try {
      const order = ordersCollection.filter(
        (order) => order.id !== req.params.id
      );
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
