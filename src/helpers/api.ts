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

  console.log("headers", { token, url });

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    const jsonRes = await response.json(); // Convert response to JSON
    if (!response.ok) {
      console.error("Error Message:", jsonRes["message"]);
      throw new Error(`HTTP ${response.status}: ${jsonRes["message"]}`);
    }

    return jsonRes; // Convert response to JSON
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Re-throw for further handling
  }
};
