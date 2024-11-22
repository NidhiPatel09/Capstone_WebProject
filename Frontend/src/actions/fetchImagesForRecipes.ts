"use server";
import Recipe from "@/types/Recipe";
import axios from "axios";

export default async function fetchImagesForRecipes(recipes: Recipe[]) {
  const fetchedImages: { [key: string]: string } = {};
  const apiKey = process.env.PIXABAY_API_KEY;

  for (const recipe of recipes) {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
          recipe.title
        )}&image_type=photo&pretty=true`
      );
      const data = await response.data;

      if (data.hits && data.hits.length > 0) {
        fetchedImages[recipe._id] = data.hits[0].webformatURL;
      } else {
        fetchedImages[recipe._id] = "https://res.cloudinary.com/dyof62lts/image/upload/v1728660976/step2_iuqabp.png";
      }
    } catch (error) {
      console.error(`Failed to fetch image for ${recipe.title}:`, error);
      fetchedImages[recipe._id] = "https://res.cloudinary.com/dyof62lts/image/upload/v1728660976/step2_iuqabp.png";
    }
  }

  return fetchedImages;
}
