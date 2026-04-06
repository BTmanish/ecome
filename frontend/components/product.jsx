"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page({ search, dark }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const sizeofpage = 5;
  const [currentpage, setcurrentpage] = useState(0);

  const totalpage = products.length;
  const nofpage = Math.ceil(totalpage / sizeofpage);
  const start = currentpage * sizeofpage;
  const end = start + sizeofpage;

  const handelchange = (n) => {
    setcurrentpage(n);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res;
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      console.log("Fetching products from:", `${BASE_URL}/api/findproduct`);

      if (!search) {
        res = await axios.get(`${BASE_URL}/api/findproduct`);
      } else {
        res = await axios.get(`${BASE_URL}/api/search?q=${search}`);
      }
      console.log("Products fetched:", res.data.length);
      setProducts(res.data);
      setcurrentpage(0);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  // Refresh products when page gets focus (after returning from add product)
  useEffect(() => {
    window.addEventListener('focus', fetchProducts);
    return () => window.removeEventListener('focus', fetchProducts);
  }, [search]);

  if (loading) {
    return (
      <div className={`min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center ${
        dark ? "bg-gray-900" : "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 ${
        dark
          ? "bg-gray-900"
          : "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"
      }`}
    >
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center mb-6 sm:mb-8 md:mb-10">
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
            dark
              ? "text-white"
              : "bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent"
          }`}
        >
          Product List ({products.length} products)
        </h1>
        
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {products.slice(start, end).map((item) => (
          <Link href={`/product/${item._id}`} key={item._id}>
            <div
              className={`rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-4 sm:p-6 cursor-pointer ${
                dark ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              {item.image && (
                <img
                  src={item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                  alt={item.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-xl sm:rounded-2xl mb-3 sm:mb-4"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              )}

              <h2
                className={`text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 ${
                  dark ? "text-white" : "text-gray-800"
                }`}
              >
                {item.name}
              </h2>

              <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-1 sm:mb-2 text-sm sm:text-base`}>
                <span className="font-medium">Model:</span> {item.model}
              </p>

              <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-4 sm:mb-6 text-sm sm:text-base`}>
                <span className="font-medium">Price:</span> ₹ {item.price}
              </p>

              <div className="flex justify-end">
                <button className="bg-pink-400 p-2 px-3 sm:px-4 rounded-xl hover:bg-pink-600 hover:translate-y-1 transition text-sm sm:text-base">
                  Read more
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Products */}
      {products.length === 0 && (
        <p className={`text-center text-lg sm:text-xl mt-8 sm:mt-10 ${dark ? "text-gray-300" : "text-gray-600"}`}>
          No products found 😢
        </p>
      )}

      {/* Pagination */}
      {nofpage > 1 && (
        <div className="flex justify-center items-center mt-6 sm:mt-8 md:mt-10 overflow-x-auto px-2">
          <div
            className={`flex gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl ${
              dark ? "bg-gray-700" : "bg-pink-300"
            }`}
          >
            {[...Array(nofpage).keys()].map((n) => (
              <button
                key={n}
                onClick={() => handelchange(n)}
                className={`w-7 h-7 sm:w-8 sm:h-8 text-sm sm:text-base rounded-full ${
                  currentpage === n
                    ? "bg-pink-600 text-white"
                    : dark
                    ? "bg-gray-500 text-white"
                    : "bg-pink-400"
                } hover:bg-pink-500 transition`}
              >
                {n + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}