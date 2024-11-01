import { getDB } from "../config/db";
import { ObjectId } from "mongodb";

export interface TotalPosts {
  _id?: ObjectId;
  id: string;
  count: number;
}

const totalPostsCollection = () => getDB().collection<TotalPosts>("totalPosts");

export const incrementTotalPosts = async (): Promise<void> => {
  await totalPostsCollection().updateOne(
    { id: "totalPosts" },
    { $inc: { count: 1 } },
    { upsert: true }
  );
};

export const getTotalPostsCount = async (): Promise<number> => {
  const totalPosts = await totalPostsCollection().findOne({ id: "totalPosts" });
  return totalPosts ? totalPosts.count : 0;
};
