import "server-only";

import axios from "axios";
import { headers } from "next/headers";
import { authApi } from "@/features/auth/lib/auth-api";
import { AUTH_API_BASE_URL } from "@/features/auth/lib/auth-config";
import type { AuthSessionState, AuthUser } from "@/features/auth/types";

type SessionResponse = {
  data?: {
    user: AuthUser | null;
  };
  message?: string;
};

export async function getAuthSessionState(): Promise<AuthSessionState> {
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie");

  try {
    const response = await authApi.get<SessionResponse>("/api/auth/me", {
      headers: cookieHeader
        ? {
            cookie: cookieHeader,
          }
        : undefined,
    });

    if (response.status >= 200 && response.status < 300) {
      const user = response.data.data?.user ?? null;

      if (!user) {
        return {
          status: "unauthenticated",
          user: null,
          message: response.data.message,
        };
      }

      return {
        status: "authenticated",
        user,
      };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        status: "unauthenticated",
        user: null,
        message: response.data.message,
      };
    }

    return {
      status: "unavailable",
      user: null,
      message: response.data.message ?? "Authentication service is unavailable.",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to read auth session from",
        AUTH_API_BASE_URL,
        error.message,
      );
    }

    return {
      status: "unavailable",
      user: null,
      message: "Authentication service is unavailable.",
    };
  }
}
