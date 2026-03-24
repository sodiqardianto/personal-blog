import type { NextRequest } from "next/server";
import axios from "axios";
import { authApi } from "@/features/auth/lib/auth-api";

export async function GET(request: NextRequest) {
  try {
    const backendResponse = await authApi.get("/api/auth/me", {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });

    return Response.json(backendResponse.data, {
      status: backendResponse.status,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Response.json(
        {
          message: error.message || "Session request failed",
        },
        {
          status: 502,
        },
      );
    }

    return Response.json(
      {
        message: "Session request failed",
      },
      {
        status: 502,
      },
    );
  }
}
