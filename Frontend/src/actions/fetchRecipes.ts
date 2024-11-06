"use server";

import axios from "axios";

export default async function fetchRecipes() {
    // backend app port
    const backendPort = process.env.BACKEND_PORT || 5000;
    // backend base url
    const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
    // fetching recipes from the recipes api endpoint
    const response = await axios.get(`${backendBaseUrl}/api/recipes`);
    const { data, status } = response;
    if(status === 200) {
        return data;
    }
}