import { getDB } from "../../config/db";
import { User } from "../../types/userTypes";

const usersCollection = () => getDB().collection<User>("users");

export const createUserWithFacebookId = async (
  facebookId: string,
  displayName: string,
  profilePicture: string
): Promise<User> => {
  const newUser: Omit<User, "_id"> = {
    facebookId,
    favoriteRecipes: [],
    displayName,
    profilePicture,
  };
  const result = await usersCollection().insertOne(newUser);
  const user = await usersCollection().findOne({ _id: result.insertedId });

  if (user) {
    return { ...user, _id: user._id.toString() };
  } else {
    throw new Error("Failed to retrieve newly created user");
  }
};
