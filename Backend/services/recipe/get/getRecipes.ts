import { getDB } from "../../../config/db";
import { Recipe } from "../../../types/recipeTypes";

export const getRecipes = async (limit: number = 10): Promise<Recipe[]> => {
  const db = getDB();
  return db.collection<Recipe>("recipe").find().limit(limit).toArray();
};