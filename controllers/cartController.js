import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

// add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    const dish = await foodModel.findById(req.body.itemId);
    if (dish == null) {
      return res.json({ success: false, message: "Dish not found" });
    }

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    return res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

// remove items from user cart

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    const dish = await foodModel.findById(req.body.itemId);
    if (dish == null) {
      return res.json({ success: false, message: "Dish not found" });
    }

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch user cart data

const getCartByUserId = async (req, res) => {
  try {
    let userData = await userModel.findById(req.params.id);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getItemsListByUserId = async (req, res) => {
  try {
    let userData = await userModel.findById(req.params.id);
    let cartData = await userData.cartData;

    const newArray = await Promise.all(
      Object.entries(cartData).map(async ([key, value]) => {
        console.log(value)
        if (value == 0) return {}; // Handle zero quantity case
        const dish = await foodModel.findById(key);
        console.log(dish) // Await the database call
        if (dish == null) return {};
        return {
          ...dish._doc, // Ensure dish is converted to a plain object
          quantity: value,
        };
      })
    );

    res.json({ success: true, newArray });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCartByUserId, getItemsListByUserId };


