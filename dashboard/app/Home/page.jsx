"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/componets/Navbar";


export default function Home() {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/findproduct");
                setProducts(res.data);
            } catch (error) {
                console.error(
                    "Error fetching products:",
                    error.response?.data || error.message
                );
            }
        };

        fetchProducts();
    }, []);

    const handleAdd = () => {
        router.push("/createproduct");
    };

    const handleEdit = (index) => {
        router.push("/createproduct");
        const updated = [...products];
        updated[index].price = "1234";
        setProducts(updated);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteproduct/${id}`);
            setProducts(products.filter((p) => p._id !== id));
        } catch (error) {
            console.error(
                "Error deleting product:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="   ">
              <div className="rounded-2xl">
           < Navbar/>
              </div>
            {/* Header */}
            <div className="flex justify-between items-center mb-10 m-2">
                <h1 className="text-4xl font-bold">
                    Product List
                </h1>

                <button
                    onClick={handleAdd}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition duration-300"
                >
                    + Add Product
                </button>
            </div>

            {/* Products */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((item, index) => (
                    <div
                        key={item._id || index}
                        className={`rounded-3xl shadow-xl p-6 transition duration-300  "bg-gray-800" : "bg-white"
                            }`}
                    >
                        {item.image && (
                            <img
                                src={`http://localhost:5000${item.image}`}
                                alt={item.image}
                                className="w-full h-48 object-cover rounded-2xl mb-4"
                            />
                        )}

                        <h2 className="text-2xl font-semibold mb-3">
                            {item.name}
                        </h2>

                        <p className="mb-2">Model: {item.model}</p>
                        <p className="mb-6">Price: ₹ {item.price}</p>
                        <p className="mb-6">Description:  {item.Description}</p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => handleEdit(index)}
                                className="flex-1 py-2 bg-blue-500 text-white rounded-xl"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="flex-1 py-2 bg-red-500 text-white rounded-xl"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}