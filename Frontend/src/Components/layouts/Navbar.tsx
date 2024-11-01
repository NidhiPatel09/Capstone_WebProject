"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // state for mobile menubar
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const routes = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about-us" },
    { name: "RECIPES", href: "/recipe" },
    { name: "CONTACT US", href: "/contact-us" },
    { name: "BLOG", href: "/blog" },
    { name: "PROFILE", href: "/profile" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

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

          <ul className="hidden md:flex space-x-8 text-white font-bold text-lg">
            {routes.map((link) => {
              // showing active links based on current path
              const { name, href } = link;
              return (
                <li key={name}>
                  <Link
                    href={href}
                    className={
                      pathName === href
                        ? "text-green-500 hover:text-green-500 transition-colors"
                        : "hover:text-green-500 transition-colors"
                    }
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex space-x-4 mr-10">
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
          </div>

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
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-90 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-white">
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
        <ul className="flex flex-col items-center space-y-6 text-white font-bold text-xl mt-6">
          {routes.map((link) => {
            const { name, href } = link;
            return (
              <li key={name}>
                <Link
                  href={href}
                  className={pathName === href ? "text-green-500" : ""}
                  onClick={toggleSidebar}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col items-center space-y-4 mt-6">
          <Link
            href="/sign-up"
            className="bg-white text-black px-6 py-2 rounded-md font-bold hover:bg-green-500 hover:text-white transition-colors"
            onClick={toggleSidebar}
          >
            SIGN UP
          </Link>
          <Link
            href="/sign-in"
            className="bg-green-600 text-white px-6 py-2 rounded-md font-bold hover:bg-green-500 transition-colors"
            onClick={toggleSidebar}
          >
            LOGIN
          </Link>
        </div>
      </div>
    </>
  );
}
