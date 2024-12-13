import { Router } from "express";
import { createPost } from "../controllers/blog/createPost";
import { getPosts } from "../controllers/blog/getPosts";
import { getPostById } from "../controllers/blog/getPostById";
import { getPostsByUserId } from "../controllers/blog/getPostByUserId"; // Import new controller
import { updatePost } from "../controllers/blog/updatePost";
import { deletePost } from "../controllers/blog/deletePost";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

<<<<<<< HEAD
router.post("/create", createPost); // Create a post
=======
router.post("/create", authMiddleware, createPost); // Create a post
>>>>>>> ff6026db5118d2a4e30addfccd7699e7e97e1076
router.get("/user", authMiddleware, getPostsByUserId); // Get posts by user ID
router.get("/", getPosts); // Get all posts
router.get("/:id", getPostById); // Get a post by ID
router.put("/:id", authMiddleware, updatePost); // Update a post by ID
router.delete("/:id", authMiddleware, deletePost); // Delete a post by ID

export default router;