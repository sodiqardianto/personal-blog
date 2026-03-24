import "server-only";

import axios from "axios";
import { headers } from "next/headers";
import { authApi } from "@/features/auth/lib/auth-api";
import { AUTH_API_BASE_URL } from "@/features/auth/lib/auth-config";
import type { AdminNoteRow, AdminNoteStatus, AdminNotesOverview } from "@/features/admin/types";

type AdminPostApiItem = {
  id: string;
  title: string;
  slug: string;
  status: AdminNoteStatus;
  updated_at: string;
};

type AdminPostListResponse = {
  data: AdminPostApiItem[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

type ListAdminPostsOptions = {
  page?: number;
  perPage?: number;
  status?: AdminNoteStatus;
  search?: string;
};

function formatAdminDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function toNoteRow(post: AdminPostApiItem): AdminNoteRow {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    status: post.status,
    updatedAt: formatAdminDate(post.updated_at),
  };
}

async function getRequestHeaders() {
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie");

  return cookieHeader
    ? {
        cookie: cookieHeader,
      }
    : undefined;
}

async function fetchAdminPosts(options: ListAdminPostsOptions = {}) {
  const requestHeaders = await getRequestHeaders();

  try {
    const response = await authApi.get<AdminPostListResponse>("/api/admin/posts", {
      headers: requestHeaders,
      params: {
        page: options.page,
        per_page: options.perPage,
        status: options.status,
        search: options.search,
      },
    });

    if (response.status < 200 || response.status >= 300) {
      return null;
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to read admin posts from", AUTH_API_BASE_URL, error.message);
    }

    return null;
  }
}

export async function listAdminNotes(options: ListAdminPostsOptions = {}) {
  const result = await fetchAdminPosts(options);

  if (!result) {
    return [];
  }

  return result.data.map(toNoteRow);
}

export async function getAdminNotesOverview(): Promise<AdminNotesOverview> {
  const [published, draft, recent] = await Promise.all([
    fetchAdminPosts({ status: "published", perPage: 1 }),
    fetchAdminPosts({ status: "draft", perPage: 1 }),
    fetchAdminPosts({ perPage: 3 }),
  ]);

  return {
    publishedCount: published?.meta.total ?? 0,
    draftCount: draft?.meta.total ?? 0,
    recentNotes: recent ? recent.data.map(toNoteRow) : [],
  };
}
