export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SHIMMER =
  '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e2e8f0" offset="0"/><stop stop-color="#cbd5e1" offset="0.5"/><stop stop-color="#e2e8f0" offset="1"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>';

export function shimmerBlur(): string {
  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  return `data:image/svg+xml;base64,${toBase64(SHIMMER)}`;
}
