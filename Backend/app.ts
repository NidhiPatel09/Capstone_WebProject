import express, { Application } from "express";
import dotenv from "dotenv";
import { initializePassport } from "./config/auth";
import authRoutes from "./routes/authRoutes";
import favRoutes from "./routes/favoritesRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import blogRoutes from "./routes/blogPostRoutes";
import commentRoutes from "./routes/commentRoutes";
import { connectDB } from "./config/db";
import { corsMiddleware } from "./middleware/cors";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// CORS middleware to allow cookies
app.use(corsMiddleware);

// Session middleware
app.use(sessionMiddleware);

// Initialize Passport
initializePassport(app);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user/favorites", favRoutes);
app.use("/user", userRoutes);
app.use("/api", recipeRoutes);
app.use("/blog", blogRoutes);
app.use("/comments", commentRoutes);
app.use("/admin", adminRoutes)

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });

export default app;
