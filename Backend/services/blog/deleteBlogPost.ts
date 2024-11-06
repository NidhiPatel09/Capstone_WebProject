import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";
import { BlogPost } from "../../types/blogPostTypes";

const blogPostCollection = () => getDB().collection<BlogPost>("blogs");

export const deleteBlogPost = async (
  id: string | ObjectId,
  authorId: ObjectId
): Promise<boolean> => {
  const objectId = typeof id === "string" ? new ObjectId(id) : id;
  const result = await blogPostCollection().deleteOne({
    _id: objectId,
    authorId,
  });
  return result?.deletedCount === 1;
};
