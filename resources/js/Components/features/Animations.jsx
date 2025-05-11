import React, { useEffect } from 'react';

const Animations = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in-section class
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(element => {
      observer.observe(element);
    });

    // Observe all elements with slide-in-section class
    const slideElements = document.querySelectorAll('.slide-in-section');
    slideElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      // Cleanup observers when component unmounts
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
      slideElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Animations;