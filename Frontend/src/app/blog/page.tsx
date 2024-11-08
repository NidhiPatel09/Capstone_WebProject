"use client";

import React, { useState } from "react";

export default function Blog() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {/* Background Section */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: "url('/images/profile-back-header.jpg')",
          objectFit: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold">
            {isLoggedIn ? "Welcome, User!" : "Explore Recipe Blog!"}
          </h1>
          {!isLoggedIn && (
            <p className="mt-2 text-lg">To be able to save recipes, sign up!</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`p-8 ${isLoggedIn ? 'flex justify-center' : 'grid grid-cols-1 lg:grid-cols-4 gap-8'}`}>
        {/* Sidebar Section */}
        {!isLoggedIn && (
          <aside className="bg-dark-100 p-6 rounded-lg shadow mb-8">
            <div className="border rounded-lg overflow-hidden shadow">
              <img
                src="/images/col1.png"
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">Pasta Delight</h3>
                <p className="text-sm text-gray-600">
                  A classic pasta recipe with a rich tomato sauce.
                </p>
                <h2 className="text-m mt-2 mb-2 font-bold">Description</h2>
                <ul>
                  <li>8 Oz penne pasta</li>
                  <li>4 Tbsp olive oil</li>
                  <li>4 garlic, minced</li>
                  <li>1/2 cup(s) mushrooms</li>
                  <li>1/2 cup(s) yellow onion, chopped</li>
                  <li>8 Oz cherry tomatoes</li>
                  <li>8 Oz yellow cherry tomatoes</li>
                  <li>6 Oz yellow squash, sliced</li>
                  <li>3 Tsp H‑E‑B Balsamic Vinegar of Modena</li>
                  <li>1/2 cup(s) lemon juice</li>
                  <li>1/2 cup(s) basil, chopped</li>
                  <li>8 Oz arugula</li>
                  <li>1/8 cup(s) shredded Parmesan cheese</li>
                  <li>1/2 Tsp black pepper</li>
                </ul>
                <h2 className="text-m mt-2 mb-2 font-bold">Steps</h2>
                <ul className="space-y-4 mt-2 mb-2 text-white-600">
                  <li>1. Prepare pasta as directed on box until al dente. Drain and return to pot. Set aside.</li>
                  <li>2. Place a large skillet over medium heat. Add 1 tablespoon olive oil, garlic, mushrooms, and onions. Cook until mushrooms are tender.</li>
                  <li>3. Reduce heat and add cherry tomatoes, squash, and a sprinkle of olive oil if ingredients are sticking to the pan. Cover and continue to cook, stirring occasionally, until tomatoes are soft and well cooked.</li>
                  <li>4. Add pasta, balsamic vinegar, remaining olive oil, lemon juice, and basil. Cover and cook for 5 minutes, stirring occasionally. Add arugula, cover, and continue to cook on low until arugula is wilted.</li>
                  <li>5. Remove from heat and add Parmesan and pepper. Cover until cheese is melted.</li>
                </ul>
                <button className="group relative w-full flex justify-center mt-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Add to Collection
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Main Blog Section */}
        <div className={`flex ${isLoggedIn ? 'flex-col items-center' : 'lg:col-span-3'}`}>
          {isLoggedIn ? (
            <div className="w-full">
              {/* My Collection Section */}
              <h2 className="text-2xl text-center font-bold mb-4">My Collection</h2>
              <section className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockRecipes.map((recipe, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden shadow"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold">{recipe.title}</h3>
                        <p className="text-sm text-gray-600">
                          {recipe.description}
                        </p>
                        <button className="group relative w-full flex justify-center mt-2 text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 px-12 py-2 rounded-md">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Upload Recipe Section */}
              <section className="flex justify-center items-center my-8">
                <div className="bg-dark p-6 rounded shadow-md max-w-md w-full">
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Upload Your Recipe
                  </h2>
                  <form className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Recipe Title"
                      className="p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Add Ingredients"
                      className="p-2 border rounded"
                    />
                    <textarea
                      placeholder="Add Steps"
                      className="p-2 border rounded resize-none"
                    ></textarea>
                    <button className="group relative w-full flex justify-center mt-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Submit Recipe
                    </button>
                  </form>
                </div>
              </section>

              </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  {/* Recipe Section for Logged-out Users */}
                  <h2 className="text-2xl font-bold mb-4 text-center">Our Recipes</h2>
                  <section className="flex justify-center w-full">
                    <div className="w-full max-w-screen-xl p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {mockRecipes.map((recipe, index) => (
                          <div
                            key={index}
                            className="rounded-lg overflow-hidden shadow"
                          >
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h3 className="text-lg font-bold">{recipe.title}</h3>
                              <p className="text-sm text-gray-600">
                                {recipe.description}
                              </p>
                              <button className="group relative w-full flex justify-center mt-2 text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 px-12 py-2 rounded-md">
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}

        </div>
      </div>

      {/* Toggle Login/Logout Button */}
      <div className="text-center my-4">
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="bg-gray-800 text-white px-6 py-2 rounded"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}

// Mock Recipe Data
const mockRecipes = [
  {
    title: "Pasta Delight",
    description: "A classic pasta recipe with a rich tomato sauce.",
    image: "/images/col1.png",
  },
  {
    title: "Chocolate Heaven",
    description: "Decadent chocolate cookies with a chewy texture.",
    image: "/images/col2.png",
  },
  {
    title: "Grilled Chicken",
    description: "Juicy grilled chicken served with fresh veggies.",
    image: "/images/col3.png",
  },
  {
    title: "Smoothie Bowl",
    description: "A nutritious blend of fruits topped with seeds and nuts.",
    image: "/images/col4.png",
  },
  {
    title: "Sushi Platter",
    description: "An Assorted sushi rolls served with soy sauce and wasabi.",
    image: "/images/col5.png",
  },
  {
    title: "Mushroom Risotto",
    description: "Rich and creamy risotto infused with earthy mushrooms.",
    image: "/images/col6.png",
  },
  {
    title: "Pasta Delight",
    description: "A classic pasta recipe with a rich tomato sauce.",
    image: "/images/col1.png",
  },
  {
    title: "Chocolate Heaven",
    description: "Decadent chocolate cookies with a chewy texture.",
    image: "/images/col2.png",
  },
  {
    title: "Grilled Chicken",
    description: "Juicy grilled chicken served with fresh veggies.",
    image: "/images/col3.png",
  },
  {
    title: "Smoothie Bowl",
    description: "A nutritious blend of fruits topped with seeds and nuts.",
    image: "/images/col4.png",
  },
  {
    title: "Sushi Platter",
    description: "An Assorted sushi rolls served with soy sauce and wasabi.",
    image: "/images/col5.png",
  },
  {
    title: "Mushroom Risotto",
    description: "Rich and creamy risotto infused with earthy mushrooms.",
    image: "/images/col6.png",
  },
];
