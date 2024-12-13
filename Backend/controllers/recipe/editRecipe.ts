import { Request, Response } from "express";
import { validateUpdateRecipe } from "./validations/recipeValidators";
import { updateRecipe } from "../../services/recipe/updateRecipe";
import { AuthenticatedRequest } from "../../types/customTypes";

export const editRecipe = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    if (!typedReq.user || !typedReq.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    // Validate input
    const validationErrors = validateUpdateRecipe(typedReq.body);

    // If validation errors exist, send them as a response
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Call the service to update the recipe
    const updatedRecipe = await updateRecipe(id, typedReq.body);

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Respond with the updated recipe
    return res.status(200).json(updatedRecipe);
  } catch (error: any) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
