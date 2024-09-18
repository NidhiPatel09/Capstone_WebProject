import express, { Application } from "express";
import session from "express-session";
import dotenv from "dotenv";
import { initializePassport } from "./config/auth";
import authRoutes from "./routes/authRoutes";
import recipeRoutes from "./routes/recipeRoutes"; // Assuming you already have this
import { connectDB } from "./config/db"; // Use named import

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize passport and session
initializePassport(app);

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    // Once connected, start listening for requests
    app.use("/auth", authRoutes);
    app.use("/api", recipeRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
