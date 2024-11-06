import fetchRecipes from "@/actions/fetchRecipes";
import Link from "next/link";

interface Recipe {
  title: string;
  ingredients: Array<string>;
  directions: Array<string>;
  link: string;
  source: string;
  ner: Array<string>;
}

export default async function Recipes() {
  const recipe = await fetchRecipes();
  return (
    <section className="py-16 bg-gray-100 pb-20">
      +
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Recipe Collections
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recipe && recipe.length > 0
            ? recipe.map((recipe: Recipe, index: number) => {
                const { title, link } = recipe;
                return (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src="https://res.cloudinary.com/dyof62lts/image/upload/v1728660976/step3_ygey49.png"
                      alt={title}
                    />
                    <div className="p-4 text-center">
                      <h2 className="text-lg font-bold mb-2">{title}</h2>
                      <p className="text-blue-700 underline text-sm mb-4">
                        <Link href={`https://${link}`}>
                          Check Out Full Recipe
                        </Link>
                      </p>
                      <button className="text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 px-12 py-2 rounded-md">
                        View Recipe
                      </button>
                    </div>
                  </div>
                );
              })
            : "No Recipes For Now! Please Check Again Later!"}
        </div>
      </div>
    </section>
  );
}
