import { getDB } from "../config/db";
import { ObjectId, WithId, ModifyResult } from "mongodb";

// BlogPost interface for posts
export interface BlogPost {
  _id?: ObjectId;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  servings: number;
  authorId: ObjectId;
  categories?: number[];
  publish: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Get the blog posts collection
const blogPostCollection = () => getDB().collection<BlogPost>("blogs");

// Create a new blog post
export const createBlogPost = async (
  postData: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">
): Promise<BlogPost> => {
  const newPost: BlogPost = {
    ...postData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await blogPostCollection().insertOne(newPost);

  // Retrieve the newly created post by its insertedId
  const insertedPost = await blogPostCollection().findOne({ _id: result.insertedId });
  if (!insertedPost) {
    throw new Error("Failed to retrieve newly created blog post");
  }
  return insertedPost;
};

// Get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  return await blogPostCollection().find().toArray();
};

// Get a blog post by ID
export const getBlogPostById = async (id: string | ObjectId): Promise<BlogPost | null> => {
  const objectId = typeof id === "string" ? new ObjectId(id) : id;
  return await blogPostCollection().findOne({ _id: objectId });
};

// Update a blog post by ID
export const updateBlogPost = async (
  id: string | ObjectId,
  updatedData: Partial<Omit<BlogPost, "_id" | "createdAt" | "authorId">>
): Promise<WithId<BlogPost> | null> => {
  const objectId = typeof id === "string" ? new ObjectId(id) : id;

  // Cast result to unknown first, then to ModifyResult<WithId<BlogPost>>
  const result = (await blogPostCollection().findOneAndUpdate(
    { _id: objectId },
    { $set: { ...updatedData, updatedAt: new Date() } },
    { returnDocument: "after" }
  )) as unknown as ModifyResult<WithId<BlogPost>>;

  // Safely return result.value if it exists, otherwise return null
  return result.value || null;
};

// Delete a blog post by ID
export const deleteBlogPost = async (id: string | ObjectId, authorId: ObjectId): Promise<boolean> => {
  const objectId = typeof id === "string" ? new ObjectId(id) : id;
  const result = await blogPostCollection().deleteOne({ _id: objectId, authorId });
  return result?.deletedCount === 1;
};
