import React from 'react';
import ResumeLayout from '@/Layouts/ResumeLayout';
import Header from '@/Components/features/Header';
import Hero from '@/Components/features/Hero';
import About from '@/Components/features/About';
import Skills from '@/Components/features/Skills';
import Experience from '@/Components/features/Experience';
import Education from '@/Components/features/Education';
import Projects from '@/Components/features/Projects';
import Contact from '@/Components/features/Contact';
import Footer from '@/Components/features/Footer';
import ScrollToTop from '@/Components/features/ScrollToTop';
import Animations from '@/Components/features/Animations';

export default function Index() {
	return (
		<ResumeLayout>
			<Header />
			<Hero />
			<About />
			<Skills />
			<Experience />
			<Projects />
			<Education />
			<Contact />
			<Footer />
			<ScrollToTop />
			<Animations />
		</ResumeLayout>
	);
} 