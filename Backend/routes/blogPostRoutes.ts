import { Router } from "express";
import { createPost } from "../controllers/blog/createPost";
import { getPosts } from "../controllers/blog/getPosts";
import { getPostById } from "../controllers/blog/getPostById";
import { updatePost } from "../controllers/blog/updatePost";
import { deletePost } from "../controllers/blog/deletePost";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/update/:id", authMiddleware, updatePost);
router.delete("/delete/:id", authMiddleware, deletePost);

export default router;
