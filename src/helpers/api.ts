"use server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/enums";

export const apiClient = async (url: string, options: RequestInit = {}) => {
  const token = (await cookies()).get("jwtToken")?.value;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    ...options.headers, // Merge with existing headers (if any)
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); // Convert response to JSON
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Re-throw for further handling
  }
};
