export default function JoinUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
          <img
            className="rounded-lg shadow-lg w-full"
            src="https://res.cloudinary.com/dyof62lts/image/upload/v1728660970/home-img2_wz5svh.png"
            alt="Group of people cooking together"
          />
        </div>

        <div className="lg:w-1/2 w-full lg:pl-12 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-black mb-4">
            Join <span className="text-green-600">RecipeFinder</span>
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Explore, share, and discover new recipes with like-minded food
            enthusiasts.
          </p>
          <button className="bg-green-600 text-white font-semibold px-12 py-2 rounded-md hover:bg-green-500 transition duration-300">
            JOIN US
          </button>
        </div>
      </div>
    </section>
  );
}
