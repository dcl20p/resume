import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/Components/ui/card';

export default function Skills() {
	const { t } = useTranslation();

	const skillCategories = [
		{
			title: t('skills.frontend'),
			skills: [
				{ name: 'HTML5', level: 90 },
				{ name: 'CSS3/SCSS/FLOCSS', level: 85 },
				{ name: 'JavaScript/Jquery', level: 90 },
				{ name: 'React', level: 30 },
				{ name: 'Angular7', level: 30 },
				{ name: 'Tailwind CSS/Bootstrap', level: 80 },
				{ name: 'AlpineJS', level: 60 },
				{ name: 'Vue.js', level: 10 }
			]
		},
		{
			title: t('skills.backend'),
			skills: [
				{ name: 'PHP (Zend/Laminas)', level: 100 },
				{ name: 'Laravel', level: 50 },
				{ name: 'Node.js', level: 10 },
				{ name: 'Python (Django)', level: 10 },
				{ name: 'MySQL/MariaDB', level: 85 },
				{ name: 'Redis/Memcached', level: 75 },
				{ name: 'Elasticsearch', level: 90 },
				{ name: 'Apache Kafka/Gearman/RabbitMQ', level: 70 },
			]
		},
		{
			title: t('skills.tools'),
			skills: [
				{ name: 'Git/SVN', level: 85 },
				{ name: 'Docker', level: 75 },
				{ name: 'VS Code/Sublime Text/PHPStorm/Cursor', level: 90 },
				{ name: 'Figma', level: 10 },
				{ name: 'Postman', level: 85 },
				{ name: 'Jira/Trello/Backlog', level: 50 },
				{ name: 'Jenkins', level: 50 },
				{ name: 'Linux/Windows/MacOS', level: 80 },
			]
		}
	];

	return (
		<section id="skills" className="section-padding relative overflow-hidden bg-[var(--background-dark)]">
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
					<h2 className="section-title">{t('skills.title')}</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{skillCategories.map((category, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="h-full"
							>
								<Card className="glass-card card-hover h-full border-0">
									<CardContent className="p-6">
										<h3 className="section-subtitle">{category.title}</h3>
										<div className="space-y-4">
											{category.skills.map((skill, skillIndex) => (
												<div key={skillIndex}>
													<div className="flex justify-between mb-1">
														<span className="text-foreground/80">{skill.name}</span>
														{/* <span className="text-foreground/60">{skill.level}%</span> */}
													</div>
													<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
														<motion.div
															initial={{ width: 0 }}
															whileInView={{ width: `${skill.level}%` }}
															transition={{ duration: 1, delay: skillIndex * 0.1 }}
															viewport={{ once: true }}
															className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500"
														/>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
} 