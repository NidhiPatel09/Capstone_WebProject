// routes/favoritesRoutes.ts

import { Router } from "express";
import { addFavoriteRecipe } from "../controllers/favorites/addFavoriteRecipe";
import { removeFavoriteRecipe } from "../controllers/favorites/removeFavoriteRecipe";
import { getFavorites } from "../controllers/favorites/getFavorites";

const router = Router();

router.post("/favorites", addFavoriteRecipe);
router.delete("/favorites/:recipeId", removeFavoriteRecipe);
router.get("/favorites", getFavorites);

export default router;
