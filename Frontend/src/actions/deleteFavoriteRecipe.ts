"use server";
import { apiClient } from "./requestHandler";

export default async function deleteFavoriteRecipe(recipeId: string) {
  try {
    const response = await apiClient.delete(
      `/user/favorites/favorites/${recipeId}`
    );

    if (response.status === 200) {
      return response.data.message;
    }
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data.message;
  }
}
