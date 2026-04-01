// API Configuration
export const API_BASE_URL = 'http://localhost:5000'; // Assuming backend runs on port 5000

// Function to make a GET request to the backend
export const getBackendStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text(); // Expecting "API is running..."
  } catch (error) {
    console.error("Error connecting to backend:", error);
    return null;
  }
};
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
