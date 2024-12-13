import { Router } from "express";
import { createPost } from "../controllers/blog/createPost";
import { getPosts } from "../controllers/blog/getPosts";
import { getPostById } from "../controllers/blog/getPostById";
import { getPostsByUserId } from "../controllers/blog/getPostByUserId"; // Import new controller
import { updatePost } from "../controllers/blog/updatePost";
import { deletePost } from "../controllers/blog/deletePost";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", createPost); // Create a post
router.post("/create", authMiddleware, createPost); // Create a post
router.get("/user", authMiddleware, getPostsByUserId); // Get posts by user ID
router.get("/", getPosts); // Get all posts
router.get("/:id", getPostById); // Get a post by ID
router.put("/:id", authMiddleware, updatePost); // Update a post by ID
router.delete("/:id", authMiddleware, deletePost); // Delete a post by ID

export default router;