import { Response, Request } from "express";
import { AuthenticatedRequest } from "../../types/customTypes";
import { removeRecipeFromFavorites } from "../../services/user/removeRecipeFromFavorites";

export const removeFavoriteRecipe = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    if (!typedReq.user || !typedReq.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = typedReq.user._id.toString();
    const recipeId = typedReq.params.recipeId;

    await removeRecipeFromFavorites(userId, recipeId);
    return res.status(200).json({ message: "Recipe removed from favorites!" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ message: errMessage });
  }
};
