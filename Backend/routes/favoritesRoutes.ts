// routes/favoritesRoutes.ts

import { Router } from "express";
import { addFavoriteRecipe } from "../controllers/favorites/add/addFavoriteRecipe";
import { removeFavoriteRecipe } from "../controllers/favorites/remove/removeFavoriteRecipe";
import { getFavorites } from "../controllers/favorites/get/getFavorites";

const router = Router();

router.post("/favorites", addFavoriteRecipe);
router.delete("/favorites/:recipeId", removeFavoriteRecipe);
router.get("/favorites", getFavorites);

export default router;
