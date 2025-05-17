import './bootstrap';
import '../css/app.css';
import './fade-in';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import GoogleAnalytics from '@/Components/GoogleAnalytics';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const titleName = import.meta.env.TITLE || 'Portfolio';

createInertiaApp({
    title: (title) => `${titleName} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));
        page.then(module => {
            // Preload next page
            if (module.default.preload) {
                module.default.preload();
            }
        });
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <I18nextProvider i18n={i18n}>
                <App {...props} />
                <GoogleAnalytics />
            </I18nextProvider>
        );
    },
    progress: {
        color: '#0ea5e9',
        showSpinner: false,
    },
});
