import express from "express";
import authMiddleware from "../middleware/auth.js";
import { cancelOrder, getOrderById, listAllOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.get("/userorders/:id",authMiddleware,userOrders);
orderRouter.get('/list',listAllOrders);
orderRouter.post("/status",updateStatus);
orderRouter.post("/cancel/:id",cancelOrder);
orderRouter.get("/:id",authMiddleware, getOrderById);

export default orderRouter; 