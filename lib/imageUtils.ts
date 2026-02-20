/**
 * Utility for handling image and resource URLs
 */

/**
 * Ensures that a URL uses HTTPS instead of HTTP
 * @param url - The URL to transform
 * @returns The transformed URL with https protocol
 */
export const ensureHttps = (url: string | undefined | null): string => {
    if (!url) return "";
    if (typeof url !== 'string') return "";

    // Replace http with https, but only at the start of the string
    // and only if it's not already https
    return url.replace(/^http:\/\//i, 'https://');
};
