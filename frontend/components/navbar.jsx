"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Navbar = ({ onSearch, dark, setDark }) => {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        className={`max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center h-auto lg:h-20 px-4 sm:px-6 py-4 lg:py-0 ${
          dark ? "text-white" : "text-white"
        }`}
      >
        {/* Mobile Menu Button */}
        <div className="flex justify-between items-center w-full lg:hidden">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white/20 p-2 rounded-lg"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Left Section - Desktop */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg:block w-full lg:w-auto`}>
          <ul className="flex flex-col lg:flex-row gap-3 lg:gap-6 text-base lg:text-lg font-semibold items-center lg:items-center">
            <Link href="/" className="hover:bg-white hover:text-purple-600 px-3 lg:px-4 py-2 rounded-xl transition w-full lg:w-auto text-center">
              Home
            </Link>

            <Link href="/about" className="hover:bg-white hover:text-purple-600 px-3 lg:px-4 py-2 rounded-xl transition w-full lg:w-auto text-center">
              About
            </Link>

            <Link href="/contactus" className="hover:bg-white hover:text-purple-600 px-3 lg:px-4 py-2 rounded-xl transition w-full lg:w-auto text-center">
              Contact
            </Link>

            {/* Search Box - Desktop */}
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  onSearch(e.target.value);
                }}
                className="rounded-2xl p-2 border-2 text-white bg-white/20 placeholder-white/70 w-full lg:w-auto"
              />

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-white text-purple-600 px-4 py-2 rounded-xl hover:scale-105 transition w-full lg:w-auto"
              >
                Search
              </button>
            </div>

          
          </ul>
        </div>

        {/* Right Section */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg:flex flex-col lg:flex-row items-center gap-3 lg:gap-5 mt-4 lg:mt-0 w-full lg:w-auto`}>
          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition w-full lg:w-auto"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {data ? (
            <div className="bg-white text-purple-600 px-5 py-2 rounded-full font-bold shadow-md text-center w-full lg:w-auto">
              👤 {data}
            </div>
          ) : (
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold shadow-md w-full lg:w-auto">
              Signup
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;