import { Router, Response, RequestHandler } from "express";
import { addRecipeToFavorites, removeRecipeFromFavorites, getFavoriteRecipes } from "../models/userModel";
import { AuthenticatedRequest } from "../types/customTypes";

const router = Router();

// Route to add a recipe to favorites
const addFavoriteRecipe: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString(); // Convert ObjectId to string if needed
    const recipeId = req.body.recipeId; // Recipe ID should already be a string

    await addRecipeToFavorites(userId, recipeId); // Pass userId and recipeId as strings
    res.status(200).json({ message: "Recipe added to favorites!" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errMessage });
  }
};

// Route to remove a recipe from favorites
const removeFavoriteRecipe: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString(); // Convert ObjectId to string if needed
    const recipeId = req.params.recipeId; // Recipe ID is already a string

    await removeRecipeFromFavorites(userId, recipeId); // Pass userId and recipeId as strings
    res.status(200).json({ message: "Recipe removed from favorites!" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errMessage });
  }
};

// Route to get a user's favorite recipes
const getFavorites: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user._id.toString(); // Convert ObjectId to string if needed
    const favoriteRecipes = await getFavoriteRecipes(userId); // Pass userId as a string
    res.status(200).json(favoriteRecipes);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errMessage });
  }
};

// Register the routes
router.post("/favorites", addFavoriteRecipe);
router.delete("/favorites/:recipeId", removeFavoriteRecipe);
router.get("/favorites", getFavorites);

export default router;
