import { Request, Response } from "express";
import { addComment, getCommentsByBlogPostId } from "../models/commentModel";
import { ObjectId } from "mongodb";
import { AuthenticatedRequest } from "../types/customTypes";

// Add a comment to a blog post
export const createComment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { content } = req.body;
    const blogPostId = new ObjectId(req.params.postId);
    const authorId = new ObjectId(req.user._id);

    const newComment = await addComment({ content, blogPostId, authorId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// Get all comments for a specific blog post
export const getComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogPostId = req.params.postId;
    const comments = await getCommentsByBlogPostId(blogPostId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};
