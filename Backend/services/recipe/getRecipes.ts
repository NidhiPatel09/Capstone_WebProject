import { getDB } from "../../config/db";
import { Recipe } from "../../types/recipeTypes";

export const getRecipes = async (limit: number = 10): Promise<Recipe[]> => {
  const db = getDB();
  return db.collection<Recipe>("recipe").find().limit(limit).toArray();
};

export const getVerifiedRecipes = async (userId: string): Promise<Recipe[]> => {
  try {
    const db = getDB();
    const recipe = db.collection<Recipe>("recipe");
    return await recipe.find({ isVerified: true, userId }).toArray();
  } catch (error) {
    console.error("Error fetching verified recipes for user:", error);
    throw error;
  }
};

export const getUnVerifiedRecipes = async (userId: string): Promise<Recipe[]> => {
  try {
    const db = getDB();
    const recipe = db.collection<Recipe>("recipe");
    return await recipe.find({ isVerified: false, userId }).toArray();
  } catch (error) {
    console.error("Error fetching verified recipes for user:", error);
    throw error;
  }
};