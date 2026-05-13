import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const DEFAULT_LOCAL_API_ORIGIN = "http[://]localhost:5000";

const normalizeApiBaseUrl = (value?: string) => {
  const trimmedValue = value?.trim();

  if (trimmedValue) {
    return trimmedValue.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    return "";
  }

  return DEFAULT_LOCAL_API_ORIGIN;
};

// API Configuration
export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

// Function to make a GET request to the backend
export const getBackendStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch {
    return null;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
