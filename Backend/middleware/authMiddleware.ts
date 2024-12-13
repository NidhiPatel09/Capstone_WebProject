import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/customTypes";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const typedReq = req as AuthenticatedRequest;
<<<<<<< HEAD
=======
  console.log(req.user)
>>>>>>> ff6026db5118d2a4e30addfccd7699e7e97e1076
  if (req.isAuthenticated && req.isAuthenticated()) {
    typedReq.user = req.user!;
    return next();
  }

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
  res.status(401).json({ message: "Unauthorized. Please log in." });
};

export const adminMiddleware: RequestHandler = async (req, res, next) => {
  const typedReq = req as AuthenticatedRequest;

  // Ensure user is authenticated
  if (!typedReq.user) {
    return res.status(403).json({ message: "Access denied. User not authenticated." });
  }

  // Check if the user has an admin role
  if (typedReq.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  // Proceed if the user is an admin
  next();
};