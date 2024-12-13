"use server";

import Recipe from "@/types/Recipe";
import axios from "axios";

export default async function updateRecipe(recipeId: string, updatedData: Partial<Recipe>) {
  try {
    // Call the update-recipe API
    const response = await axios.put(`/api/update-recipe/${recipeId}`, updatedData);

    const { data, status } = response;

    // Check for successful response
    if (status === 200) {
      return data; // Return the updated recipe data
    } else {
      throw new Error(`Failed to update recipe: ${status}`);
    }
  } catch (error: any) {
    // Handle error and propagate the message
    throw new Error(error.response?.data?.error || "Failed to update recipe");
  }
}
