import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";
import { User } from "../../types/userTypes";

const usersCollection = () => getDB().collection<User>("users");

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await usersCollection().findOne({ _id: new ObjectId(id) });
  if (user) {
    return { ...user, _id: user._id?.toString() };
  }
  return null;
};
