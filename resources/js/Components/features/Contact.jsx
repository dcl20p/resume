import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Github, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/Components/ui/toaster";
import { Label } from "@/Components/ui/label";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

// Configure axios defaults
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default function Contact() {
	const { t } = useTranslation();
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(
			z.object({
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
			})
		),
	});

	// Load reCAPTCHA script
	useEffect(() => {
		const script = document.createElement('script');
		script.src = `${import.meta.env.VITE_RECAPTCHA_URL_RENDER}?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			// Get reCAPTCHA token
			const token = await window.grecaptcha.execute(
				import.meta.env.VITE_RECAPTCHA_SITE_KEY, 
				{ action: 'contact_form' }
			);

			const response = await axios.post('/api/contact', {
				...data,
				recaptcha_token: token
			}, {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Requested-With': 'XMLHttpRequest',
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
				}
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
				toast({
					title: t('contact.errors.title'),
					description: t('contact.errors.server'),
					variant: 'destructive'
				});
			}
		} catch (error) {
			toast({
				title: t('contact.errors.title'),
				description:  error.message || error.response?.data?.message,
				variant: 'destructive'
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const contactInfo = [
		{
			icon: <Mail className="w-5 h-5" />,
			title: t('contact.email'),
			value: 'tung096300862@gmail.com',
			link: 'mailto:tung096300862@gmail.com'
		},
		{
			icon: <Phone className="w-5 h-5" />,
			title: t('contact.phone'),
			value: '+84 963002862',
			link: 'tel:+84963002862'
		},
		{
			icon: <MapPin className="w-5 h-5" />,
			title: t('contact.location'),
			value: t('about.locationValue'),
			link: 'https://maps.app.goo.gl/76GrAsv19uyQZsSh8'
		}
	];

	const socialLinks = [
		{
			icon: <Github className="w-5 h-5" />,
			title: 'GitHub',
			link: 'https://github.com/dcl20p'
		},
		{
			icon: <Linkedin className="w-5 h-5" />,
			title: 'LinkedIn',
			link: 'https://www.linkedin.com/in/t%C3%B9ng-thi%E1%BB%81u-s%E1%BB%B9-b68a84167/'
		}
	];

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
						{/* Contact Information */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}
							className="lg:col-span-1"
						>
							<Card className="glass-card card-hover border-0 h-full">
								<CardContent className="p-6">
									<h3 className="section-subtitle mb-6">{t('contact.get_in_touch')}</h3>

									<div className="space-y-4">
										{contactInfo.map((info, index) => (
											<a
												key={index}
												href={info.link}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-4 p-3 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300"
											>
												<div className="text-cyan-500">{info.icon}</div>
												<div>
													<h4 className="text-foreground/80 font-medium">{info.title}</h4>
													<p className="text-foreground/60">{info.value}</p>
												</div>
											</a>
										))}
									</div>

									<div className="mt-8">
										<h4 className="text-foreground/80 font-medium mb-4">{t('contact.connect')}</h4>
										<div className="flex gap-4">
											{socialLinks.map((social, index) => (
												<a
													key={index}
													href={social.link}
													target="_blank"
													rel="noopener noreferrer"
													className="p-3 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300"
												>
													<div className="text-cyan-500">{social.icon}</div>
												</a>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>

						{/* Contact Form */}
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
											className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:opacity-90"
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
					</div>
				</motion.div>
			</div>
			<Toaster />
		</section>
	);
} 