import { useEffect } from 'react';

export default function GoogleAnalytics() {
    useEffect(() => {
        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID);

        // Track page views
        gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
            page_path: window.location.pathname,
        });

        return () => {
            // Cleanup
            document.head.removeChild(script);
        };
    }, []);

    return null;
} 