import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/Components/ui/label";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

// Configure axios defaults
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default function ContactForm() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Define form schema with zod
    const formSchema = z.object({
        name: z.string()
            .min(2, t('contact.validation.name_min'))
            .max(255, t('contact.validation.name_max'))
            .regex(/^[\p{L}\s]+$/u, t('contact.validation.name_format')),
        email: z.string()
            .email(t('contact.validation.email_invalid'))
            .max(255, t('contact.validation.email_max')),
        subject: z.string()
            .min(3, t('contact.validation.subject_min'))
            .max(255, t('contact.validation.subject_max')),
        message: z.string()
            .min(10, t('contact.validation.message_min'))
            .max(1000, t('contact.validation.message_max')),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        }
    });

    const loadReCaptcha = () => {
        return new Promise((resolve, reject) => {
            if (window.grecaptcha && window.grecaptcha.execute) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `${import.meta.env.VITE_RECAPTCHA_URL_RENDER}?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}&hl=vi`;
            script.async = true;
            script.defer = true;

            script.onload = () => {
                const checkInterval = setInterval(() => {
                    if (window.grecaptcha && window.grecaptcha.execute) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);

                setTimeout(() => {
                    clearInterval(checkInterval);
                    reject('Timeout loading reCAPTCHA');
                }, 5000);
            };

            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    const onSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            // Load reCAPTCHA if not loaded
            if (!window.grecaptcha || !window.grecaptcha.execute) {
                await loadReCaptcha();
            }

            // Get reCAPTCHA token
            const token = await window.grecaptcha.execute(
                import.meta.env.VITE_RECAPTCHA_SITE_KEY,
                { action: 'contact_form' }
            );

            // Send form data
            const response = await axios.post('/api/contact', {
                ...formData,
                recaptcha_token: token
            });

            if (response.data.success) {
                toast({
                    title: t('contact.success'),
                    className: "bg-green-500 border-none text-white",
                    description: t('contact.success_description'),
                    variant: 'success'
                });
                reset();
            } else {
                throw new Error(response.data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            toast({
                title: t('contact.errors.title'),
                description: error.response?.data?.message || error.message || t('contact.errors.server'),
                variant: 'destructive'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
        >
            <Card className="glass-card card-hover border-0">
                <CardContent className="p-6">
                    <h3 className="section-subtitle mb-6">{t('contact.send_message')}</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-foreground/80">{t('contact.name')}</Label>
                                <Input
                                    id="name"
                                    {...register('name')}
                                    className={`bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 ${
                                        errors.name ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground/80">{t('contact.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className={`bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 ${
                                        errors.email ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject" className="text-foreground/80">{t('contact.subject')}</Label>
                            <Input
                                id="subject"
                                {...register('subject')}
                                className={`bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 ${
                                    errors.subject ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-sm">{errors.subject.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-foreground/80">{t('contact.message')}</Label>
                            <Textarea
                                id="message"
                                {...register('message')}
                                className={`min-h-[120px] bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 ${
                                    errors.message ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm">{errors.message.message}</p>
                            )}
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    {t('contact.sending')}
                                </div>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    {t('contact.send')}
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
} 