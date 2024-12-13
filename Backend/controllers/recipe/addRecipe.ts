  import { Request, Response } from "express";
  import { validateCreateRecipe } from "./validations/recipeValidators";
  import { createRecipe } from "../../services/recipe/createRecipe";
  import { AuthenticatedRequest } from "../../types/customTypes";

  export const addRecipe = async (
      req: Request,
      res: Response
    ): Promise<Response> => {
      const typedReq = req as AuthenticatedRequest;
      try {
        if (!typedReq.user || !typedReq.user._id) {
          return res.status(401).json({ message: "Unauthorized" });
        }
    
        const userId = typedReq.user._id.toString();
        
      // Validate input
      const validationErrors = validateCreateRecipe(typedReq.body);

      // If validation errors exist, send them as a response
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }

      // Call the service to create the recipe
      const recipe = await createRecipe({ ...typedReq.body, userId });

      // Respond with the created recipe
      return res.status(201).json(recipe);
    } catch (error: any) {
      return res.status(500).json({ error: "Internal server error." });
    }
  };
