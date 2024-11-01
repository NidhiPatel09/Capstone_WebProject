import { Request } from "express";

// Extending Express's User interface to include _id
declare global {
  namespace Express {
    interface User {
      _id: string; // Add any other properties your User object needs
    }
  }
}

// Custom AuthenticatedRequest type, extending Express's Request
export interface AuthenticatedRequest extends Request {
  user?: Express.User; // Use Express's User type, which now includes _id
}
