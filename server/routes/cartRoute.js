import express from "express";
import {addToCart,removeFromCart, getCartByUserId, getItemsListByUserId} from "../controllers/cartController.js";
import authMiddleware  from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove/",authMiddleware,removeFromCart);
cartRouter.get("/userid/:id",authMiddleware,getCartByUserId);
cartRouter.get("/items/userid/:id",authMiddleware,getItemsListByUserId);

export default cartRouter;