"use client";

import Navbar from '@/components/navbar.jsx'
import Product from '@/components/product.jsx'
import Fotter from '@/components/fotter.jsx'
import React, { useState } from 'react'

const Page = () => {
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true); // 🌙 dark mode state

  return (
    <div className={dark ? "dark bg-black text-white" : "bg-white text-black"}>
      
      {/* pass both search + dark toggle */}
      <Navbar onSearch={setSearch} dark={dark} setDark={setDark} />

      <Product search={search} dark={dark} />

      <Fotter dark={dark} />
    </div>
  );
};

export default Page;