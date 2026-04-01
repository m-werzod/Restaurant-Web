const DEFAULT_MEDIA_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://anorkhulov.uz";

export function resolveMediaUrl(
  value?: string | null,
  baseUrl: string = DEFAULT_MEDIA_BASE,
) {
  if (!value) return "";

  const normalizedValue = value.trim().replace(/\\/g, "/");
  if (!normalizedValue) return "";

  if (/^(https?:|data:|blob:)/i.test(normalizedValue)) {
    return normalizedValue;
  }

  const normalizedBase = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;
  const normalizedPath = normalizedValue.startsWith("/")
    ? normalizedValue
    : `/${normalizedValue}`;

  return `${normalizedBase}${normalizedPath}`;
}
