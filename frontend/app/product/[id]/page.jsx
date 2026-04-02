"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const { id } = params; // this is product id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // <-- use Render backend URL
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-20">Loading product...</p>;
  }

  return (
    <div className="min-h-screen p-10 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-6">
        {product.image && (
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl mb-6"
          />
        )}

        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Model:</span> {product.model}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Price:</span> ₹ {product.price}
        </p>
        <p className="text-gray-700 mb-6">
          <span className="font-medium">Description:</span> {product.Description || "No description"}
        </p>

        
      </div>
    </div>
  );
}