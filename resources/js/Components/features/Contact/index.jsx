import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Toaster } from "@/Components/ui/toaster";

// Lazy load components
const ContactInfo = lazy(() => import('./ContactInfo'));
const ContactForm = lazy(() => import('./ContactForm'));

export default function Contact() {
    const { t } = useTranslation();

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute -top-40 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="section-title">{t('contact.title')}</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Suspense fallback={<div className="lg:col-span-1 h-96 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg"></div>}>
                            <ContactInfo />
                        </Suspense>

                        <Suspense fallback={<div className="lg:col-span-2 h-96 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg"></div>}>
                            <ContactForm />
                        </Suspense>
                    </div>
                </motion.div>
            </div>
            <Toaster />
        </section>
    );
} 