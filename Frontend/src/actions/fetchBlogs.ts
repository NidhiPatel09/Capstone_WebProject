"use server";

import axios from "axios";

export default async function fetchBlogs() {
    const backendPort = process.env.BACKEND_PORT || 5000;
    const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
    // fetching blogs from the blogs API endpoint
    const response = await axios.get(`${backendBaseUrl}/blog`);
    const { data, status } = response;
    console.log(data)
    if (status === 200) {
        return data;
    } else {
        throw new Error(`Failed to fetch blogs: ${status}`);
    }
}
