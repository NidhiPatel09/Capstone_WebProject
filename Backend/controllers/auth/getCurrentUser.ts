import { Request, Response } from "express";
import { findUserById } from "../../services/user/findUserById";
import { AuthenticatedRequest } from "../../types/customTypes";

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const typedReq = req as AuthenticatedRequest;

  try {
    const userId = typedReq.user?._id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID not found" });
      return;
    }

    const user = await findUserById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Exclude sensitive information like password
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({  
      user: userWithoutPassword,
      message: "Authenticated user details retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Error fetching current user" });
  }
};
