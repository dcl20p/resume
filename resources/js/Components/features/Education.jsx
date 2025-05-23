import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/Components/ui/card';

export default function Education() {
	const { t } = useTranslation();

	const educations = [
		{
			degree: t('education.education1.degree'),
			school: t('education.education1.university'),
			period: t('education.education1.period'),
			description: t('education.education1.description'),
			achievements: [
				t('education.education1.achievement1')
			]
		},
		{
			degree: t('education.education2.degree'),
			school: t('education.education2.university'),
			period: t('education.education2.period'),
			description: t('education.education2.description'),
			achievements: [
				t('education.education2.achievement1'),
				t('education.education2.achievement2')
			],
			isCertificate: true
		}
	];

	return (
		<section id="education" className="section-padding relative overflow-hidden bg-ground-light">
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
					<h2 className="section-title">{t('education.title')}</h2>

					<div className="relative">
						{/* Timeline line */}
						<div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-green-500"></div>

						<div className="space-y-8 md:space-y-12">
							{educations.map((edu, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									viewport={{ once: true }}
									className={`relative flex flex-col md:flex-row gap-4 md:gap-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
										}`}
								>
									{/* Timeline dot */}
									<div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 transform -translate-x-[6px] md:-translate-x-1/2 z-10"></div>

									{/* Time period */}
									<div className={`md:w-1/2 flex items-end justify-end ${index % 2 !== 0 ? 'md:items-start md:justify-end' : 'md:items-start md:justify-start'}`}>
										<span className="text-sm text-foreground/60 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg dark:shadow-none">
											{edu.period}
										</span>
									</div>

									{/* Content */}
									<div className="md:w-1/2 pl-8 md:pl-0">
										<Card className="glass-card card-hover border-0">
											<CardContent className="p-6">
												<div className="mb-4">
													<h3 className="section-subtitle">{edu.degree}</h3>
													<p className="text-foreground/80">{edu.school}</p>
												</div>
												<p className="text-foreground/80 mb-4">{edu.description}</p>
												<div>
													<h4 className="text-foreground/80 font-medium mb-2">{edu.isCertificate ? t('education.certificate') : t('education.achievements')}:</h4>
													<ul className="list-disc list-inside space-y-1 text-foreground/80">
														{edu.achievements.map((achievement, i) => (
															<li key={i}>{achievement}</li>
														))}
													</ul>
												</div>
											</CardContent>
										</Card>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
} 