import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/customTypes";
import { createBlogPost } from "../../services/blog/createBlogPost";

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const {
      title,
      description,
      ingredients,
      steps,
      servings,
      publish,
      authorId,
    } = typedReq.body;

    const newPost = await createBlogPost({
      title,
      description,
      authorId,
      ingredients,
      steps,
      servings,
      publish,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({
      message: "Error creating blog post",
      error: error instanceof Error ? error.message : error,
    });
  }
};
