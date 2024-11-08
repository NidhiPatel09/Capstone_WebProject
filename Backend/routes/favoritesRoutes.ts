// routes/favoritesRoutes.ts

import { Router } from "express";
import { addFavoriteRecipe } from "../controllers/favorites/addFavoriteRecipe";
import { removeFavoriteRecipe } from "../controllers/favorites/removeFavoriteRecipe";
import { getFavorites } from "../controllers/favorites/getFavorites";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/favorites", authMiddleware, addFavoriteRecipe);
router.delete("/favorites/:recipeId", removeFavoriteRecipe);
router.get("/favorites", authMiddleware, getFavorites);

export default router;
