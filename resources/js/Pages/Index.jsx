import React from 'react';
import Header from '@/Components/features/Header';
import Hero from '@/Components/features/Hero';
import About from '@/Components/features/About';
import Experience from '@/Components/features/Experience';
import Skills from '@/Components/features/Skills';
import Education from '@/Components/features/Education';
import Projects from '@/Components/features/Projects';
import Contact from '@/Components/features/Contact';
import Footer from '@/Components/features/Footer';
import ScrollToTop from '@/Components/features/ScrollToTop';

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Index; 