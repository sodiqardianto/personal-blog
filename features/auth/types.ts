export type AuthUser = {
  id: number;
  email: string;
  name: string;
  avatar_url: string | null;
  role: string;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AuthSessionState =
  | {
      status: "authenticated";
      user: AuthUser;
      message?: string;
    }
  | {
      status: "unauthenticated" | "unavailable";
      user: null;
      message?: string;
    };
