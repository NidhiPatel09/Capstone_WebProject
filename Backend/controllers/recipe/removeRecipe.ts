import { Request, Response } from "express";
import { deleteRecipe } from "../../services/recipe/deleteRecipe";
import { AuthenticatedRequest } from "../../types/customTypes";

export const removeRecipe = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    if (!typedReq.user || !typedReq.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    // Call the service to delete the recipe
    const isDeleted = await deleteRecipe(id);

    if (!isDeleted) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Respond with success message
    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
