import { getDB } from "../config/db";
import { ObjectId } from "mongodb";

// Comment interface for blog posts
export interface Comment {
  _id?: ObjectId;
  content: string;
  blogPostId: ObjectId; 
  authorId: ObjectId;    
  createdAt: Date;
}

// Get the comments collection
const commentCollection = () => getDB().collection<Comment>("comments");

// Add a comment to a blog post
export const addComment = async (commentData: Omit<Comment, "_id" | "createdAt">): Promise<Comment> => {
  const newComment: Comment = {
    ...commentData,
    createdAt: new Date(),
  };

  const result = await commentCollection().insertOne(newComment);

  // Retrieve the newly created comment by its insertedId
  const insertedComment = await commentCollection().findOne({ _id: result.insertedId });
  if (!insertedComment) {
    throw new Error("Failed to retrieve the newly created comment");
  }
  return insertedComment;
};

// Get comments for a specific blog post
export const getCommentsByBlogPostId = async (blogPostId: string): Promise<Comment[]> => {
  if (!ObjectId.isValid(blogPostId)) throw new Error("Invalid blog post ID format");
  return await commentCollection().find({ blogPostId: new ObjectId(blogPostId) }).toArray();
};
