/**
 * Utility for making API requests with cache-busting strategies
 * This ensures fresh data is always fetched from external APIs
 */

/**
 * Creates fetch options that prevent caching
 * @param customOptions - Additional fetch options to merge
 * @returns RequestInit object with no-cache settings
 */
export function createNoCacheOptions(customOptions: RequestInit = {}): RequestInit {
    return {
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            ...customOptions.headers,
        },
        ...customOptions,
    };
}

/**
 * Fetch wrapper that automatically applies cache-busting strategies
 * @param url - The URL to fetch
 * @param options - Additional fetch options
 * @returns Promise with the fetch response
 */
export async function fetchWithNoCache(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    // Add timestamp to URL to prevent browser caching
    const separator = url.includes('?') ? '&' : '?';
    const cacheBustUrl = `${url}${separator}_t=${Date.now()}`;

    return fetch(cacheBustUrl, createNoCacheOptions(options));
}

/**
 * Fetch wrapper for JSON responses with automatic cache-busting
 * @param url - The URL to fetch
 * @param options - Additional fetch options
 * @returns Promise with parsed JSON data
 */
export async function fetchJSON<T = any>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetchWithNoCache(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
