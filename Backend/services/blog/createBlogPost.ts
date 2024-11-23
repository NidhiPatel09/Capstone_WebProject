import { getDB } from "../../config/db";
import { BlogPostInput } from "../../types/blogPostTypes";

const blogPostCollection = () => getDB().collection<BlogPostInput>("blogs");

export const createBlogPost = async (
  postData: Omit<BlogPostInput, "_id" | "createdAt" | "updatedAt">
): Promise<BlogPostInput> => {
  const newPost: BlogPostInput = {
    ...postData,
    publishedAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await blogPostCollection().insertOne(newPost);
  const insertedPost = await blogPostCollection().findOne({
    _id: result.insertedId,
  });

  if (!insertedPost) {
    throw new Error("Failed to retrieve newly created blog post");
  }
  return insertedPost;
};