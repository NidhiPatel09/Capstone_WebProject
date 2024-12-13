import { Router } from "express";
import { fetchRecipes, fetchUnVerifiedRecipes, fetchVerifiedRecipes } from "../controllers/recipe/fetchRecipes";
import { fetchRecipeById } from "../controllers/recipe/fetchRecipeById";
import { searchRecipesByIngredients } from "../controllers/recipe/searchRecipesByIngredients";
import { addRecipe } from "../controllers/recipe/addRecipe";
import { removeRecipe } from "../controllers/recipe/removeRecipe";
import { editRecipe } from "../controllers/recipe/editRecipe";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/recipes", fetchRecipes);
router.get("/verified-recipes", fetchVerifiedRecipes);
router.get("/unverified-recipes", fetchUnVerifiedRecipes);
router.post("/create-recipe", authMiddleware, addRecipe);
router.put("/update-recipe/:id", authMiddleware, editRecipe);
router.delete("/delete-recipe/:id", authMiddleware, removeRecipe);
router.get("/recipes/search", searchRecipesByIngredients);
router.get("/recipes/:id", fetchRecipeById);

export default router;
