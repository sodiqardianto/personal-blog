import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";
import { authApi } from "@/features/auth/lib/auth-api";

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.url));
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as { credential?: string };
    const backendResponse = await authApi.post("/api/auth/google", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = NextResponse.json(backendResponse.data, {
      status: backendResponse.status,
    });
    const setCookieHeader = backendResponse.headers["set-cookie"];

    if (setCookieHeader) {
      const cookieValues = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      for (const cookieValue of cookieValues) {
        response.headers.append("set-cookie", cookieValue);
      }
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.message || "Google login request failed",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Google login request failed",
      },
      {
        status: 502,
      },
    );
  }
}
