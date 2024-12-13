"use server";
import { apiClient } from "../requestHandler";

export default async function approveRecipe(recipeId: string) {
  try {
    const response = await apiClient.post(
      `/admin/approve-recipe`,
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
