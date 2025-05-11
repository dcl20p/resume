import React from 'react';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Hero from '@/Components/Hero';
import About from '@/Components/About';
import Experience from '@/Components/Experience';
import Projects from '@/Components/Projects';
import Contact from '@/Components/Contact';
import Footer from '@/Components/Footer';

export default function Home() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('site.name')} />
            <div className="min-h-screen bg-gray-50">
                <div className="relative">
                    {/* Hero Background */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-cyan-500/90 mix-blend-multiply" />
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                            alt="Hero Background"
                            className="w-full h-[600px] object-cover"
                        />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10">
                        <Hero />
                    </div>
                </div>

                <About />
                <Experience />
                <Projects />
                <Contact />
                <Footer />
            </div>
        </>
    );
} 