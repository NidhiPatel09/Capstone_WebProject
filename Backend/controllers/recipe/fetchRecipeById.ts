import { Request, Response } from "express";
import { getRecipeById } from "../../services/recipe/getRecipeById";

export const fetchRecipeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipeId = req.params.id;
    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    res.json(recipe);
  } catch (error) {
    console.error(`Error fetching recipe with ID: ${req.params.id}`, error);
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errMessage });
  }
};
