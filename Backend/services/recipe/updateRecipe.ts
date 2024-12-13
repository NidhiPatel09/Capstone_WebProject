import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";
import { Recipe } from "../../types/recipeTypes";

/**
 * Service to update a recipe.
 * @param id - The ID of the recipe to update.
 * @param updates - The fields to update.
 * @returns The updated recipe object.
 */
export const updateRecipe = async (
  id: string,
  updates: Partial<Omit<Recipe, "_id" | "createdAt">>
): Promise<Recipe | null> => {
  const db = getDB();

  // Convert string ID to ObjectId
  const recipeId = new ObjectId(id);

  // Perform the update
  const result = await db.collection<Recipe>("recipe").findOneAndUpdate(
    { _id: recipeId },
    { $set: updates },
    { returnDocument: "after" } // Return the updated document
  );

  // Return the updated recipe or null if not found
  return result;
};
