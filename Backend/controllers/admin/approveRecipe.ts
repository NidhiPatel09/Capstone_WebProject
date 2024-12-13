import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { AuthenticatedRequest } from "../../types/customTypes";
import { getDB } from "../../config/db";
import { Recipe } from "../../types/recipeTypes";

export const approveRecipe = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const typedReq = req as AuthenticatedRequest;

  try {
    // Ensure the user is an admin
    if (!typedReq.user || !typedReq.user.role || typedReq.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { recipeId } = req.body;

    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID is required." });
    }

    const db = getDB();
    const result = await db.collection<Recipe>("recipes").updateOne(
      { _id: new ObjectId(recipeId), isVerified: false },
      { $set: { isVerified: true, verifiedAt: new Date().toISOString() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Recipe not found or already verified." });
    }

    return res.json({ message: "Recipe approved successfully." });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ message: errMessage });
  }
};
