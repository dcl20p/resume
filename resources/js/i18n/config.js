import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import viTranslations from './locales/vi.json';

// Get saved language from localStorage or use default
const savedLanguage = localStorage.getItem('i18nextLng') || 'vi';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: enTranslations,
			},
			vi: {
				translation: viTranslations,
			},
		},
		fallbackLng: 'vi',
		lng: savedLanguage,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupLocalStorage: 'i18nextLng',
			checkWhitelist: true,
		},
		react: {
			useSuspense: false,
		},
	});

// Add event listener for language changes
i18n.on('languageChanged', (lng) => {
	localStorage.setItem('i18nextLng', lng);
	document.documentElement.lang = lng;
});

export default i18n; 