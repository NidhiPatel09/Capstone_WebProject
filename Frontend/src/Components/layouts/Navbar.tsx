"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import userSession from "@/actions/userSession";
import User from "@/types/User";
import { parseCookies, destroyCookie } from "nookies";
type Route = {
  name: string;
  href: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [isReading, setIsReading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathName = usePathname();
  const router = useRouter();

  const routes: Route[] = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about-us" },
    { name: "RECIPES", href: "/recipe" },
    { name: "CONTACT US", href: "/contact-us" },
    { name: "BLOG", href: "/blog" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    const cookies = parseCookies();

    if (cookies["token"]) {
      destroyCookie(null, "token", { path: "/" });
      router.push("/login");
    } else {
      router.push("http://localhost:4000/auth/logout");
    }
  };

  const handleFontSizeChange = (size: "small" | "medium" | "large") => {
    setFontSize(size);
    document.documentElement.style.fontSize =
      size === "small" ? "14px" : size === "medium" ? "16px" : "18px";
  };

  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const text = document.body.innerText;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      window.speechSynthesis.speak(utterance);
      setIsReading(true);

      utterance.onend = () => {
        setIsReading(false);
      };
    }
  };

  useEffect(() => {
    async function fetchUserSession() {
      const user = await userSession();
      console.log(user, "userrrrrrrrrrr");

      setUser(user || null);
    }

    fetchUserSession();
  }, []);

  return (
    <>
      <nav className="bg-black py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              layout="intrinsic"
              height={0}
              width={100}
              src="https://res.cloudinary.com/dyof62lts/image/upload/v1728660974/RecipeLogo_dark_tfjrsz.png"
              alt="Recipe Finder Logo"
              className="h-12"
            />
          </Link>

          {/* Desktop Navbar */}
          <ul className="hidden md:flex space-x-8 text-white font-bold text-lg">
            {routes.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`${
                    pathName === href
                      ? "text-green-500"
                      : "hover:text-green-500 transition-colors"
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Sign-Up/Login Section */}
          <div className="hidden md:flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-4 m-4">
              {!user ? (
                <>
                  <Link
                    href="/sign-up"
                    className="bg-white text-black px-6 py-2 rounded-md font-bold hover:bg-green-500 hover:text-white transition-colors"
                  >
                    SIGN UP
                  </Link>
                  <Link
                    href="/sign-in"
                    className="bg-green-600 text-white px-6 py-2 rounded-md font-bold hover:bg-green-500 transition-colors"
                  >
                    LOGIN
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">
                    Welcome, {user.displayName || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md font-bold hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>{" "}
                </div>
              )}
            </div>
            <div
              className="flex space-x-2"
              style={{ margin: "5px 15px 5px 0" }}
            >
              <button
                onClick={() => handleFontSizeChange("small")}
                className={`px-3 py-2 rounded-lg font-semibold ${
                  fontSize === "small"
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-black hover:bg-green-100"
                }`}
              >
                A-
              </button>
              <button
                onClick={() => handleFontSizeChange("medium")}
                className={`px-3 py-2 rounded-lg font-semibold ${
                  fontSize === "medium"
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-black hover:bg-green-100"
                }`}
              >
                A
              </button>
              <button
                onClick={() => handleFontSizeChange("large")}
                className={`px-3 py-2 rounded-lg font-semibold ${
                  fontSize === "large"
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-black hover:bg-green-100"
                }`}
              >
                A+
              </button>
              <button
                onClick={handleReadAloud}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 ${
                  isReading
                    ? "bg-red-500 text-white shadow-lg hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <span>{isReading ? "Stop" : "Read Aloud"}</span>
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className="block md:hidden mx-3 text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`fixed inset-y-0 left-0 bg-black text-white w-64 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="flex justify-between items-center p-4">
            <Image
              layout="intrinsic"
              height={0}
              width={100}
              src="https://res.cloudinary.com/dyof62lts/image/upload/v1728660974/RecipeLogo_dark_tfjrsz.png"
              alt="Recipe Finder Logo"
              className="h-12"
            />
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="space-y-4 mt-8 px-4">
            {routes.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`block ${
                    pathName === href
                      ? "text-green-500"
                      : "hover:text-green-500 transition-colors"
                  }`}
                  onClick={toggleSidebar}
                >
                  {name}
                </Link>
              </li>
            ))}
            <div className="flex flex-col space-y-2 mt-6">
              <button
                onClick={() => handleFontSizeChange("small")}
                className={`px-3 py-2 rounded-lg font-semibold ${
                  fontSize === "small"
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-black hover:bg-green-100"
                }`}
              >
                A-
              </button>
              <button
                onClick={() => handleFontSizeChange("medium")}
                className={`px-3 py-2 rounded-lg font-semibold ${
                  fontSize === "medium"
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-black hover:bg-green-100"
                }`}
              >
                A
              </button>
              <button
                onClick={() => handleFontSizeChange("large")}
                className={`px-3 py-2 rounded-lg font-semibold ${
                  fontSize === "large"
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-black hover:bg-green-100"
                }`}
              >
                A+
              </button>
              <button
                onClick={handleReadAloud}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  isReading
                    ? "bg-red-500 text-white shadow-lg hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isReading ? "Stop" : "Read Aloud"}
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}
