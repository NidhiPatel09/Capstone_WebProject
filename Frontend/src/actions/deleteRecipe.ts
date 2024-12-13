"use server";

import axios from "axios";

export default async function deleteRecipe(recipeId: string) {
  try {
    // Call the delete-recipe API
    const response = await axios.delete(`/api/delete-recipe/${recipeId}`);

    const { status } = response;

    // Check for successful response
    if (status === 200) {
      return { message: "Recipe deleted successfully" };
    } else {
      throw new Error(`Failed to delete recipe: ${status}`);
    }
  } catch (error: any) {
    // Handle error and propagate the message
    throw new Error(error.response?.data?.error || "Failed to delete recipe");
  }
}
