import React, { useState, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { toast } from 'sonner';

// Preload HeroImage
const HeroImage = React.lazy(() => import('./HeroImage'));

// Preload function
const preloadImage = (src) => {
	const img = new Image();
	img.src = src;
};

export default function Hero() {
	const { t } = useTranslation();
	const [isDownloading, setIsDownloading] = useState(false);

	useEffect(() => {
		// Preload hero image
		preloadImage('/images/cover/hero-cover.webp');
	}, []);

	const socialLinks = [
		{
			icon: <Github className="w-5 h-5" />,
			href: 'https://github.com/dcl20p',
			label: 'GitHub'
		},
		{
			icon: <Linkedin className="w-5 h-5" />,
			href: 'https://www.linkedin.com/in/t%C3%B9ng-thi%E1%BB%81u-s%E1%BB%B9-b68a84167/',
			label: 'LinkedIn'
		},
		{
			icon: <Mail className="w-5 h-5" />,
			href: 'mailto:tung0963002862@gmail.com',
			label: 'Email'
		}
	];

	const handleDownloadCV = async (language) => {
		try {
			setIsDownloading(true);
			const cvPath = language === 'en' 
				? '/cv/CV-Thieu-Sy-Tung-EN.pdf'
				: '/cv/CV-Thieu-Sy-Tung-VI.pdf';
			
			// Try to fetch the file first to check if it exists
			const response = await fetch(cvPath);
			if (!response.ok) {
				throw new Error('CV file not found');
			}

			// Create a temporary link element
			const link = document.createElement('a');
			link.href = cvPath;
			link.download = `CV-${language === 'en' ? 'English' : 'Vietnamese'}.pdf`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			toast.success(t('hero.download_success'));
		} catch (error) {
			console.error('Error downloading CV:', error);
			toast.error(t('hero.download_error'));
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<section className="h-screen flex items-center relative overflow-hidden">
			{/* Background decorations */}
			<div className="absolute inset-0 w-full h-full pointer-events-none">
				<div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
				<div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Left Content */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="w-full"
						>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
								<span className="block text-foreground/80">{t('hero.greeting')}</span>
								<span className="leading-[1.5] block bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
									{t('hero.name')}
								</span>
							</h1>

							<h2 className="text-2xl md:text-3xl text-foreground/60 mb-8">
								{t('hero.title')}
							</h2>

							<p className="text-foreground/60 text-lg mb-8">
								{t('hero.description')}
							</p>

							<div className="flex flex-row gap-2 sm:gap-4">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button 
											size="lg" 
											className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
											disabled={isDownloading}
										>
											<Download className="w-4 h-4 mr-2" />
											{isDownloading ? t('hero.downloading') : t('hero.download_cv')}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem 
											onClick={() => handleDownloadCV('en')}
											disabled={isDownloading}
										>
											{t('hero.download_cv_en')}
										</DropdownMenuItem>
										<DropdownMenuItem 
											onClick={() => handleDownloadCV('vi')}
											disabled={isDownloading}
										>
											{t('hero.download_cv_vi')}
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<Button size="lg" variant="outline" asChild className="w-full">
									<a href="#contact" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:text-white hover:from-purple-600 hover:to-pink-600">
										<Mail className="w-4 h-4 mr-2" />
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
							className="hidden lg:flex items-center justify-center w-full h-[475px]"
						>
							<Suspense fallback={
								<div className="relative w-full h-full flex items-center justify-center">
									<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
									<div className="relative z-10 w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
								</div>
							}>
								<div className="w-full h-full flex items-center justify-center">
									<HeroImage />
								</div>
							</Suspense>
						</motion.div>
					</div>

					{/* Scroll Down Indicator */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="absolute left-1/2 transform -translate-x-1/2 z-10"
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