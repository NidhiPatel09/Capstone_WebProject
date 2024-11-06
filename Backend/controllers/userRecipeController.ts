import { Response, Request } from "express";
import { addRecipeToFavorites, removeRecipeFromFavorites, getFavoriteRecipes } from "../models/userModel";
import { AuthenticatedRequest } from "../types/customTypes";

// Controller for adding a recipe to favorites
export const addFavoriteRecipe = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString();
    const recipeId = req.body.recipeId;

    await addRecipeToFavorites(userId, recipeId);
    return res.status(200).json({ message: "Recipe added to favorites!" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ message: errMessage });
  }
};

// Controller for removing a recipe from favorites
export const removeFavoriteRecipe = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString();
    const recipeId = req.params.recipeId;

    await removeRecipeFromFavorites(userId, recipeId);
    return res.status(200).json({ message: "Recipe removed from favorites!" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ message: errMessage });
  }
};

// Controller for retrieving a user's favorite recipes
export const getFavorites = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString();
    const favoriteRecipes = await getFavoriteRecipes(userId);
    return res.status(200).json(favoriteRecipes);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ message: errMessage });
  }
};
