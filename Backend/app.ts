import dotenv from "dotenv";
import express, { Application } from "express";
import { connectDB } from "./config/db";
import recipeRoutes from "./routes/recipeRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Recipe routes
app.use("/api", recipeRoutes);

// Future authentication routes
app.use("/auth", authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api/recipes`);
});
