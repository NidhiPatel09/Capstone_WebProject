import { Request } from "express";

declare global {
  namespace Express {
    interface User {
      _id: string;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: Express.User;
}
