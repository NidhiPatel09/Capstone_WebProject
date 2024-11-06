import { Router } from "express";
import { fetchRecipes } from "../controllers/recipe/get/fetchRecipes";
import { fetchRecipeById } from "../controllers/recipe/get/fetchRecipeById";
import { searchRecipesByIngredients } from "../controllers/recipe/search/searchRecipesByIngredients";

const router = Router();

router.get("/recipes", fetchRecipes);
router.get("/recipes/search", searchRecipesByIngredients);
router.get("/recipes/:id", fetchRecipeById);

export default router;
