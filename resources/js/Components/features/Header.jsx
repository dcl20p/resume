import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ThemeToggle } from '@/Components/features/ThemeToggle';
import { LanguageToggle } from '@/Components/features/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function Header() {
	const { t, i18n } = useTranslation();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleLanguage = () => {
		const newLang = i18n.language === 'en' ? 'vi' : 'en';
		i18n.changeLanguage(newLang);
	};

	const navItems = [
		{ href: '#home', label: t('nav.home') },
		{ href: '#about', label: t('nav.about') },
		{ href: '#experience', label: t('nav.experience') },
		{ href: '#projects', label: t('nav.projects') },
		{ href: '#contact', label: t('nav.contact') },
	];

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-sm' : 'bg-background/80 backdrop-blur-sm'}`}>
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<Link href="/" className="text-xl font-bold">
						Portfolio
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-foreground/80 hover:text-foreground transition-colors"
							>
								{item.label}
							</Link>
						))}
						<div className="flex items-center space-x-2">
							<LanguageToggle />
							<ThemeToggle />
						</div>
					</nav>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.nav
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className="md:hidden"
						>
							<div className="py-4 space-y-4">
								{navItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className="block text-foreground/80 hover:text-foreground transition-colors"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{item.label}
									</Link>
								))}
								<div className="flex items-center space-x-2 pt-4">
									<LanguageToggle />
									<ThemeToggle />
								</div>
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
} 