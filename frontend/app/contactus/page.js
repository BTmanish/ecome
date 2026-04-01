"use client";

import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-10">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-10 grid md:grid-cols-2 gap-10">

        {/* Left Side - Contact Info */}
        <div>
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Contact Us
          </h1>

          <div className="space-y-4 text-gray-700 text-lg">
            <p>
              📍 <span className="font-semibold">Address:</span> Kathmandu, Nepal
            </p>
            <p>
              📞 <span className="font-semibold">Phone:</span> +977-9800000000
            </p>
            <p>
              ✉ <span className="font-semibold">Email:</span> support@example.com
            </p>
            <p>
              🕒 <span className="font-semibold">Working Hours:</span> Sun - Fri (9AM - 6PM)
            </p>
          </div>

          <div className="mt-8">
            <p className="text-gray-600">
              Feel free to reach out to us anytime. We are happy to help you!
            </p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Page;