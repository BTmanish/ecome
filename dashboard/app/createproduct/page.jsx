"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    price: "",
    Description:"",
  });
  const [image, setImage] = useState(null); // store actual file

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]); // save file object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create FormData to send file + other fields
    const data = new FormData();
    data.append("name", formData.name);
    data.append("model", formData.model);
    data.append("price", formData.price);
    data.append("Description", formData.Description);
    if (image) data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/createproduct", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product Added Successfully ✅");
      router.push("/");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Add New Product
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

         <input
          type="text"
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full mb-6 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)} // preview uploaded file
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
        )}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}