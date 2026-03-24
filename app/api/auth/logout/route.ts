import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";
import { authApi } from "@/features/auth/lib/auth-api";

export async function POST(request: NextRequest) {
  try {
    const backendResponse = await authApi.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
      },
    );

    const redirectResponse = NextResponse.redirect(new URL("/login", request.url), {
      status: 303,
    });
    const setCookieHeader = backendResponse.headers["set-cookie"];

    if (setCookieHeader) {
      const cookieValues = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      for (const cookieValue of cookieValues) {
        redirectResponse.headers.append("set-cookie", cookieValue);
      }
    }

    return redirectResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.message || "Logout request failed",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Logout request failed",
      },
      {
        status: 502,
      },
    );
  }
}
