import express from "express";
import {
  createDish,
  deleteDish,
  getAllDish,
  getDishById,
} from "../controllers/dishController.js";

import { upload } from "../config/multer.js";

const dishRouter = express.Router();

// image storage Engine

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

dishRouter.post("/create", upload.single("image"), createDish);
dishRouter.get("/all", getAllDish);
dishRouter.delete("/:id", deleteDish);
dishRouter.get("/:id", getDishById);

export default dishRouter;
