"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CopyIcon,
  EyeIcon,
  HeartIcon,
  LinkedInIcon,
  ShareIcon,
  TelegramIcon,
  WhatsappIcon,
} from "@/shared/ui";
import { cn } from "@/lib/utils";

type PostEngagementProps = {
  slug: string;
  initialViews: number;
  initialShares: number;
  initialLikes: number;
};

type EngagementEntry = {
  liked: boolean;
  viewed: boolean;
  shared: boolean;
  views: number;
  shares: number;
  likes: number;
};

type PostEngagementStore = Record<string, Partial<EngagementEntry>>;

const POST_ENGAGEMENT_STORAGE_KEY = "portfolio-post-engagement";

function defaultEngagementEntry(): EngagementEntry {
  return {
    liked: false,
    viewed: false,
    shared: false,
    views: 0,
    shares: 0,
    likes: 0,
  };
}

function normaliseEngagementEntry(
  value?: Partial<EngagementEntry>,
): EngagementEntry {
  return {
    ...defaultEngagementEntry(),
    ...value,
    views: typeof value?.views === "number" ? value.views : 0,
    shares: typeof value?.shares === "number" ? value.shares : 0,
    likes: typeof value?.likes === "number" ? value.likes : 0,
  };
}

function readEngagementStore(): PostEngagementStore {
  if (typeof window === "undefined") {
    return {};
  }

  const rawValue = window.localStorage.getItem(POST_ENGAGEMENT_STORAGE_KEY);

  if (!rawValue) {
    return {};
  }

  try {
    const parsedValue = JSON.parse(rawValue) as PostEngagementStore;
    return parsedValue ?? {};
  } catch {
    return {};
  }
}

function writeEngagementStore(store: PostEngagementStore) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    POST_ENGAGEMENT_STORAGE_KEY,
    JSON.stringify(store),
  );
}

export function PostEngagement({
  slug,
  initialViews,
  initialShares,
  initialLikes,
}: PostEngagementProps) {
  const [entry, setEntry] = useState<EngagementEntry>(() =>
    normaliseEngagementEntry({
      views: initialViews,
      shares: initialShares,
      likes: initialLikes,
    }),
  );
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [shareAnimating, setShareAnimating] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copyToastVisible, setCopyToastVisible] = useState(false);
  const [likeAnimationKey, setLikeAnimationKey] = useState(0);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const updateEntry = useCallback(
    (updater: (currentState: EngagementEntry) => EngagementEntry) => {
      const store = readEngagementStore();
      const currentState = normaliseEngagementEntry({
        views: initialViews,
        shares: initialShares,
        likes: initialLikes,
        ...store[slug],
      });
      const nextState = updater(currentState);

      writeEngagementStore({
        ...store,
        [slug]: nextState,
      });
      setEntry(nextState);
    },
    [initialLikes, initialShares, initialViews, slug],
  );

  useEffect(() => {
    const currentEntry = normaliseEngagementEntry({
      views: initialViews,
      shares: initialShares,
      likes: initialLikes,
      ...readEngagementStore()[slug],
    });

    window.requestAnimationFrame(() => {
      setEntry(currentEntry);
    });

    let frameId: number | undefined;

    if (!currentEntry.viewed) {
      frameId = window.requestAnimationFrame(() => {
        updateEntry((currentState) => ({
          ...currentState,
          viewed: true,
          views: currentState.views + 1,
        }));
      });
    }

    return () => {
      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [initialLikes, initialShares, initialViews, slug, updateEntry]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target as Node)
      ) {
        setShareMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShareMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLike = () => {
    if (entry.liked) {
      return;
    }

    setLikeAnimating(false);
    requestAnimationFrame(() => {
      setLikeAnimationKey((currentValue) => currentValue + 1);
      setLikeAnimating(true);
    });

    window.setTimeout(() => {
      setLikeAnimating(false);
    }, 420);

    updateEntry((currentState) => ({
      ...currentState,
      liked: true,
      likes: currentState.likes + 1,
    }));
  };

  const playShareAnimation = () => {
    setShareAnimating(false);
    requestAnimationFrame(() => setShareAnimating(true));

    window.setTimeout(() => {
      setShareAnimating(false);
    }, 460);
  };

  const showCopyToast = () => {
    setCopyToastVisible(true);

    window.setTimeout(() => {
      setCopyToastVisible(false);
    }, 1800);
  };

  const trackShare = () => {
    if (entry.shared) {
      return;
    }

    playShareAnimation();
    updateEntry((currentState) => ({
      ...currentState,
      shared: true,
      shares: currentState.shares + 1,
    }));
  };

  const handleShareAction = async (
    action: "copy" | "whatsapp" | "telegram" | "linkedin",
  ) => {
    const currentUrl = window.location.href;
    const currentTitle = document.title;
    const shareText = `${currentTitle} ${currentUrl}`;

    try {
      if (action === "copy") {
        await navigator.clipboard.writeText(currentUrl);
        trackShare();
        setShareMenuOpen(false);
        showCopyToast();
        return;
      }

      const shareUrl =
        action === "whatsapp"
          ? `https://wa.me/?text=${encodeURIComponent(shareText)}`
          : action === "telegram"
            ? `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(currentTitle)}`
            : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

      const openedWindow = window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer",
      );

      if (openedWindow) {
        trackShare();
      }

      setShareMenuOpen(false);
    } catch {
      // Ignore share cancellation and clipboard issues for now.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="inline-flex items-center gap-2 rounded-full border border-blue/10 bg-white px-3.5 py-2 text-[0.88rem] font-medium text-ink/60 dark:border-blue-dark/12 dark:bg-navy-700 dark:text-slate-300">
        <EyeIcon className="h-4 w-4 stroke-2" />
        {entry.views} views
      </span>

      <div ref={shareMenuRef} className="relative">
        {copyToastVisible ? (
          <span className="pointer-events-none absolute -top-11 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-blue/12 bg-white px-3 py-1.5 text-[0.76rem] font-medium text-blue shadow-[0_10px_28px_rgba(47,84,235,0.14)] animate-fade-in dark:border-blue-dark/15 dark:bg-navy-800 dark:text-blue-dark">
            URL copied
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => setShareMenuOpen((currentValue) => !currentValue)}
          aria-expanded={shareMenuOpen}
          aria-haspopup="menu"
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue/10 bg-white px-3.5 py-2 text-[0.88rem] font-medium text-ink/60 transition-colors hover:border-blue/20 hover:text-blue dark:border-blue-dark/12 dark:bg-navy-700 dark:text-slate-300 dark:hover:border-blue-dark/25 dark:hover:text-blue-dark",
            shareMenuOpen &&
              "border-blue/20 text-blue dark:border-blue-dark/25 dark:text-blue-dark",
          )}
        >
          <span
            className={cn(
              "inline-flex",
              shareAnimating && "animate-engagement-share",
            )}
          >
            <ShareIcon className="h-4 w-4 stroke-2" />
          </span>
          {entry.shares} shares
        </button>

        {shareMenuOpen ? (
          <div
            role="menu"
            aria-label="Share article"
            className="absolute left-0 top-[calc(100%+0.65rem)] z-20 w-[min(18rem,calc(100vw-2.5rem))] animate-fade-in rounded-[1.1rem] border border-blue/10 bg-white p-2.5 shadow-[0_18px_48px_rgba(15,22,36,0.12)] dark:border-blue-dark/12 dark:bg-navy-800 dark:shadow-[0_18px_48px_rgba(0,0,0,0.34)]"
          >
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                role="menuitem"
                onClick={() => void handleShareAction("copy")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-[0.9rem] border border-blue/8 px-3 py-2.5 text-left text-sm text-ink/72 transition-colors hover:border-blue/20 hover:text-blue dark:border-blue-dark/12 dark:text-slate-300 dark:hover:border-blue-dark/25 dark:hover:text-blue-dark"
              >
                <CopyIcon className="h-4 w-4 stroke-2" />
                Copy URL
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => void handleShareAction("whatsapp")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-[0.9rem] border border-blue/8 px-3 py-2.5 text-left text-sm text-ink/72 transition-colors hover:border-blue/20 hover:text-blue dark:border-blue-dark/12 dark:text-slate-300 dark:hover:border-blue-dark/25 dark:hover:text-blue-dark"
              >
                <WhatsappIcon className="h-4 w-4 stroke-2" />
                WhatsApp
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => void handleShareAction("telegram")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-[0.9rem] border border-blue/8 px-3 py-2.5 text-left text-sm text-ink/72 transition-colors hover:border-blue/20 hover:text-blue dark:border-blue-dark/12 dark:text-slate-300 dark:hover:border-blue-dark/25 dark:hover:text-blue-dark"
              >
                <TelegramIcon className="h-4 w-4 stroke-2" />
                Telegram
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => void handleShareAction("linkedin")}
                className="inline-flex cursor-pointer items-center gap-2 rounded-[0.9rem] border border-blue/8 px-3 py-2.5 text-left text-sm text-ink/72 transition-colors hover:border-blue/20 hover:text-blue dark:border-blue-dark/12 dark:text-slate-300 dark:hover:border-blue-dark/25 dark:hover:text-blue-dark"
              >
                <LinkedInIcon className="h-4 w-4 stroke-2" />
                LinkedIn
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={handleLike}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue/10 bg-white px-3.5 py-2 text-[0.88rem] font-medium text-ink/60 transition-all hover:border-blue/20 hover:text-blue dark:border-blue-dark/12 dark:bg-navy-700 dark:text-slate-300 dark:hover:border-blue-dark/25 dark:hover:text-blue-dark",
          likeAnimating && "animate-engagement-like-btn",
          entry.liked &&
            "border-rose-200 text-rose-600 dark:border-rose-400/30 dark:text-rose-300",
        )}
      >
        <span
          key={likeAnimationKey}
          className={cn(
            "inline-flex",
            likeAnimating && "animate-engagement-like",
          )}
        >
          <HeartIcon
            className={cn(
              "h-4 w-4 stroke-2 transition-all duration-200",
              entry.liked && "fill-current text-rose-500 stroke-rose-500",
            )}
          />
        </span>
        {entry.likes} likes
      </button>
    </div>
  );
}
