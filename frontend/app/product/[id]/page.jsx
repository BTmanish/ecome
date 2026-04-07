"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const { id } = params; // this is product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        console.log("Fetching product from:", `${BASE_URL}/api/product/${id}`);
        
        // ✅ Use BASE_URL instead of hardcoded localhost
        const res = await axios.get(`${BASE_URL}/api/product/${id}`);
        setProduct(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <p className="text-center text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
        {product.image && (
          <img
            src={product.image.startsWith('http') ? product.image : `${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
            alt={product.name}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl sm:rounded-2xl mb-4 sm:mb-6"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
            }}
          />
        )}

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 break-words">
          {product.name}
        </h1>
        
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          <span className="font-medium">Model:</span> {product.model}
        </p>
        
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          <span className="font-medium">Price:</span> ₹ {product.price}
        </p>
        
        <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
          <span className="font-medium">Description:</span> {product.Description || "No description"}
        </p>

        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}