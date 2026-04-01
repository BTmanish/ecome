import express from "express";
import { signupUser, loginUser, getmyprofile } from "../controller/auth.controller.js";
import { createProduct, showProduct, deleteProduct, updateproduct } from "../controller/product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { search } from "../controller/auth.search.js";
import { getProductById } from "../controller/auth.controller.product.js";
import upload from "../middleware/multerCloudinary.js";

const router = express.Router();

// Auth routes
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/getmyprofile", verifyToken, getmyprofile);

// Product routes
router.post("/createproduct", upload.single("image"), createProduct); // Cloudinary upload
router.get("/findproduct", showProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/update/:id", upload.single("image"), updateproduct); // optional image update
router.get("/product/:id", getProductById);
router.get("/search", search);

export default router;