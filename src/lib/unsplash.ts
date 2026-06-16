// Unsplash image helper.
// With UNSPLASH_ACCESS_KEY set: calls the API (server-side, cached 24h).
// Without key: falls back to source.unsplash.com keyword URL (CSS background use only).

const cache = new Map<string, string | null>();

const BASE = 'https://api.unsplash.com';

export async function fetchUnsplashUrl(
  query: string,
  orientation: 'landscape' | 'squarish' = 'landscape',
): Promise<string | null> {
  const key = `${query}:${orientation}`;
  if (cache.has(key)) return cache.get(key)!;

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    const url = `https://source.unsplash.com/featured/1200x600/?${encodeURIComponent(query)}`;
    cache.set(key, url);
    return url;
  }

  try {
    const res = await fetch(
      `${BASE}/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=${orientation}&content_filter=high`,
      {
        headers: { Authorization: `Client-ID ${accessKey}` },
        next: { revalidate: 86400 }, // 24 h ISR cache
      },
    );

    if (!res.ok) {
      cache.set(key, null);
      return null;
    }

    const data = await res.json();
    const url: string | null = data.results?.[0]?.urls?.regular ?? null;
    cache.set(key, url);
    return url;
  } catch {
    cache.set(key, null);
    return null;
  }
}

// Synchronous keyword URL for use in CSS backgrounds (no API key required).
// These use source.unsplash.com which handles redirects fine as CSS backgrounds.
export function unsplashKeywordUrl(query: string, width = 1200, height = 600): string {
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)},supplement`;
}

// Deterministic keyword URL for an ingredient by name.
export function ingredientImageUrl(name: string): string {
  return unsplashKeywordUrl(`${name} supplement molecule`, 1200, 600);
}

// Deterministic keyword URL for a category.
export function categoryImageUrl(categoryName: string): string {
  return unsplashKeywordUrl(`${categoryName} health wellness supplement`, 1400, 700);
}
