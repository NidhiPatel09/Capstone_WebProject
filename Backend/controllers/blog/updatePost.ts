import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/customTypes";
import { updateBlogPost } from "../../services/blog/updateBlogPost";
import { getBlogPostById } from "../../services/blog/getBlogPostById";

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const postId = typedReq.params.id;
    const {
      title,
      description,
      ingredients,
      steps,
      servings,
      publish,
      authorId,
    } = typedReq.body;

    const post = await getBlogPostById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    await updateBlogPost(postId, {
      title,
      description,
      ingredients,
      steps,
      servings,
      publish,
    });

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({
      message: "Error updating post",
      error: error instanceof Error ? error.message : error,
    });
  }
};
