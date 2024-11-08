import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/customTypes";
import { createBlogPost } from "../../services/blog/createBlogPost";

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;

  // Retrieve `authorId` from the authenticated user
  const authorId = typedReq.user?._id;

  // Validation: Ensure `authorId` exists
  if (!authorId) {
    res.status(401).json({ message: "Unauthorized: User ID not found" });
    return;
  }

  // Destructure and validate required fields from the request body
  const { title, description, ingredients, steps, servings, publish } =
    typedReq.body;

  // Validation: Check if all required fields are provided
  if (
    !title ||
    !description ||
    !ingredients ||
    !steps ||
    servings === undefined ||
    publish === undefined
  ) {
    res
      .status(400)
      .json({
        message:
          "All fields (title, description, ingredients, steps, servings, publish) are required",
      });
    return;
  }

  try {
    // Create the new blog post
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
