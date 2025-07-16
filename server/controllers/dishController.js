import cloudinary from "../config/cloudinary.js";
import foodModel from "../models/foodModel.js";
// import redis from '../config/redis.js';

// add food

const createDish = async (req, res) => {
  const imageUrl = req.file?.path; // Cloudinary returns the URL in .path
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imageUrl,
  });

  try {
    await food.save();
    // await redis.deleteCache('all_menu_items');
    // const cacheKey = 'all_menu_items';
    // await redis.setCache(cacheKey, await foodModel.find({}));
    return res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

//All food list

const getAllDish = async (req, res) => {
  try {
    // const cacheKey = 'all_menu_items';

    // const cachedData = await redis.getCache(cacheKey);

    // if (cachedData) {
    //   return res.json({ success: true, data: cachedData });
    // }
    // If cache is empty, fetch from database
    const foods = await foodModel.find({});
    // await redis.setCache(cacheKey, foods);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//food by id

const getDishById = async (req, res) => {
  try {
    const food = await foodModel.find({ _id: req.params.id });
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item

const deleteDish = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    await cloudinary.uploader.destroy(food.image)
    // fs.unlink(`uploads/${food.image}`, () => { });
    await foodModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { createDish, getAllDish, deleteDish, getDishById };
