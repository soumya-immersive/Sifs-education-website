'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * RouteChangeHandler - Ensures fresh data on route changes
 * This component handles cache clearing and state reset when routes change
 */
export default function RouteChangeHandler() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Clear any client-side caches when route changes
        if ('caches' in window) {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
        }

        // Force a small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            // Scroll to top on route change
            window.scrollTo(0, 0);
        }, 0);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return null;
}
