import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-gray-900">
          Meet Our Team
        </h2>
      </div>

      <div className="flex justify-center space-x-8 mb-12">
        <div className="text-center">
          <img
            src="https://res.cloudinary.com/dyof62lts/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728660970/home-img2_wz5svh.png"
            alt="Nidhi"
            className="w-36 h-36 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">Nidhi</h3>
        </div>
        <div className="text-center">
          <img
            src="https://res.cloudinary.com/dyof62lts/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728660970/home-img2_wz5svh.png"
            alt="Karan"
            className="w-36 h-36 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">Karan</h3>
        </div>
        <div className="text-center">
          <img
            src="https://res.cloudinary.com/dyof62lts/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728660970/home-img2_wz5svh.png"
            alt="Sparsh"
            className="w-36 h-36 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">Sparsh</h3>
        </div>
      </div>

      <div className="max-w-4xl text-center">
        <p className="text-lg text-gray-700">
          Hello, This is our last semester capstone project. We chose to build
          a Recipe Finder Website to solve a real-world problem that many of us
          face every day: "What to cook?". Our project aims to provide a
          solution by helping users find recipes based on the ingredients they
          have available. We hope this website will simplify the process of
          meal preparation and reduce food waste by suggesting creative ways to
          use ingredients.
        </p>
      </div>
    </div>
  );
}
