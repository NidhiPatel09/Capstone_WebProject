import { Router } from "express";
import { approveRecipe } from "../controllers/admin/approveRecipe";

const router = Router();

router.get("/approve-recipe", approveRecipe);

export default router;
