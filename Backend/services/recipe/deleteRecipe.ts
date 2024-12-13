import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";

/**
 * Service to delete a recipe.
 * @param id - The ID of the recipe to delete.
 * @returns A boolean indicating whether the recipe was deleted.
 */
export const deleteRecipe = async (id: string): Promise<boolean> => {
  const db = getDB();

  // Convert string ID to ObjectId
  const recipeId = new ObjectId(id);

  // Delete the recipe
  const result = await db.collection("recipe").deleteOne({ _id: recipeId });

  // Return true if a recipe was deleted, otherwise false
  return result.deletedCount > 0;
};
