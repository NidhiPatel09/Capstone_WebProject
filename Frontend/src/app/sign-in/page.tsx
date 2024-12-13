"use client";
import { useEffect, useState } from "react";
import { handleGoogleLogin, handleFacebookLogin } from "@/actions/handleLogin";
import loginUser from "@/actions/loginUser";
import User from "@/types/User";
import userSession from "@/actions/userSession";
import { useRouter } from "next/navigation";
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<string>("");
  const [user, setUser] = useState<User | null>();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await loginUser(formData.email, formData.password);
    if (result) {
      const user = await userSession();
      console.log(user);
      
      if (user && Object.keys(user).length > 0) {
        if (user?.role === "admin") {
          router.push("/admin/manage-requests");
        } else {
          router.push("/");
        }
      }
    }

    if (result?.message) {
      setErrors(result.message);
    } else {
      setErrors("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className="w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url("/images/signup.png")` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold mb-2">Welcome</h1>
          <p className="text-2xl">Discover Delicious Recipes</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Login
          </h2>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full mb-4 p-3 text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span className="font-medium">Sign in with Google</span>
          </button>

          <div className="flex items-center mb-4">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>

          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center w-full mb-4 p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.675 0H1.325C.594 0 0 .594 0 1.325v22.351C0 23.406.594 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.917.001c-1.504 0-1.794.715-1.794 1.76v2.309h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.594 1.324-1.324V1.325C24 .594 23.406 0 22.675 0z" />
            </svg>
            Sign up with Facebook
          </button>
          {errors === "Login successful." ? (
            <h4 className="text-center mb-3 text-green-600">{errors}</h4>
          ) : (
            <h4 className="text-center mb-3 text-red-600">{errors}</h4>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Example.email@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full text-black px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter at least 8 characters"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full text-black px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button className="w-full py-4 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
