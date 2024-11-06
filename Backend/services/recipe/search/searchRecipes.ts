import { getDB } from "../../../config/db";
import { Recipe } from "../../../types/recipeTypes";

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
      { projection: { title: 1, ingredients: 1, NER: 1, directions: 1 } }
    )
    .limit(individualLimit)
    .toArray();

  const recipesFromNER = await db
    .collection<Recipe>("recipe")
    .find(
      { NER: { $all: ingredients } },
      { projection: { title: 1, ingredients: 1, NER: 1, directions: 1 } }
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

  return sortedRecipes.slice(skip, skip + limit);
}