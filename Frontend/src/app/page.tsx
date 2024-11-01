import JoinUs from "@/Components/JoinUs";
import Recipes from "@/Components/Recipes";
import UserStories from "@/Components/UserStories";

export default function Home() {
  return (
    <>
      <header
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('https://res.cloudinary.com/dyof62lts/image/upload/v1728660974/Recipe-home_t2grng.jpg` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to Recipe Finder
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">For foodies</p>
          <button className="bg-green-600 text-white px-10 py-2 rounded-md hover:bg-green-500 transition duration-300">
            GET STARTED
          </button>
        </div>
      </header>
      <Recipes />
      <UserStories />
      <JoinUs />
    </>
  );
}
