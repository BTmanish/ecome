"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [data, setData] = useState("");

  const getmyprofile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.get(
        "http://localhost:5000/api/getmyprofile",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
       console.log(response.data.data.name)
      setData(response.data.data.name);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getmyprofile();
  }, []);

  return (
    <nav className="  sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6 text-white">
        {/* Left Section */}
        <div className=" ">
          <ul className="flex gap-8 text-lg font-semibold ">
            <a
              className= " hover:-translate-x-2.5 shadow-1xl hover:shadow-2xl transition duration-600 hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition-all duration-300"
              href="/home"
            >
              Home
            </a>
            <a
              className=" hover:-translate-y-3 shadow-1xl hover:shadow-2xl transition duration-600 hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition-all duration-300"
              href="/about"
            >
              About
            </a>
            <a
              className="hover:-translate-x-4  shadow-1xl hover:shadow-2xl transition duration-600 hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition-all duration-300"
              href="/contactus"
            >
              Contact
            </a>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 hover:-translate-y-2 transition duration-300">
          {data ? (
            <div className="bg-white text-purple-600 px-5 py-2 rounded-full font-bold shadow-md hover:scale-105 transition duration-300 cursor-pointer">
              👤 {data}
            </div>
          ) : (
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition duration-600">
              Signup
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
