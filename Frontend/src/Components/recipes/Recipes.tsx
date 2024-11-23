"use client";

import { useEffect, useState } from "react";
import fetchRecipes from "@/actions/fetchRecipes";
import fetchImagesForRecipes from "@/actions/fetchImagesForRecipes";
import Link from "next/link";
import Recipe from "@/types/Recipe";
import SearchByIngredients from "@/Components/recipes/SearchByIngredients";
import { SkeletonLoader } from "../Loaders/SkeletonLoader";
import RecipeDetails from "./RecipeDetails";
import Modal from "../Modal";

export default function Recipes() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  useEffect(() => {
    async function getRecipes() {
      try {
        const data = await fetchRecipes();
        setAllRecipes(data);
        setDisplayedRecipes(data);

        const images = await fetchImagesForRecipes(data);

        const initialLoadingStates = Object.keys(images).reduce((acc, id) => {
          acc[id] = false;
          return acc;
        }, {} as { [key: string]: boolean });

        setLoadingImages(initialLoadingStates);
        setImageUrls(images);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    }
    getRecipes();
  }, []);

  const handleSearchResults = async (results: Recipe[] | null) => {
    if (results && results.length > 0) {
      setDisplayedRecipes(results);
      const images = await fetchImagesForRecipes(results);
      setImageUrls(images);
    } else {
      setDisplayedRecipes(allRecipes);
    }
  };

  const handleImageLoad = (id: string) => {
    setLoadingImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleViewRecipe = (id: string) => {
    setSelectedRecipeId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipeId(null);
  };

  return (
    <section className="py-16 bg-gray-100 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl text-black font-bold text-center mb-12">
          Recipe Collections
        </h1>

        <SearchByIngredients onResults={handleSearchResults} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {displayedRecipes && displayedRecipes.length > 0
            ? displayedRecipes.map((recipe: Recipe) => {
                const { _id, title, link } = recipe;
                const imageUrl = imageUrls[_id];
                const isLoading = !loadingImages[_id];

                return (
                  <div
                    key={_id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    {isLoading && (
                      <SkeletonLoader width={347.8} height={192} />
                    )}

                    <img
                      className={`w-full h-48 object-cover ${
                        isLoading ? "hidden" : ""
                      }`}
                      src={imageUrl}
                      alt={title}
                      onLoad={() => handleImageLoad(_id)}
                    />

                    <div className="p-4 text-center">
                      <h2 className="text-lg text-black font-bold mb-2">
                        {title}
                      </h2>
                      <p className="text-blue-700 underline text-sm mb-4">
                        <Link href={`https://${link}`}>
                          Check Out Full Recipe
                        </Link>
                      </p>
                      <button
                        onClick={() => handleViewRecipe(_id)}
                        className="text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 px-12 py-2 rounded-md"
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                );
              })
            : "No Recipes For Now! Please Check Again Later!"}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedRecipeId && <RecipeDetails recipeId={selectedRecipeId} />}
      </Modal>
    </section>
  );
}
