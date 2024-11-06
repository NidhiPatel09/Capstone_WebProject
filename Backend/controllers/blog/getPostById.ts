import { Request, Response } from "express";
import { getBlogPostById } from "../../services/blog/getBlogPostById";

export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const postId = req.params.id;
    const post = await getBlogPostById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({
      message: "Error fetching blog post",
      error: error instanceof Error ? error.message : error,
    });
  }
};
