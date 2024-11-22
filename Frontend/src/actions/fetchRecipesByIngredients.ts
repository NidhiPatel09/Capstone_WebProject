"use server";

import axios from "axios";

export default async function fetchRecipesByIngredients(query: string) {
  // backend app port
  const backendPort = process.env.BACKEND_PORT || 5000;
  // backend base url
  const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
  if (query) {
    const response = await axios.get(`${backendBaseUrl}/api/recipes/search?ingredients=${encodeURIComponent(query)}`);
    const { data, status } = response;
    if (status === 200) {
      return data;
    }
  }
}
