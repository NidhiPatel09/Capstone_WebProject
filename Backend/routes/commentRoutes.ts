import { Router } from "express";
import { createComment } from "../controllers/comment/createComment";
import { getComments } from "../controllers/comment/getComments";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/:postId", authMiddleware, createComment);
router.get("/:postId", getComments);

export default router;
