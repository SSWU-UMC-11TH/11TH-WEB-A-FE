export function getSafeCallbackUrl(
  callbackUrl: string | null,
): string {
  if (!callbackUrl || !callbackUrl.startsWith("/")) {
    return "/";
  }

  try {
    const base = "https://internal.invalid";
    const url = new URL(callbackUrl, base);

    if (url.origin !== base) {
      return "/";
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}