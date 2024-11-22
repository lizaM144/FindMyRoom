import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js"; // Importing authRoutes as ES module
import cors from "cors";

dotenv.config();

const app = express();
connectDB();

app.use(cors()); // Add this line to allow cross-origin requests

app.use(express.json());

// Using imported authRoutes directly
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!!`));
