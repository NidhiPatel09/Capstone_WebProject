"use server";
import axios from "axios";
import { apiClient } from "./requestHandler";

export default async function addFavoriteRecipe(recipeId: string) {
  try {
    const response = await apiClient.post(
      `/user/favorites/favorites`,
      { recipeId }
    );

    if (response.status === 200) {
      return response.data.message;
    }
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data.message;
  }
}
