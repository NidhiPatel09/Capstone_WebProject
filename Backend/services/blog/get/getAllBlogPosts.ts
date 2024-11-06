import { getDB } from "../../../config/db";
import { BlogPost } from "../../../types/blogPostTypes";

const blogPostCollection = () => getDB().collection<BlogPost>("blogs");

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  return await blogPostCollection().find().toArray();
};