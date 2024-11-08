import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../types/customTypes";
import { getBlogPostsByUserId } from "../../services/blog/getBlogPostsByUserId ";

export const getPostsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;

  try {
    const userId = typedReq.user?._id;
    console.log("Extracted userId from request:", userId);

    if (!userId) {
      console.warn("User ID not found in request.");
      res.status(401).json({ message: "Unauthorized: User ID not found" });
      return;
    }

    console.log("Calling getBlogPostsByUserId with userId:", userId);

    // Fetch posts authored by the user
    const posts = await getBlogPostsByUserId(userId);
    console.log("Fetched posts by userId:", posts);

    if (posts.length === 0) {
      console.info("No posts found for user ID:", userId);
      res.status(404).json({ message: "No posts found for this user" });
    } else {
      console.info("Found posts for user ID:", userId, "Number of posts:", posts.length);
      res.status(200).json(posts);
    }
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    res.status(500).json({
      message: "Error fetching user's posts",
      error: error instanceof Error ? error.message : error,
    });
  }
};
