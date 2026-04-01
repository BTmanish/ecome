import express from "express";
import { signupUser, loginUser, getmyprofile } from "../controller/auth.controller.js";
import {createProduct, showProduct, deleteProduct , updateproduct} from "../controller/product.controller.js"
import  { verifyToken} from "../middleware/verifyToken.js";
import upload from "../middleware/multer.js"
import { search } from "../controller/auth.search.js";
import { getProductById } from "../controller/auth.controller.product.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/createproduct",upload.single(
    'image'
) ,createProduct);
router.get("/findproduct",showProduct);
router.delete("/deleteproduct/:id",deleteProduct);
router.put("/update/:id",updateproduct);
router.get("/getmyprofile",verifyToken,getmyprofile);
router.get("/search",search);
router.get("/product/:id", getProductById);

export default router;
