import { Request, Response } from "express";
import { searchRecipes } from "../../services/recipe/searchRecipes";

export const searchRecipesByIngredients = async (
  req: Request,
  res: Response
): Promise<void> => {
  const searchText = (req.query.query as string) || "";
  const ingredients = req.query.ingredients
    ? (req.query.ingredients as string).split(",")
    : [];
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = parseInt(req.query.skip as string) || 0;

  try {
    const recipes = await searchRecipes(searchText, ingredients, limit, skip);
    res.json(recipes);
  } catch (error) {
    console.error("Error searching for recipes:", error);
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errMessage });
  }
};
