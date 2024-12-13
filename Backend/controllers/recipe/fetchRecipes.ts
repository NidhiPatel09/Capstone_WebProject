import { Request, Response } from "express";
import {
  getRecipes,
  getUnVerifiedRecipes,
  getVerifiedRecipes,
} from "../../services/recipe/getRecipes";
import { AuthenticatedRequest } from "../../types/customTypes";

export const fetchRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipes = await getRecipes(10);
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errMessage });
  }
};

export const fetchVerifiedRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    if (!typedReq.user || !typedReq.user._id) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const userId = typedReq.user._id.toString();
    if (userId) {
      const recipes = await getVerifiedRecipes(userId);
      res.json(recipes);
    }
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errMessage });
  }
};

export const fetchUnVerifiedRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;
  try {
    if (!typedReq.user || !typedReq.user._id) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const userId = typedReq.user._id.toString();
    if (userId) {
      const recipes = await getUnVerifiedRecipes(userId);
      res.json(recipes);
    }
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errMessage });
  }
};
