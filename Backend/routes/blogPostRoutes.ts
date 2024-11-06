import { Router } from "express";
<<<<<<< HEAD
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../controllers/blogPostController";
=======
import { createPost } from "../controllers/blog/createPost";
import { getPosts } from "../controllers/blog/getPosts";
import { getPostById } from "../controllers/blog/getPostById";
import { updatePost } from "../controllers/blog/updatePost";
import { deletePost } from "../controllers/blog/deletePost";
>>>>>>> main
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

<<<<<<< HEAD
router.post("/create", createPost);        
router.get("/", getPosts);                           
router.get("/:id", getPostById);                     
router.put("/update/:id", updatePost);      
router.delete("/delete/:id", deletePost);   
=======
router.post("/create", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/update/:id", authMiddleware, updatePost);
router.delete("/delete/:id", authMiddleware, deletePost);

>>>>>>> main
export default router;
