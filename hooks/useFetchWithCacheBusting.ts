// hooks/useFetchWithCacheBusting.ts
import { useState, useEffect, useRef, useCallback } from 'react';

interface FetchOptions extends RequestInit {
  skipCache?: boolean;
  retryCount?: number;
}

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<T | null>;
  isInitialized: boolean;
}

export function useFetchWithCacheBusting<T = any>(
  url: string,
  options: FetchOptions = {}
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasFetched = useRef(false);

  const fetchData = useCallback(async (retryCount = 0): Promise<T | null> => {
    if (!url) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      // Add cache-busting timestamp
      const cacheBuster = Date.now();
      const separator = url.includes('?') ? '&' : '?';
      const finalUrl = `${url}${separator}_t=${cacheBuster}`;
      
      console.log(`Fetching: ${finalUrl}`);
      
      const response = await fetch(finalUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          ...options.headers,
        },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log(`Fetch successful for ${url}:`, result);
      setData(result);
      setError(null);
      return result;
    } catch (err) {
      console.error(`Fetch error for ${url} (attempt ${retryCount + 1}/3):`, err);
      
      // Retry logic with exponential backoff
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchData(retryCount + 1);
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
        setError(errorMessage);
        setData(null);
        throw err;
      }
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  }, [url, options]);

  // Auto-fetch on mount
  useEffect(() => {
    if (!hasFetched.current && url) {
      hasFetched.current = true;
      fetchData();
    }
  }, [url, fetchData]);

  // Manual refetch function
  const refetch = useCallback(() => {
    hasFetched.current = true;
    return fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch, isInitialized };
}