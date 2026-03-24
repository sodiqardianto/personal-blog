import axios from "axios";
import { AUTH_API_BASE_URL } from "@/features/auth/lib/auth-config";

export const authApi = axios.create({
  baseURL: AUTH_API_BASE_URL,
  withCredentials: true,
  validateStatus: () => true,
});
