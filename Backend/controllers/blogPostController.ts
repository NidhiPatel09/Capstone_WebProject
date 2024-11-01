import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/customTypes";
import { ObjectId } from "mongodb";
import { 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  getAllBlogPosts, 
  getBlogPostById 
} from "../models/blogPostModel";

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const { title, description, ingredients, steps, servings, publish,authorId } = typedReq.body;
    // const authorId = new ObjectId(typedReq.user._id); // Ensure authorId is ObjectId

    const newPost = await createBlogPost({ 
      title, 
      description, 
      authorId, 
      ingredients, 
      steps, 
      servings, 
      publish 
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating blog post:", error); // Log the error for debugging
    res.status(500).json({ message: "Error creating blog post", error: error instanceof Error ? error.message : error });
  }
};

// Get all posts
export const getPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getAllBlogPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching blog posts", error: error instanceof Error ? error.message : error });
  }
};

// Get post by ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;
    const post = await getBlogPostById(postId); // Pass as string or ObjectId
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.error("Error fetching blog post:", error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching blog post", error: error instanceof Error ? error.message : error });
  }
};

// Update a post
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const postId = typedReq.params.id;
    const { title, description, ingredients, steps, servings, publish ,authorId} = typedReq.body;
    // const authorId = new ObjectId(typedReq.user._id); // Keep as ObjectId

    // Retrieve the post to check the authorId
    const post = await getBlogPostById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Check if the logged-in user is the author
    // if (!post.authorId.equals(authorId)) {
    //   res.status(403).json({ message: "Not authorized to update this post" });
    //   return;
    // }

    // Proceed with updating the post (authorId is not included in updatedData)
    await updateBlogPost(postId, { 
      title, 
      description,
      ingredients, 
      steps, 
      servings, 
      publish 
    });

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error); // Log the error for debugging
    res.status(500).json({ message: "Error updating post", error: error instanceof Error ? error.message : error });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const postId = typedReq.params.id;
    const authorId = new ObjectId(typedReq.user._id); 

    const success = await deleteBlogPost(postId, authorId);
    if (success) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found or not authorized" });
    }
  } catch (error) {
    console.error("Error deleting post:", error); 
    res.status(500).json({ message: "Error deleting post", error: error instanceof Error ? error.message : error });
  }
};
