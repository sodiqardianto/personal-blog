"use client";

import Image from "next/image";
import { useState, type ComponentProps } from "react";
import { shimmerBlur } from "@/lib/utils";

type BlurImageProps = ComponentProps<typeof Image>;

export function BlurImage({ className = "", ...props }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        props.onLoad?.(e);
      }}
      placeholder={props.placeholder ?? "blur"}
      blurDataURL={props.blurDataURL ?? shimmerBlur()}
      className={`transition-[opacity,filter] duration-700 ease-out ${
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-xl"
      } ${className}`}
    />
  );
}
