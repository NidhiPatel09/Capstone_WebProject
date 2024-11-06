import { Request, Response } from "express";
import { getRecipes } from "../../services/recipe/getRecipes";

export const fetchRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipes = await getRecipes(10);
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errMessage });
  }
};
