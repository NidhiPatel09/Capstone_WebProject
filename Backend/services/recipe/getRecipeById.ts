import { getDB } from "../../config/db";
import { Recipe } from "../../types/recipeTypes";
import { ObjectId } from "mongodb";

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const db = getDB();

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  return db.collection<Recipe>("recipe").findOne({ _id: new ObjectId(id) });
};
