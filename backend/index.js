import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./router/router.js";
import cors from "cors";


dotenv.config();

const app = express();



// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// API routes
app.use("/api", router);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

