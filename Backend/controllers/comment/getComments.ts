import { Request, Response } from "express";
import { getCommentsByBlogPostId } from "../../services/comment/getCommentsByBlogPostId";

export const getComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogPostId = req.params.postId;
    const comments = await getCommentsByBlogPostId(blogPostId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};
