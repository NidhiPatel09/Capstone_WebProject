import { Response, Request } from "express";
import { addComment } from "../../../services/comment/create/addComment";
import { ObjectId } from "mongodb";
import { AuthenticatedRequest } from "../../../types/customTypes";

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    const { content } = typedReq.body;
    const blogPostId = new ObjectId(typedReq.params.postId);
    const authorId = new ObjectId(typedReq.user._id);

    const newComment = await addComment({ content, blogPostId, authorId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};
