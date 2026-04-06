"use client";

import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
      
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full p-6 sm:p-8 md:p-10 lg:p-12">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent text-center">
          About Our Website
        </h1>

        <div className="space-y-4 sm:space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
          
          <p>
            Welcome to our Product Management Website 🚀. This platform is designed
            to efficiently display, manage, and organize product data in a clean
            and user-friendly interface.
          </p>

          <p>
            Users can easily browse products, view detailed information such as 
            product name, model, and price, and manage items through editing or 
            deleting functionality. The system ensures a smooth experience with 
            modern UI and fast backend integration.
          </p>

          <p className="break-words">
            Our website is built using modern technologies like 
            <span className="font-semibold"> Next.js </span> for the frontend,
            <span className="font-semibold"> Node.js </span> for the backend, and
            <span className="font-semibold"> MongoDB </span> for database management.
            This ensures high performance, scalability, and secure data handling.
          </p>

          <p>
            The goal of this project is to provide a structured and attractive way
            to display product information while allowing administrators to manage
            the product database easily.
          </p>

        </div>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition duration-300 text-sm sm:text-base">
            Explore Products
          </button>
        </div>

      </div>
    </div>
  );
};

export default Page;