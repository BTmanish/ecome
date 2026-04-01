"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Navbar = ({ onSearch, dark, setDark }) => {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");

  const getmyprofile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        "http://localhost:5000/api/getmyprofile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(response.data.data.name);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getmyprofile();
  }, []);

  const handleSearch = () => {
    if (!search) return;
    onSearch(search);
  };

  return (
    <nav
      className={`sticky top-0 z-50 rounded-2xl ${
        dark ? "bg-gray-900" : "bg-pink-400"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex justify-between items-center h-20 px-6 ${
          dark ? "text-white" : "text-white"
        }`}
      >

        {/* Left Section */}
        <div>
          <ul className="flex gap-6 text-lg font-semibold items-center">

            <Link href="/home" className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition">
              Home
            </Link>

            <Link href="/about" className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition">
              About
            </Link>

            <Link href="/contactus" className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition">
              Contact
            </Link>

            {/* Search Box */}
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onSearch(e.target.value);
              }}
              className="rounded-2xl p-2 border-2 text-white"
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-white text-purple-600 px-4 py-2 rounded-xl hover:scale-105 transition"
            >
              Search
            </button>

            <Link href="/mobiletrend" className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition">
              mobile
            </Link>

            <Link href="/laptoptrends" className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition">
              laptop
            </Link>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {data ? (
            <div className="bg-white text-purple-600 px-5 py-2 rounded-full font-bold shadow-md">
              👤 {data}
            </div>
          ) : (
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold shadow-md">
              Signup
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;