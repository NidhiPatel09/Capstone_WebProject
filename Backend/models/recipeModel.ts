import { getDB } from "../config/db";
import { ObjectId } from "mongodb";
import { Recipe } from "../types/Recipe";

export const getRecipes = async (limit: number = 10): Promise<Recipe[]> => {
  const db = getDB();
  return db.collection<Recipe>("recipe").find().limit(limit).toArray();
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const db = getDB();
  return db.collection<Recipe>("recipe").findOne({ _id: new ObjectId(id) });
};
