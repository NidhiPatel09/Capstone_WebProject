import { getDB } from "../config/db";
import { ObjectId } from "mongodb";
import { Recipe } from "../types/Recipe";


export const searchRecipes = async (
  searchText: string,
  ingredients: string[],
  limit: number = 10,
  skip: number = 0
): Promise<Recipe[]> => {
  const db = getDB();

  if (ingredients.length === 0) {
    return [];
  }

  const individualLimit = 100; 

  const recipesFromIngredients = await db
    .collection<Recipe>("recipe")
    .find(
      { ingredients: { $all: ingredients } },
      { projection: { title: 1, ingredients: 1, NER: 1 ,directions:1} }
    )
    .limit(individualLimit)
    .toArray();

  const recipesFromNER = await db
    .collection<Recipe>("recipe")
    .find(
      { NER: { $all: ingredients } },
      { projection: { title: 1, ingredients: 1, NER: 1 ,directions:1} }
    )
    .limit(individualLimit)
    .toArray();

  const recipesMap = new Map<string, Recipe>();
  [...recipesFromIngredients, ...recipesFromNER].forEach((recipe) => {
    recipesMap.set(recipe._id.toString(), recipe);
  });
  const uniqueRecipes = Array.from(recipesMap.values());

  const sortedRecipes = uniqueRecipes.sort((a, b) => {
    const aExtraIngredients = a.ingredients.length - ingredients.length;
    const bExtraIngredients = b.ingredients.length - ingredients.length;
    return aExtraIngredients - bExtraIngredients;
  });

  const paginatedRecipes = sortedRecipes.slice(skip, skip + limit);

  return paginatedRecipes;
};


export const getRecipes = async (limit: number = 10): Promise<Recipe[]> => {
  const db = getDB();
  return db.collection<Recipe>("recipe").find().limit(limit).toArray();
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const db = getDB();

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  return db.collection<Recipe>("recipe").findOne({ _id: new ObjectId(id) });
};

