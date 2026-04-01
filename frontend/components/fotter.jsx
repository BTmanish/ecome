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
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Logo / About */}
        <div>
          <h1 className="text-2xl font-bold mb-3">Product Store</h1>
          <p className={`${dark ? "text-gray-300" : "text-gray-200"} text-sm`}>
            Your one-stop shop for the best products. Quality, style, and
            affordability all in one place.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-300 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:text-gray-300 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social / Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Connect</h2>
          <div className="flex gap-4 mb-3">
            <span className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer transition">
              🌐
            </span>
            <span className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer transition">
              📘
            </span>
            <span className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer transition">
              🐦
            </span>
          </div>
          <p className={`${dark ? "text-gray-300" : "text-gray-200"} text-sm`}>
            Email: support@store.com
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div
        className={`border-t text-center py-4 text-sm ${
          dark ? "border-gray-700 text-gray-400" : "border-white/20 text-gray-200"
        }`}
      >
        © {new Date().getFullYear()} Product Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;