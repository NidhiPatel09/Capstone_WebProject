import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/customTypes";
import { createBlogPost } from "../../services/blog/createBlogPost";

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;

  // Destructure and validate required fields from the request body
  const { title, description, image, readingTime, authorId, categoryId } =
    typedReq.body;

  // Validation: Check if all required fields are provided
  if (
    !title ||
    !description ||
    !categoryId ||
    readingTime === undefined
  ) {
    console.log(
      title,
      description,
      categoryId,
      readingTime
    );
    res.status(400).json({
      message:
        "All fields (title, description, categoryid, readingtime, publishedat) are required",
    });
    return;
  }

  try {
    // Create the new blog post
    const newPost = await createBlogPost({
      title,
      description,
      authorId,
      categoryId,
      readingTime,
    });
    res.status(201).json({newPost, message: 'Post Created Successfully!'});
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({
      message: "Error creating blog post",
      error: error instanceof Error ? error.message : error,
    });
  }
};