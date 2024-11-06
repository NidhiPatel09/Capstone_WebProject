import { Router } from "express";
import { createPost } from "../controllers/blog/create/createPost";
import { getPosts } from "../controllers/blog/get/getPosts";
import { getPostById } from "../controllers/blog/get/getPostById";
import { updatePost } from "../controllers/blog/update/updatePost";
import { deletePost } from "../controllers/blog/delete/deletePost";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/update/:id", authMiddleware, updatePost);
router.delete("/delete/:id", authMiddleware, deletePost);

export default router;
