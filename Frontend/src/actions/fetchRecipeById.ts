"use server";

import axios from "axios";

export default async function fetchRecipeById(recipeId: String) {
    // backend app port
    const backendPort = process.env.BACKEND_PORT || 5000;
    // backend base url
    const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
    console.log(backendBaseUrl);
    
    // fetching recipes from the recipes api endpoint
    const response = await axios.get(`${backendBaseUrl}/api/recipes/${recipeId}`);
    const { data, status } = response;
    if(status === 200) {
        return data;
    }
}