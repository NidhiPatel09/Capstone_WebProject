import { getDB } from "../../../config/db";
import { User } from "../../../types/userTypes";

const usersCollection = () => getDB().collection<User>("users");

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await usersCollection().findOne({ email });
  if (user) {
    return { ...user, _id: user._id?.toString() };
  }
  return null;
};