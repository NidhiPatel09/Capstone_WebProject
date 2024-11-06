import { Router } from "express";
import { fetchRecipes } from "../controllers/recipe/fetchRecipes";
import { fetchRecipeById } from "../controllers/recipe/fetchRecipeById";
import { searchRecipesByIngredients } from "../controllers/recipe/searchRecipesByIngredients";

const router = Router();

router.get("/recipes", fetchRecipes);
router.get("/recipes/search", searchRecipesByIngredients);
router.get("/recipes/:id", fetchRecipeById);

export default router;
