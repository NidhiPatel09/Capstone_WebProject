import { Router } from "express";
import { fetchRecipes, fetchRecipeById ,searchRecipesByIngredients} from "../controllers/recipeController";

const router = Router();

router.get("/recipes", fetchRecipes);
router.get('/recipes/search', searchRecipesByIngredients);
router.get("/recipes/:id", fetchRecipeById);
export default router;
