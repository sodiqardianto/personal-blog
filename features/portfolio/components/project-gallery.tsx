"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  ImageIcon,
} from "@/shared/ui";
import type { GalleryItem } from "@/features/portfolio/types";

type ProjectGalleryProps = {
  items: GalleryItem[];
};

function hasImage(
  item: GalleryItem,
): item is GalleryItem & { imageSrc: string } {
  return typeof item.imageSrc === "string" && item.imageSrc.length > 0;
}

export function ProjectGallery({ items }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxImages = items.filter(hasImage);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (lightboxIndex !== null) {
      document.body.dataset.overlayOpen = "true";
      return () => {
        delete document.body.dataset.overlayOpen;
      };
    }

    delete document.body.dataset.overlayOpen;

    return () => {
      delete document.body.dataset.overlayOpen;
    };
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }

      if (lightboxImages.length < 2) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((currentIndex) =>
          currentIndex === null
            ? 0
            : (currentIndex - 1 + lightboxImages.length) %
              lightboxImages.length,
        );
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((currentIndex) =>
          currentIndex === null
            ? 0
            : (currentIndex + 1) % lightboxImages.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [lightboxImages.length, lightboxIndex]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-2">
        {items.map((galleryItem, index) =>
          hasImage(galleryItem) ? (
            <button
              key={`${galleryItem.caption}-${index}`}
              type="button"
              onClick={() =>
                setLightboxIndex(
                  items.slice(0, index + 1).filter(hasImage).length - 1,
                )
              }
              className="gallery-item relative aspect-4/3 cursor-pointer overflow-hidden rounded-xl bg-slate-100 text-left dark:bg-navy-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryItem.imageSrc}
                alt={galleryItem.alt ?? galleryItem.caption}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.05]"
              />
              <div className="cap absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/50 to-transparent p-2.5 pl-3 text-[0.72rem] text-white">
                Click to enlarge
              </div>
            </button>
          ) : (
            <div
              key={`${galleryItem.caption}-${index}`}
              className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-navy-800"
            >
              <ImageIcon className="h-8 w-8 text-blue opacity-20 dark:text-blue-dark" />
              <span className="absolute bottom-2.5 left-3 text-[0.72rem] text-ink/40 dark:text-slate-600">
                {galleryItem.caption}
              </span>
            </div>
          ),
        )}
      </div>

      {lightboxIndex !== null && lightboxImages[lightboxIndex] ? (
        <div className="fixed inset-0 z-1200 flex items-center justify-center bg-black/92">
          <button
            type="button"
            aria-label="Close image preview"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-5 top-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/12 text-white transition-all hover:bg-white/22"
          >
            <CloseIcon className="h-5 w-5 stroke-[2.2]" />
          </button>

          {lightboxImages.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + lightboxImages.length) %
                      lightboxImages.length,
                  )
                }
                className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/22"
              >
                <ArrowLeftIcon className="h-5 w-5 stroke-[2.2]" />
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % lightboxImages.length)
                }
                className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/22"
              >
                <ArrowRightIcon className="h-5 w-5 stroke-[2.2]" />
              </button>
            </>
          ) : null}

          <div className="flex min-h-screen items-center justify-center px-5 py-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImages[lightboxIndex].imageSrc}
              alt={
                lightboxImages[lightboxIndex].alt ??
                lightboxImages[lightboxIndex].caption
              }
              className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain"
            />
          </div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/50">
            {lightboxIndex + 1} / {lightboxImages.length}
          </p>
        </div>
      ) : null}
    </>
  );
}
