import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/customTypes";
import { deleteBlogPost } from "../../services/blog/deleteBlogPost";

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const postId = typedReq.params.id;

    const success = await deleteBlogPost(postId);
    if (success) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found or not authorized" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      message: "Error deleting post",
      error: error instanceof Error ? error.message : error,
    });
  }
};
