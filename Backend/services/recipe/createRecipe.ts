import { getDB } from "../../config/db";
import { Recipe } from "../../types/recipeTypes";

/**
 * Service to create a new recipe.
 * @param recipeData - The recipe details provided by the user.
 * @returns The created recipe object.
 */
export const createRecipe = async (recipeData: Omit<Recipe, "_id" | "isVerified" | "createdAt">): Promise<Recipe> => {
  const db = getDB();

  // Add default properties
  const newRecipe: Recipe = {
    ...recipeData,
    isVerified: false, // Default to false
    createdAt: new Date().toISOString(), // Add creation timestamp
  };

  // Insert the recipe into the database
  const result = await db.collection<Recipe>("recipe").insertOne(newRecipe);

  // Return the inserted recipe with its MongoDB ID
  return { _id: result.insertedId, ...newRecipe };
};
