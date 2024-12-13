"use server";

import axios from "axios";
import { apiClient } from "./requestHandler";

export default async function fetchFavoriteRecipes() {
    const response = await apiClient.get(`/user/favorites/favorites`);
    const { data, status } = response;
    if (status === 200) {
        return data;
    } else {
        throw new Error(`Failed to fetch blogs: ${status}`);
    }
}
