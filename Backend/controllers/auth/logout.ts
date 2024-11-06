import { Request, Response, NextFunction } from "express";

export const logout = (req: Request, res: Response, next: NextFunction): void => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
};
