import React from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

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
    <footer className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-40 left-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 right-20 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 bg-clip-text text-transparent mb-4">
                {t('site.name')}
              </h3>
              <p className="text-foreground/60">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-foreground/80 font-medium mb-4">{t('footer.quick_links')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-foreground/60 hover:text-cyan-500 transition-colors duration-300">
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link href="#experience" className="text-foreground/60 hover:text-cyan-500 transition-colors duration-300">
                    {t('nav.experience')}
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-foreground/60 hover:text-cyan-500 transition-colors duration-300">
                    {t('nav.projects')}
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-foreground/60 hover:text-cyan-500 transition-colors duration-300">
                    {t('nav.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-foreground/80 font-medium mb-4">{t('footer.connect')}</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-cyan-500 transition-colors duration-300"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-center text-foreground/60">
              © {currentYear} {t('site.name')}. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 