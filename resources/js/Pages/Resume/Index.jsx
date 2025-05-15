import React, { Suspense, lazy } from 'react';
import ResumeLayout from '@/Layouts/ResumeLayout';
import ScrollToTop from '@/Components/features/ScrollToTop';
import Animations from '@/Components/features/Animations';

// Lazy load all main components
const Header = lazy(() => import('@/Components/features/Header'));
const Hero = lazy(() => import('@/Components/features/Hero'));
const About = lazy(() => import('@/Components/features/About'));
const Skills = lazy(() => import('@/Components/features/Skills'));
const Experience = lazy(() => import('@/Components/features/Experience'));
const Projects = lazy(() => import('@/Components/features/Projects'));
const Education = lazy(() => import('@/Components/features/Education'));
const Contact = lazy(() => import('@/Components/features/Contact/index'));
const Footer = lazy(() => import('@/Components/features/Footer'));

// Loading component
const LoadingFallback = ({ className = "", height = "h-96" }) => (
	<div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg ${height} ${className}`}></div>
);

export default function Index() {
	return (
		<ResumeLayout>
			<Suspense fallback={<LoadingFallback />}>
				<Header />
			</Suspense>

			<Suspense fallback={<LoadingFallback height="h-screen" />}>
				<Hero />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<About />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<Skills />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<Experience />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<Projects />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<Education />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<Contact />
			</Suspense>

			<Suspense fallback={<LoadingFallback />}>
				<Footer />
			</Suspense>

			<ScrollToTop />
			<Animations />
		</ResumeLayout>
	);
} 