import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/Components/ui/card';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Projects() {
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(0);

	const projects = [
		{
			title: t('projects.project1.title'),
			description: t('projects.project1.description'),
			technologies: ['WordPress', 'WooCommerce', 'ACF', 'EzTOC'],
			image: '/images/projects/fmc.png',
			github: 'https://github.com/username/project1',
			demo: 'https://project1-demo.com'
		},
		{
			title: t('projects.project2.title'),
			description: t('projects.project2.description'),
			technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
			image: '/images/projects/project2.jpg',
			github: 'https://github.com/username/project2',
			demo: 'https://project2-demo.com'
		},
		{
			title: t('projects.project3.title'),
			description: t('projects.project3.description'),
			technologies: ['PHP', 'Laravel', 'PostgreSQL', 'Redis'],
			image: '/images/projects/project3.jpg',
			github: 'https://github.com/username/project3',
			demo: 'https://project3-demo.com'
		},
		{
			title: t('projects.project3.title'),
			description: t('projects.project3.description'),
			technologies: ['PHP', 'Laravel', 'PostgreSQL', 'Redis'],
			image: '/images/projects/project3.jpg',
			github: 'https://github.com/username/project3',
			demo: 'https://project3-demo.com'
		},
		{
			title: t('projects.project3.title'),
			description: t('projects.project3.description'),
			technologies: ['PHP', 'Laravel', 'PostgreSQL', 'Redis'],
			image: '/images/projects/project3.jpg',
			github: 'https://github.com/username/project3',
			demo: 'https://project3-demo.com'
		},
		{
			title: t('projects.project3.title'),
			description: t('projects.project3.description'),
			technologies: ['PHP', 'Laravel', 'PostgreSQL', 'Redis'],
			image: '/images/projects/project3.jpg',
			github: 'https://github.com/username/project3',
			demo: 'https://project3-demo.com'
		},
		{
			title: t('projects.project3.title'),
			description: t('projects.project3.description'),
			technologies: ['PHP', 'Laravel', 'PostgreSQL', 'Redis'],
			image: '/images/projects/project3.jpg',
			github: 'https://github.com/username/project3',
			demo: 'https://project3-demo.com'
		},
		{
			title: t('projects.project3.title'),
			description: t('projects.project3.description'),
			technologies: ['PHP', 'Laravel', 'PostgreSQL', 'Redis'],
			image: '/images/projects/project3.jpg',
			github: 'https://github.com/username/project3',
			demo: 'https://project3-demo.com'
		},
		{
			title: t('projects.project3.title'),
			description: t('projects.project3.description'),
			technologies: ['PHP', 'Laravel', 'PostgreSQL', 'Redis'],
			image: '/images/projects/project3.jpg',
			github: 'https://github.com/username/project3',
			demo: 'https://project3-demo.com'
		}
	];

	const slideVariants = {
		enter: (direction) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1
		},
		exit: (direction) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0
		})
	};

	return (
		<section id="projects" className="section-padding relative overflow-hidden">
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
					<h2 className="section-title">{t('projects.title')}</h2>

					<div className="mt-12 relative">
						<div className="swiper-button-prev-custom"></div>
						<div className="swiper-button-next-custom"></div>
						<Swiper
							modules={[Navigation, Pagination, Autoplay]}
							spaceBetween={30}
							slidesPerView={1}
							navigation={{
								prevEl: '.swiper-button-prev-custom',
								nextEl: '.swiper-button-next-custom',
							}}
							pagination={{ clickable: true }}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
							breakpoints={{
								640: {
									slidesPerView: 1,
									spaceBetween: 20,
								},
								768: {
									slidesPerView: 2,
									spaceBetween: 30,
								},
								1024: {
									slidesPerView: 3,
									spaceBetween: 30,
								},
							}}
							className="projects-slider"
						>
							{projects.map((project, index) => (
								<SwiperSlide key={index}>
									<AnimatePresence initial={false} custom={index - activeIndex}>
										<motion.div
											key={index}
											custom={index - activeIndex}
											variants={slideVariants}
											initial="enter"
											animate="center"
											exit="exit"
											transition={{
												x: { type: "spring", stiffness: 300, damping: 30 },
												opacity: { duration: 0.2 }
											}}
											className="h-full"
										>
											<Card className="glass-card card-hover h-full border-0 group">
												<CardContent className="p-6">
													<motion.div 
														className="relative overflow-hidden rounded-lg mb-4"
														whileHover={{ scale: 1.05 }}
														transition={{ duration: 0.3 }}
													>
														<img
															src={project.image}
															alt={project.title}
															className="w-full h-48 object-cover"
														/>
														<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
													</motion.div>

													<motion.h3 
														className="section-subtitle mb-2"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: 0.2 }}
													>
														{project.title}
													</motion.h3>
													<motion.p 
														className="text-foreground/80 mb-4"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: 0.3 }}
													>
														{project.description}
													</motion.p>

													<motion.div 
														className="flex flex-wrap gap-2 mb-4"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: 0.4 }}
													>
														{project.technologies.map((tech, techIndex) => (
															<motion.span
																key={techIndex}
																className="px-3 py-1 text-sm bg-cyan-500/10 text-cyan-500 rounded-full"
																whileHover={{ scale: 1.1 }}
																transition={{ duration: 0.2 }}
															>
																{tech}
															</motion.span>
														))}
													</motion.div>

													<motion.div 
														className="flex flex-col sm:flex-row gap-2"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: 0.5 }}
													>
														<Button variant="outline" className="w-full" asChild>
															<a href={project.github} target="_blank" rel="noopener noreferrer">
																<Github className="mr-2 h-4 w-4" />
																{t('projects.view_code')}
															</a>
														</Button>
														<Button className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:opacity-90" asChild>
															<a href={project.demo} target="_blank" rel="noopener noreferrer">
																<ExternalLink className="mr-2 h-4 w-4" />
																{t('projects.view_project')}
															</a>
														</Button>
													</motion.div>
												</CardContent>
											</Card>
										</motion.div>
									</AnimatePresence>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</motion.div>
			</div>
			<style jsx global>{`
				.projects-slider {
					padding: 20px 10px 50px;
				}
				.projects-slider.swiper {
					overflow: hidden;
				}
				.swiper-button-prev-custom,
				.swiper-button-next-custom {
					width: 40px;
					height: 40px;
					background: rgb(6 182 212);
					border-radius: 50%;
					color: white;
					transition: all 0.3s ease;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					z-index: 10;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.swiper-button-prev-custom:hover,
				.swiper-button-next-custom:hover {
					background: rgb(8 145 178);
					transform: translateY(-50%) scale(1.1);
				}
				.swiper-button-prev-custom::after,
				.swiper-button-next-custom::after {
					content: '';
					width: 10px;
					height: 10px;
					border-top: 2px solid white;
					border-right: 2px solid white;
				}
				.swiper-button-prev-custom::after {
					transform: rotate(-135deg);
				}
				.swiper-button-next-custom::after {
					transform: rotate(45deg);
				}
				.swiper-button-next-custom {
					right: -20px;
				}
				.swiper-button-prev-custom {
					left: -20px;
				}
				.projects-slider .swiper-pagination {
					bottom: 0;
				}
				.projects-slider .swiper-pagination-bullet {
					width: 8px;
					height: 8px;
					background: rgb(6 182 212 / 0.3);
					opacity: 1;
				}
				.projects-slider .swiper-pagination-bullet-active {
					background: rgb(6 182 212);
					width: 20px;
					border-radius: 4px;
				}
			`}</style>
		</section>
	);
} 