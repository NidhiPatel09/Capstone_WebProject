import { Router } from "express";
<<<<<<< HEAD
import { createComment, getComments } from "../controllers/commentController";
=======
import { createComment } from "../controllers/comment/createComment";
import { getComments } from "../controllers/comment/getComments";
>>>>>>> main
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

<<<<<<< HEAD
router.post("/:postId", authMiddleware, createComment);  
router.get("/:postId", getComments);                    
=======
router.post("/:postId", authMiddleware, createComment);
router.get("/:postId", getComments);
>>>>>>> main

export default router;
