import { getDB } from "../../../config/db";
import { BlogPost } from "../../../types/blogPostTypes";

const blogPostCollection = () => getDB().collection<BlogPost>("blogs");

export const createBlogPost = async (
  postData: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">
): Promise<BlogPost> => {
  const newPost: BlogPost = {
    ...postData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await blogPostCollection().insertOne(newPost);
  const insertedPost = await blogPostCollection().findOne({ _id: result.insertedId });

  if (!insertedPost) {
    throw new Error("Failed to retrieve newly created blog post");
  }
  return insertedPost;
};
