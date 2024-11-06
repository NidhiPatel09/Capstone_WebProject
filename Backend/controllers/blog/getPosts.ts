import { Request, Response } from "express";
import { getAllBlogPosts } from "../../services/blog/getAllBlogPosts";

export const getPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getAllBlogPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({
      message: "Error fetching blog posts",
      error: error instanceof Error ? error.message : error,
    });
  }
};
