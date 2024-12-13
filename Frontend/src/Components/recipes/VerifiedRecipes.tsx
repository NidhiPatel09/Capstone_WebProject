"use client";
import { fetchVerifiedRecipes } from "@/actions/fetchRecipes";
import React, { useEffect, useState } from "react";

const VerifiedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchVerifiedRecipes();
        setRecipes(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) return <p>Loading verified recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Verified Recipes</h2>
      {recipes.length === 0 ? (
        <p>No verified recipes found.</p>
      ) : (
        <ul>
          {recipes.map((recipe: any) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VerifiedRecipes;
