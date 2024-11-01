import { Router } from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../controllers/blogPostController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", createPost);        
router.get("/", getPosts);                           
router.get("/:id", getPostById);                     
router.put("/update/:id", updatePost);      
router.delete("/delete/:id", deletePost);   
export default router;
