import React from "react";
import Link from "next/link";

const Footer = ({ dark }) => {
  return (
    <footer
      className={`rounded-t-3xl shadow-2xl ${
        dark
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

        {/* Logo / About */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Product Store</h1>
          <p className={`${dark ? "text-gray-300" : "text-gray-200"} text-xs sm:text-sm max-w-md mx-auto sm:mx-0`}>
            Your one-stop shop for the best products. Quality, style, and
            affordability all in one place.
          </p>
        </div>

        {/* Links */}
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Quick Links</h2>
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-300 transition text-sm sm:text-base">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-300 transition text-sm sm:text-base">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:text-gray-300 transition text-sm sm:text-base">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social / Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Connect</h2>
          <div className="flex gap-3 sm:gap-4 mb-2 sm:mb-3 justify-center sm:justify-start">
            <span className="bg-white/20 p-1.5 sm:p-2 rounded-full hover:bg-white/30 cursor-pointer transition text-sm sm:text-base">
              🌐
            </span>
            <span className="bg-white/20 p-1.5 sm:p-2 rounded-full hover:bg-white/30 cursor-pointer transition text-sm sm:text-base">
              📘
            </span>
            <span className="bg-white/20 p-1.5 sm:p-2 rounded-full hover:bg-white/30 cursor-pointer transition text-sm sm:text-base">
              🐦
            </span>
          </div>
          <p className={`${dark ? "text-gray-300" : "text-gray-200"} text-xs sm:text-sm`}>
            Email: support@store.com
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div
        className={`border-t text-center py-3 sm:py-4 text-xs sm:text-sm ${
          dark ? "border-gray-700 text-gray-400" : "border-white/20 text-gray-200"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Product Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;