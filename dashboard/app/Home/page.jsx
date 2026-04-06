"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/componets/Navbar";

export default function Home() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
                console.log("Fetching products from:", `${BASE_URL}/api/findproduct`);
                const res = await axios.get(`${BASE_URL}/api/findproduct`);
                setProducts(res.data);
            } catch (error) {
                console.error(
                    "Error fetching products:",
                    error.response?.data || error.message
                );
                alert("Failed to load products. Please refresh the page.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAdd = () => {
        router.push("/createproduct");
    };

    const handleEdit = (productId) => {
        // Fixed: Pass the product ID to edit
        router.push(`/editproduct/${productId}`);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) {
            return;
        }
        
        try {
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
            await axios.delete(`${BASE_URL}/api/deleteproduct/${id}`);
            setProducts(products.filter((p) => p._id !== id));
            alert("Product deleted successfully ✅");
        } catch (error) {
            console.error(
                "Error deleting product:",
                error.response?.data || error.message
            );
            alert(error.response?.data?.message || "Failed to delete product");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
                <Navbar />
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading products...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
            <div className="rounded-2xl">
                <Navbar />
            </div>
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6 sm:mb-8 md:mb-10 m-2 sm:m-3 md:m-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent text-center sm:text-left">
                    Product List
                </h1>

                <button
                    onClick={handleAdd}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition duration-300 text-sm sm:text-base"
                >
                    + Add Product
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
                {products.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-4 sm:p-6 bg-white"
                    >
                        {item.image && (
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                                alt={item.name}
                                className="w-full h-40 sm:h-48 object-cover rounded-xl sm:rounded-2xl mb-3 sm:mb-4"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                                }}
                            />
                        )}

                        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800 break-words">
                            {item.name}
                        </h2>

                        <p className="mb-1 sm:mb-2 text-gray-600 text-sm sm:text-base">
                            <span className="font-medium">Model:</span> {item.model}
                        </p>
                        
                        <p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">
                            <span className="font-medium">Price:</span> ₹ {item.price}
                        </p>
                        
                        <p className="mb-4 sm:mb-6 text-gray-600 text-sm sm:text-base break-words">
                            <span className="font-medium">Description:</span> {item.Description}
                        </p>

                        <div className="flex gap-3 sm:gap-4">
                            <button
                                onClick={() => handleEdit(item._id)}
                                className="flex-1 py-2 sm:py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition text-sm sm:text-base"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="flex-1 py-2 sm:py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition text-sm sm:text-base"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Products Message */}
            {products.length === 0 && (
                <div className="text-center py-10 sm:py-20">
                    <p className="text-gray-600 text-base sm:text-lg">
                        No products found. Click "Add Product" to create one!
                    </p>
                </div>
            )}
        </div>
    );
}