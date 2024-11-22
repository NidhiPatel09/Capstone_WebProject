"use client";
import React, { useState } from "react";
import Recipe from "@/types/Recipe";
import fetchRecipesByIngredients from "@/actions/fetchRecipesByIngredients";

interface SearchByIngredientsProps {
  onResults: (recipes: Recipe[]) => void;
}

export default function SearchByIngredients({ onResults }: SearchByIngredientsProps) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      // passing the query entered by the user
      const recipes = await fetchRecipesByIngredients(query);
      onResults(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="flex justify-center my-8">
      <input
        type="text"
        placeholder="Search by ingredients (e.g., butter, vanilla wafers)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="py-2 px-4 text-black border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-md"
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white px-6 py-2 rounded-r-full hover:bg-green-600 transition duration-300"
      >
        Search
      </button>
    </div>
  );
}
