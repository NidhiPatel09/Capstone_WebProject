import { getDB } from "../../config/db";
import { User } from "../../types/userTypes";

const usersCollection = () => getDB().collection<User>("users");

export const createUser = async (user: Omit<User, "_id">): Promise<User> => {
  const result = await usersCollection().insertOne(user);
  const newUser = await usersCollection().findOne({ _id: result.insertedId });

  if (newUser) {
    return { ...newUser, _id: newUser._id.toString() };
  } else {
    throw new Error("Failed to retrieve newly created user");
  }
};
