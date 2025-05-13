import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";

export function LanguageToggle() {
	const { i18n } = useTranslation();
	const { toast } = useToast();

	const toggleLanguage = async () => {
		const newLang = i18n.language === 'en' ? 'vi' : 'en';
		
		try {
			// Update session locale
			await axios.post('/api/locale', { locale: newLang });
			
			// Update i18n language
			i18n.changeLanguage(newLang);

		} catch (error) {
			console.error('Error updating language:', error);
			toast({
				title: t('contact.errors.title'),
				description:  error.message || error.response?.data?.message,
				variant: 'destructive'
			});
		}
	};

	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={toggleLanguage}
			className="relative inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		>
			<Globe className="mr-2 h-4 w-4" />
			<span>{i18n.language === 'en' ? 'VI' : 'EN'}</span>
		</motion.button>
	);
} 