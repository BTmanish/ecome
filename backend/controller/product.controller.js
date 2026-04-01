import { response } from "express";
import Product from "../models/product.js";

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, model, price, Description } = req.body;
    console.log(req.files)
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({ name, model, price, image, Description });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// show product
const showProduct = async (req, res) => {
  try {
    const products = await Product.find(); // get all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


//delete product
 const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//edit product
const updateproduct = async(req,res)=>{
  try{
    const{id} = req.params;

    const update = await Product.updateById(id);
    if (!update){
      return res.status(404).json({message:"product is not found"})

    }
    response.json({message:"product update succesfully"})
  }catch(eroor){
  res.status(500).json({ error: error.message})
  }
}

export  {createProduct,showProduct, deleteProduct ,updateproduct};