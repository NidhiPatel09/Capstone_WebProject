"use client";
import { saveContactAction } from "@/actions/userContact";
import userSession from "@/actions/userSession";
import React, { useState, useEffect } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user session and populate form fields
    async function fetchUserSession() {
      try {
        const session = await userSession();
        if (session) {
          setFormData((prevData) => ({
            ...prevData,
            name: session.displayName || "",
            email: session.email || "",
          }));
        }
      } catch (err) {
        console.error("Error fetching user session:", err);
      }
    }
    fetchUserSession();
  }, []);

  const validateForm = () => {
    const { name, email, number, message } = formData;
    console.log(email);
    
    if (!name || !email || !number || !message) {
      return "All fields are required.";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    const numberRegex = /^\+?[1-9]\d{9,14}$/;
    if (!numberRegex.test(number)) {
      return "Please enter a valid number.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    console.log(validationError);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await saveContactAction(formData);
      setSuccess("Your message has been successfully sent!");
      setFormData((prevData) => ({
        ...prevData,
        number: "",
        message: "",
      }));
    } catch (err: any) {
      setError(err.message || "Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-2 text-sm text-gray-600">Keep in touch with us, we will get back to you soon!</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
          <div>
            <label htmlFor="name" className="sr-only">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your full name..."
            />
          </div>
          <div>
            <label htmlFor="number" className="sr-only">Contact Number</label>
            <input
              id="number"
              name="number"
              type="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="+1 000 0000 000"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Example.email@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
