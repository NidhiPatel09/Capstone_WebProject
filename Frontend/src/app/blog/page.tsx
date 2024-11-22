"use client";

import React, { useState, useEffect } from "react";
import fetchBlogs from "@/actions/fetchBlogs";

interface Blog {
  title: string;
  servings: number;
  categories?: number[];
  description: string;
  image: string;
  ingredients: string;
  steps: string;
}

const BlogCard: React.FC<{
  blog: Blog;
  onViewClick: () => void;
}> = ({ blog, onViewClick }) => (
  <div className="rounded-lg overflow-hidden shadow">
    <img
      src={
        blog.image ||
        "https://res.cloudinary.com/dyof62lts/image/upload/v1728660973/recipe8_jfh7j1.png"
      }
      alt={blog.title}
      className="rounded w-full h-48 object-cover"
    />
    <div className="py-4 px-1">
      <h3 className="text-lg mt-1 font-bold">{blog.title}</h3>
      <p className="text-sm mb-4 text-gray-400">{blog.description}</p>
      <button
        onClick={onViewClick}
        className="group relative w-full flex justify-center mt-2 text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 px-12 py-2 rounded-md"
      >
        View
      </button>
    </div>
  </div>
);

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogData = await fetchBlogs();
        setBlogs(blogData);
        if (blogData.length > 0) {
          setSelectedBlog(blogData[0]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Slice the blogs array to get only the blogs for the current page
  const displayedBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <div>
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: "url('/images/profile-back-header.jpg')",
          objectFit: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold">Explore Recipe Blog!</h1>
          <p className="mt-2 text-lg">To be able to save recipes, sign up!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Section */}
        {selectedBlog && (
          <aside className="bg-dark-100 p-6 mt-10 rounded-lg shadow mb-8">
            <div className="rounded-lg overflow-hidden shadow">
              <img
                src={
                  selectedBlog.image ||
                  "https://res.cloudinary.com/dyof62lts/image/upload/v1728660973/recipe8_jfh7j1.png"
                }
                alt={selectedBlog.title}
                className="rounded w-full h-48 object-cover"
              />
              <div className="p-2 mt-3">
                <h3 className="text-xl font-bold mb-4">{selectedBlog.title}</h3>
                <p className="text-sm text-gray-400">
                  {selectedBlog.description}
                </p>
              </div>
              <div className="p-2">
                <h2 className="text-m mt-2 mb-2 font-bold">Servings</h2>
                <p className="text-sm text-gray-400">{selectedBlog.servings}</p>
                <h2 className="text-m mt-2 mb-2 font-bold">Categories</h2>
                <p className="text-sm text-gray-400">
                  {selectedBlog.categories?.join(", ")}
                </p>
                <h2 className="text-m mt-2 mb-2 font-bold">Ingredients</h2>
                <ul>
                  {selectedBlog.ingredients
                    .split(", ")
                    .map((ingredient, index) => (
                      <li key={index} className="text-sm text-gray-400">
                        {ingredient}
                      </li>
                    ))}
                </ul>
                <h2 className="text-m mt-2 mb-2 font-bold">Steps</h2>
                <ul>
                  {selectedBlog.steps.split(". ").map((step, index) => (
                    <li key={index} className="text-sm mb-2 text-gray-200">
                      {step}
                    </li>
                  ))}
                </ul>
                <button className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-green-600 hover:text-white">
                  <a href="/sign-up">Add to Collection</a>
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Main Blog Section */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-8 text-center pr-6">
            Our Blogs
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {displayedBlogs.map((blog, index) => (
              <BlogCard
                key={index}
                blog={blog}
                onViewClick={() => setSelectedBlog(blog)}
              />
            ))}
          </section>

          {/* Pagination for main content */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md text-green-600 border-green-600 disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-green-600 text-white"
                    : "text-green-600 border-green-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md text-green-600 border-green-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Upload Recipe Section */}
      <div>
        <section className="flex justify-center items-center my-8">
          <div className="bg-dark p-6 rounded shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Upload Your Blog
            </h2>
            <form className="flex flex-col gap-4">
              {}
              <div className="relative bg-green">
                <input
                  type="file"
                  accept=".pdf, .docx, .png, .jpg, .jpeg"
                ></input>
              </div>
              {}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Title"
                  className="p-2 pl-10 border rounded w-full text-black"
                />
                <i className="fas fa-pencil-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>{" "}
                {}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Add Description"
                  className="p-2 pl-10 border rounded w-full text-black"
                />
                <i className="fas fa-pen absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>{" "}
                {}
              </div>

              <div className="relative">
                <textarea
                  placeholder="Add More Details"
                  className="p-2 pl-10 border rounded resize-none w-full text-black"
                ></textarea>
                <i className="fas fa-align-left absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>{" "}
                {}
              </div>

              <button className="group relative w-full flex justify-center mt-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
