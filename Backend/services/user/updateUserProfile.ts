import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";
import { User } from "../../types/userTypes";

const usersCollection = () => getDB().collection<User>("users");

export const updateUserProfile = async (
  userId: string,
  displayName: string,
  profilePicture: string
): Promise<void> => {
  await usersCollection().updateOne(
    { _id: new ObjectId(userId) },
    { $set: { displayName, profilePicture } }
  );
};