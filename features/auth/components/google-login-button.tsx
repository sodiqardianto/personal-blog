"use client";

import axios from "axios";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            context?: "signin" | "signup" | "use";
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              shape?: "pill" | "rectangular" | "circle" | "square";
              text?:
                | "signin_with"
                | "signup_with"
                | "continue_with"
                | "signin";
              logo_alignment?: "left" | "center";
              width?: number;
            },
          ) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export function GoogleLoginButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!scriptReady || !buttonRef.current || !window.google || !GOOGLE_CLIENT_ID) {
      return;
    }

    buttonRef.current.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async ({ credential }) => {
        if (!credential) {
          setErrorMessage("Google login could not be completed.");
          return;
        }

        setSubmitting(true);
        setErrorMessage(null);

        try {
          const response = await axios.post("/api/auth/google", { credential }, {
            headers: {
              "Content-Type": "application/json",
            },
            validateStatus: () => true,
          });

          if (response.status < 200 || response.status >= 300) {
            const payload = response.data as { message?: string } | null;
            throw new Error(payload?.message || "Google login failed.");
          }

          router.replace("/dashboard");
          router.refresh();
        } catch (error) {
          setErrorMessage(
            error instanceof Error ? error.message : "Google login failed.",
          );
        } finally {
          setSubmitting(false);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
      context: "signin",
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "filled_blue",
      size: "large",
      shape: "pill",
      text: "continue_with",
      logo_alignment: "left",
      width: Math.min(buttonRef.current.clientWidth || 320, 360),
    });
  }, [router, scriptReady]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="rounded-[20px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200">
        Google login is not configured yet. Add
        {" "}
        <code>NEXT_PUBLIC_GOOGLE_CLIENT_ID</code>
        {" "}
        to the frontend environment.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      <div
        ref={buttonRef}
        className="flex min-h-11 w-full items-center justify-center"
      />

      {submitting ? (
        <p className="text-center text-[0.78rem] text-ink/45 dark:text-slate-500">
          Signing you in...
        </p>
      ) : null}

      {errorMessage ? (
        <p className="text-center text-[0.78rem] text-rose-600 dark:text-rose-300">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
