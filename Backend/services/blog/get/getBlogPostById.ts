import { getDB } from "../../../config/db";
import { BlogPost } from "../../../types/blogPostTypes";
import { ObjectId } from "mongodb";

const blogPostCollection = () => getDB().collection<BlogPost>("blogs");

export const getBlogPostById = async (id: string | ObjectId): Promise<BlogPost | null> => {
  const objectId = typeof id === "string" ? new ObjectId(id) : id;
  return await blogPostCollection().findOne({ _id: objectId });
};