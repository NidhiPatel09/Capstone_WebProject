import { Router } from "express";
<<<<<<< HEAD
import { fetchRecipes, fetchRecipeById ,searchRecipesByIngredients} from "../controllers/recipeController";
=======
import { fetchRecipes } from "../controllers/recipe/fetchRecipes";
import { fetchRecipeById } from "../controllers/recipe/fetchRecipeById";
import { searchRecipesByIngredients } from "../controllers/recipe/searchRecipesByIngredients";
>>>>>>> main

const router = Router();

router.get("/recipes", fetchRecipes);
<<<<<<< HEAD
router.get('/recipes/search', searchRecipesByIngredients);
router.get("/recipes/:id", fetchRecipeById);
=======
router.get("/recipes/search", searchRecipesByIngredients);
router.get("/recipes/:id", fetchRecipeById);

>>>>>>> main
export default router;
