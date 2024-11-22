"use client";
import fetchRecipeById from "@/actions/fetchRecipeById";
import fetchImagesForRecipeDetails from "@/actions/fetchImagesForRecipeDetails";
import Recipe from "@/types/Recipe";
import React, { useEffect, useState } from "react";

interface RecipeDetailsProps {
  recipeId: string;
}

export default function RecipeDetails({ recipeId }: RecipeDetailsProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    // Fetch recipe details and image
    async function getRecipeDetails() {
      if (recipeId) {
        try {
          // Fetch recipe by ID
          const data = await fetchRecipeById(recipeId);
          setRecipe(data);

          // Fetch image URL for the recipe
          const images = await fetchImagesForRecipeDetails(data);
          setImageUrl(images[data._id] || "https://res.cloudinary.com/dyof62lts/image/upload/v1728660976/step2_iuqabp.png"); // Fallback placeholder
        } catch (error) {
          console.error("Failed to fetch recipe details or image:", error);
        }
      }
    }

    getRecipeDetails();
  }, [recipeId]);

  // Return null if recipe ID is not provided or recipe details are not loaded
  if (!recipeId || !recipe) return null;

  return (
    <div className="recipe-details p-6 bg-white shadow-md rounded-md">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          {recipe.title}
        </h1>

        {/* Large Image */}
        {imageUrl && (
          <div className="mb-8 flex justify-center items-center">
            <img
              src={imageUrl}
              alt={recipe.title}
              className="h-auto rounded-md shadow-md"
            />
          </div>
        )}

        <p className="text-gray-600 mb-8 text-center">
          <strong>Source:</strong> {recipe.source}
        </p>

        {/* Ingredients Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Ingredients
          </h2>
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded-md">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Directions Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Directions
          </h2>
          <ol className="list-decimal list-inside bg-gray-100 p-4 rounded-md space-y-2">
            {recipe.directions.map((step, index) => (
              <li key={index} className="text-gray-700">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Link to Full Recipe */}
        <div className="text-center">
          <a
            href={`https://${recipe.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition duration-300"
          >
            View Full Recipe
          </a>
        </div>
      </div>
    </div>
  );
}
