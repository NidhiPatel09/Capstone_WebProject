import { getDB } from "../../../config/db";
import { Comment } from "../../../types/commentTypes";
import { ObjectId } from "mongodb";

const commentCollection = () => getDB().collection<Comment>("comments");

export const getCommentsByBlogPostId = async (
  blogPostId: string
): Promise<Comment[]> => {
  if (!ObjectId.isValid(blogPostId))
    throw new Error("Invalid blog post ID format");
  return await commentCollection()
    .find({ blogPostId: new ObjectId(blogPostId) })
    .toArray();
};
