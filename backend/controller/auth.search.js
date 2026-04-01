import Product from "../models/product.js"; // adjust path if needed

export const search = async (req, res) => {
  try {
    const query = req.query.q;

    // ❗ check if query exists
    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    // 🔍 search in multiple fields
    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};