import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/customTypes";
import { deleteBlogPost } from "../../services/blog/deleteBlogPost";
import { getBlogPostById } from "../../services/blog/getBlogPostById";

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;

  try {
    const postId = typedReq.params.id;

    // Fetch the existing post to verify the author
    const post = await getBlogPostById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Check if the authenticated user is the author of the post
    if (post.authorId.toString() !== typedReq.user?._id.toString()) {
      res.status(403).json({ message: "Not authorized to delete this post" });
      return;
    }

    // Proceed with deleting the post
    const success = await deleteBlogPost(postId);
    if (success) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete post" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      message: "Error deleting post",
      error: error instanceof Error ? error.message : error,
    });
  }
};
