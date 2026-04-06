"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = ({ dark, setDark }) => {
  const [data, setData] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const getmyprofile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${BASE_URL}/api/getmyprofile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.data.name);
      setData(response.data.data.name);
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getmyprofile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setData("");
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-auto md:h-20 px-4 sm:px-6 py-4 md:py-0">
        
        {/* Logo / Brand */}
        <div className="text-white font-bold text-xl">
          <Link href="/">Product Store</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 rounded-lg focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <ul className="flex gap-8 text-lg font-semibold">
            <Link
              href="/home"
              className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition-all duration-300 text-white"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition-all duration-300 text-white"
            >
              About
            </Link>
            <Link
              href="/contactus"
              className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition-all duration-300 text-white"
            >
              Contact
            </Link>
          </ul>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-5">
          {data ? (
            <div className="relative group">
              <div className="bg-white text-purple-600 px-5 py-2 rounded-full font-bold shadow-md hover:scale-105 transition duration-300 cursor-pointer">
                👤 {data}
              </div>
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl hidden group-hover:block">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition duration-300">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:hidden">
            <div className="flex flex-col p-4 space-y-3">
              <Link
                href="/home"
                className="text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition-all duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition-all duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contactus"
                className="text-white hover:bg-white hover:text-purple-600 px-4 py-2 rounded-xl transition-all duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Auth Section */}
              <div className="border-t border-white/20 pt-3 mt-2">
                {data ? (
                  <>
                    <div className="text-white text-center py-2">
                      👤 {data}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-xl font-semibold">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;