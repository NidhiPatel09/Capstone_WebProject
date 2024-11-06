import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";
import { User } from "../../types/userTypes";

const usersCollection = () => getDB().collection<User>("users");

export const getFavoriteRecipes = async (userId: string): Promise<string[]> => {
  const user = await usersCollection().findOne({ _id: new ObjectId(userId) });
  return user?.favoriteRecipes.map((recipeId) => recipeId.toString()) || [];
};
