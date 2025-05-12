import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/username',
      label: 'GitHub'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://linkedin.com/in/username',
      label: 'LinkedIn'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:example@email.com',
      label: 'Email'
    }
  ];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="block text-foreground/80">{t('hero.greeting')}</span>
                <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
                  {t('hero.name')}
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl text-foreground/60 mb-8">
                {t('hero.title')}
              </h2>
              
              <p className="text-foreground/60 text-lg mb-8">
                {t('hero.description')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 hover:opacity-90">
                  {t('hero.download_cv')}
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#contact">
                    {t('hero.contact_me')}
                  </a>
                </Button>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-cyan-500 transition-colors duration-300"
                    aria-label={link.label}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Animated Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mobile-app.svg"
                  alt="Hero Illustration"
                  className="relative z-10 w-full h-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <a
              href="#about"
              className="text-foreground/60 hover:text-cyan-500 transition-colors duration-300"
            >
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 