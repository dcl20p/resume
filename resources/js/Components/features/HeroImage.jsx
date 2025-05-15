import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroImage() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Preload image immediately
        const img = new Image();
        img.src = '/images/cover/hero-cover.webp';
        img.onload = () => {
            setIsLoaded(true);
        };
    }, []);

    // Show loading skeleton while image is loading
    if (!isLoaded) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 w-full h-[550px] bg-transparent animate-pulse rounded-lg"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
                <img
                    src="/images/cover/hero-cover.webp"
                    alt="Hero Cover"
                    width="525"
                    height="550"
                    className="w-full h-auto"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    style={{ contentVisibility: 'auto' }}
                />
            </div>
        </motion.div>
    );
} 