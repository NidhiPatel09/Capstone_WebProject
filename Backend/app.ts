import express, { Application } from "express";
<<<<<<< HEAD
import session from "express-session";
import dotenv from "dotenv";
import { initializePassport } from "./config/auth";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRecipeRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import blogRoutes from "./routes/blogPostRoutes";
import commentRoutes from "./routes/commentRoutes"; 
import { connectDB } from "./config/db";
import { corsMiddleware } from "./middleware/cors";
=======
import dotenv from "dotenv";
import { initializePassport } from "./config/auth";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/favoritesRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import blogRoutes from "./routes/blogPostRoutes";
import commentRoutes from "./routes/commentRoutes";
import { connectDB } from "./config/db";
import { corsMiddleware } from "./middleware/cors";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
>>>>>>> main

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

<<<<<<< HEAD

// cors fix
app.use(corsMiddleware);


// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);
=======
// cors fix
app.use(corsMiddleware);

// Session middleware
app.use(sessionMiddleware);
>>>>>>> main

// Initialize passport and session
initializePassport(app);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
<<<<<<< HEAD
app.use("/user", userRoutes);  
app.use("/api", recipeRoutes);
app.use("/blog", blogRoutes);         
app.use("/comments", commentRoutes); 
=======
app.use("/user", userRoutes);
app.use("/api", recipeRoutes);
app.use("/blog", blogRoutes);
app.use("/comments", commentRoutes);
>>>>>>> main

// Connecting to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });

<<<<<<< HEAD
  
  export default app;
=======
export default app;
>>>>>>> main
