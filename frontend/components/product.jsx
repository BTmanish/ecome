"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Page({ search, dark }) {
  const [products, setProducts] = useState([]);

  const sizeofpage = 5;
  const [currentpage, setcurrentpage] = useState(0);

  const totalpage = products.length;
  const nofpage = Math.ceil(totalpage / sizeofpage);
  const start = currentpage * sizeofpage;
  const end = start + sizeofpage;

  const handelchange = (n) => {
    setcurrentpage(n);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;
        if (!search) {
          res = await axios.get("http://localhost:5000/api/findproduct");
        } else {
          res = await axios.get(`http://localhost:5000/api/search?q=${search}`);
        }
        setProducts(res.data);
        setcurrentpage(0);
      } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
      }
    };
    fetchProducts();
  }, [search]);

  return (
    <div
      className={`min-h-screen p-10 ${
        dark? "bg-gray-900": "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"
      }`}
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1
          className={`text-4xl font-bold ${
            dark
              ? "text-white"
              : "bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent"
          }`}
        >
          Product List
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(start, end).map((item) => (
          <Link href={`/product/${item._id}`} key={item._id}>
            <div
              className={`rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-6 cursor-pointer ${
                dark ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              {item.image && (
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
              )}

              <h2
                className={`text-2xl font-semibold mb-3 ${
                  dark ? "text-white" : "text-gray-800"
                }`}
              >
                {item.name}
              </h2>

              <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-2`}>
                <span className="font-medium">Model:</span> {item.model}
              </p>

              <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-6`}>
                <span className="font-medium">Price:</span> ₹ {item.price}
              </p>

              <div className="flex justify-end">
                <button className="bg-pink-400 p-2 rounded-xl hover:bg-pink-600 hover:translate-y-1 transition">
                  Read more
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Products */}
      {products.length === 0 && (
        <p className={`text-center text-xl mt-10 ${dark ? "text-gray-300" : "text-gray-600"}`}>
          No products found 😢
        </p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <div
          className={`flex gap-2 p-3 rounded-2xl shadow-xl ${
            dark ? "bg-gray-700" : "bg-pink-300"
          }`}
        >
          {[...Array(nofpage).keys()].map((n) => (
            <button
              key={n}
              onClick={() => handelchange(n)}
              className={`w-8 h-8 rounded-full ${
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
    </div>
  );
}