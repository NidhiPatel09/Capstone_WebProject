import { RequestHandler } from "express";
<<<<<<< HEAD
=======
import jwt from "jsonwebtoken";
>>>>>>> main
import { AuthenticatedRequest } from "../types/customTypes";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const typedReq = req as AuthenticatedRequest;

  if (req.isAuthenticated && req.isAuthenticated()) {
    typedReq.user = req.user!;
    return next();
  }

<<<<<<< HEAD
=======
  // Check for JWT-based authentication
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };
      typedReq.user = { _id: decoded.id };
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  // If neither authentication method succeeds, respond with 401
>>>>>>> main
  res.status(401).json({ message: "Unauthorized. Please log in." });
};
