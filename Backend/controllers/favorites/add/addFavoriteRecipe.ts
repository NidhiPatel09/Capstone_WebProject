import { Response, Request } from "express";
import { AuthenticatedRequest } from "../../../types/customTypes";
import { addRecipeToFavorites } from "../../../services/user/update/addRecipeToFavorites";

export const addFavoriteRecipe = async (req: Request, res: Response): Promise<Response> => {
  const typedReq = req as AuthenticatedRequest; 
  try {
    if (!typedReq.user || !typedReq.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = typedReq.user._id.toString();
    const recipeId = typedReq.body.recipeId;

    await addRecipeToFavorites(userId, recipeId);
    return res.status(200).json({ message: "Recipe added to favorites!" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ message: errMessage });
  }
};
