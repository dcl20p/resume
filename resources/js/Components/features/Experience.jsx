import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/Components/ui/card';

export default function Experience() {
	const { t } = useTranslation();

	const experiences = [
		{
			title: 'Web Developer',
			company: 'FPT TELECOM',
			period: '03/2025 - Nay',
			description: t('experience.description1'),
			responsibilities: [
				t('experience.responsibility6'),
				t('experience.responsibility1')
			],
			technologies: ['Django', 'WordPress', 'MySQL', 'Memcached', 'Docker']
		},
		{
			title: 'PHP Developer',
			company: 'GROOT LIMITED COMPANY',
			period: '04/2022 - 11/2024',
			description: t('experience.description2'),
			responsibilities: [
				t('experience.responsibility8'),
				t('experience.responsibility9'),
				t('experience.responsibility10'),
				t('experience.responsibility2'),
				t('experience.responsibility3'),
			],
			technologies: ['PHP (Laminas)', 'Kafka', 'Elasticsearch', 'Docker', 'Redis', 'MariaDB', 'MySQL']
		},
		{
			title: 'PHP Developer',
			company: 'FPT ONLINE JSC (VNEXPRESS)',
			period: '09/2019 - 04/2022',
			description: t('experience.description3'),
			responsibilities: [
				t('experience.responsibility11'),
				t('experience.responsibility12'),
				t('experience.responsibility13'),
				t('experience.responsibility14'),
				t('experience.responsibility15'),
				t('experience.responsibility16'),
			],
			technologies: ['PHP (Zend 1 & 2)', 'Elasticsearch', 'Redis', 'MySQL', 'Memcached', 'Gearman' , 'RabbitMQ']
		},
		{
			title: 'Web Developer',
			company: 'NAM LONG TECH',
			period: '12/2018 - 09/2019',
			description: t('experience.description4'),
			responsibilities: [
				t('experience.responsibility17'),
				t('experience.responsibility18'),
				t('experience.responsibility19')
			],
			technologies: ['Angular 7', 'NodeJS', 'MySQL', 'Laravel 5', 'FLOCSS' , 'SCSS', 'CSS3', 'HTML5', 'JavaScript', 'Bootstrap' , 'Jquery']
		},
		{
			title: t('experience.internship'),
			company: 'ABS VIỆT MỸ',
			period: '05/2018 - 08/2018',
			description: t('experience.description5'),
			responsibilities: [
				t('experience.responsibility20'),
				t('experience.responsibility21')
			],
			technologies: ['PHP MVC', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap' , 'Jquery']
		}
	];

	return (
		<section id="experience" className="section-padding relative overflow-hidden bg-ground-light">
			{/* Background decorations */}
			<div className="absolute -top-40 left-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
			<div className="absolute -bottom-40 right-20 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="max-w-6xl mx-auto"
				>
					<h2 className="section-title">{t('experience.title')}</h2>

					<div className="relative">
						{/* Timeline line */}
						<div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-green-500"></div>

						<div className="space-y-8 md:space-y-12">
							{experiences.map((exp, index) => (
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
											{exp.period}
										</span>
									</div>

									{/* Content */}
									<div className="md:w-1/2 pl-8 md:pl-0">
										<Card className="glass-card card-hover border-0">
											<CardContent className="p-6">
												<div className="mb-4">
													<h3 className="section-subtitle">{exp.title}</h3>
													<p className="text-foreground/80">{exp.company}</p>
												</div>
												<p className="text-foreground/80 mb-4">{exp.description}</p>
												<div className="mb-4">
													<h4 className="text-foreground/80 font-medium mb-2">{t('experience.responsibilities')}:</h4>
													<ul className="list-disc list-inside space-y-1 text-foreground/80">
														{exp.responsibilities.map((responsibility, i) => (
															<li key={i} dangerouslySetInnerHTML={{ __html: responsibility }} />
														))}
													</ul>
												</div>
												<div>
													<h4 className="text-foreground/80 font-medium mb-2">{t('experience.technologies')}:</h4>
													<div className="flex flex-wrap gap-2">
														{exp.technologies.map((tech, i) => (
															<span
																key={i}
																className="px-3 py-1 text-sm bg-cyan-500/10 text-cyan-500 rounded-full"
															>
																{tech}
															</span>
														))}
													</div>
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