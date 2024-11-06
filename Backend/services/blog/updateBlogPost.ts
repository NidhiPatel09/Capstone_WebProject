import { getDB } from "../../config/db";
import { BlogPost } from "../../types/blogPostTypes";
import { ObjectId, WithId, ModifyResult } from "mongodb";

const blogPostCollection = () => getDB().collection<BlogPost>("blogs");

export const updateBlogPost = async (
  id: string | ObjectId,
  updatedData: Partial<Omit<BlogPost, "_id" | "createdAt" | "authorId">>
): Promise<WithId<BlogPost> | null> => {
  const objectId = typeof id === "string" ? new ObjectId(id) : id;

  const result = (await blogPostCollection().findOneAndUpdate(
    { _id: objectId },
    { $set: { ...updatedData, updatedAt: new Date() } },
    { returnDocument: "after" }
  )) as unknown as ModifyResult<WithId<BlogPost>>;

  return result.value || null;
};
