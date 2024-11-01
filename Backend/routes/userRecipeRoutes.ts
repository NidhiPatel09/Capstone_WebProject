import { Router } from "express";
import { addFavoriteRecipe, removeFavoriteRecipe, getFavorites } from "../controllers/userRecipeController";

const router = Router();

router.post("/favorites", addFavoriteRecipe);
router.delete("/favorites/:recipeId", removeFavoriteRecipe);
router.get("/favorites", getFavorites);

export default router;
