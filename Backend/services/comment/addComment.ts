import { getDB } from "../../config/db";
import { Comment } from "../../types/commentTypes";

const commentCollection = () => getDB().collection<Comment>("comments");

export const addComment = async (
  commentData: Omit<Comment, "_id" | "createdAt">
): Promise<Comment> => {
  const newComment: Comment = {
    ...commentData,
    createdAt: new Date(),
  };

  const result = await commentCollection().insertOne(newComment);
  const insertedComment = await commentCollection().findOne({
    _id: result.insertedId,
  });

  if (!insertedComment) {
    throw new Error("Failed to retrieve the newly created comment");
  }
  return insertedComment;
};
