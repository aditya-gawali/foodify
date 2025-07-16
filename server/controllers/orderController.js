import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config()
console.log(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "https://foodify-umber.vercel.app"; // Change this to your frontend URL
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create customer with name and address
    const customer = await stripe.customers.create({
      name: req.body.customerName, // Customer's name
      address: {
        line1: req.body.address.line1,
        city: req.body.address.city,
        state: req.body.address.state,
        postal_code: req.body.address.postal_code,
        country: req.body.address.country, // Ensure this is valid
      },
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert to paise
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 10000, // Delivery charges in paise (100 INR)
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id, // Link the customer to the session
      line_items: line_items,
      mode: "payment",
      billing_address_collection: 'required', // Require billing address
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// user order for frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.params.id }).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (order == null) {
      return res.json({ success: false, message: "order not found" });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// list orders for admin panel
const listAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({date: -1});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating order status

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.params.id, {
      cancelled: true,
    });
    res.json({ success: true, message: "order cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listAllOrders,
  updateStatus,
  getOrderById,
  cancelOrder,
};
