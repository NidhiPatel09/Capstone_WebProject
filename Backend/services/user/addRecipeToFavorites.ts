import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";
import { User } from "../../types/userTypes";

const usersCollection = () => getDB().collection<User>("users");

export const addRecipeToFavorites = async (
  userId: string,
  recipeId: string
): Promise<void> => {
  await usersCollection().updateOne(
    { _id: new ObjectId(userId) },
    { $addToSet: { favoriteRecipes: new ObjectId(recipeId) } }
  );
};
