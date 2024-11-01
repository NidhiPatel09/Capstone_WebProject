import { Router } from "express";
import { createComment, getComments } from "../controllers/commentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/:postId", authMiddleware, createComment);  
router.get("/:postId", getComments);                    

export default router;
