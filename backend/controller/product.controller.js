import Product from "../models/product.js";

// Create product with Cloudinary
const createProduct = async (req, res) => {
  try {
    const { name, model, price, Description } = req.body;

    // Cloudinary image URL
    const image = req.file ? req.file.path : "";

    const newProduct = new Product({
      name,
      model,
      price,
      Description,
      image, // now the Cloudinary URL
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Show all products
const showProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update product (optional image update)
const updateproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, model, price, Description } = req.body;

    const updatedData = {
      name,
      model,
      price,
      Description,
    };

    // if a new image is uploaded, replace it
    if (req.file) {
      updatedData.image = req.file.path; // Cloudinary URL
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export { createProduct, showProduct, deleteProduct, updateproduct };