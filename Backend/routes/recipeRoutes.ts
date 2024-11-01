import { Router } from "express";
import { fetchRecipes, fetchRecipeById } from "../controllers/recipeController";

const router = Router();

router.get("/recipes", fetchRecipes);
router.get("/recipes/:id", fetchRecipeById);

export default router;
