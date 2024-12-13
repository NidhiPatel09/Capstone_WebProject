"use server";

import { RecipeForCreation } from "@/types/Recipe";
import { apiClient } from "./requestHandler";

export default async function createRecipe(recipeData: RecipeForCreation) {
  try {
    // Call the create-recipe API
    const response = await apiClient.post("/api/create-recipe", recipeData);

    const { data, status } = response;
    console.log(data);
    
    // Check for successful response
    if (status === 201) {
      return data; // Return the created recipe data
    } else {
      throw new Error(`Failed to create recipe: ${status}`);
    }
  } catch (error: any) {
    // Handle error and propagate the message
    console.log(error.response?.data);
    
    throw new Error(error.response?.data?.errors || "Failed to create recipe");
  }
}
