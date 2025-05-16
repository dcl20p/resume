import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/Components/ui/card';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Virtual } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/lazy';

const projects = [
	{
		title: ('projects.fmc_website.title'),
		description: ('projects.fmc_website.description'),
		technologies: ['WordPress', 'WooCommerce', 'ACF', 'EzTOC', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/fmc.jpg',
		demo: 'https://fptmedicare.vn/',
		teamSize: 2
	},
	{
		title: ('projects.fmc_api.title'),
		description: ('projects.fmc_api.description'),
		technologies: ['Django', 'MongoDB', 'MySQL', 'Docker', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/fmc-api.jpg',
		teamSize: 2
	},
	{
		title: ('projects.real_estate.title'),
		description: ('projects.real_estate.description'),
		technologies: ['Laravel', 'MariaDB', 'Redis', 'TailwindCSS', 'AlpineJS', 'Docker', 'Caddy', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/real-state.jpg',
		demo: 'https://muabanchothuequan7.vn',
		isPetProject: true,
		teamSize: 1
	},
	{
		title: ('projects.scoring.title'),
		description: ('projects.scoring.description'),
		technologies: ['Laravel', 'MariaDB', 'Redis', 'TailwindCSS', 'AlpineJS', 'Docker', 'Caddy', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/scoring.jpg',
		github: 'https://github.com/dcl20p/scoring',
		isPetProject: true,
		teamSize: 1
	},
	{
		title: ('projects.resume.title'),
		description: ('projects.resume.description'),
		technologies: ['Laravel', 'MariaDB', 'Redis', 'TailwindCSS', 'ReactJS', 'Docker', 'Caddy', 'InertiaJS', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/resume.jpg',
		demo: 'https://thieusytung.com',
		github: 'https://github.com/dcl20p/resume',
		isPetProject: true,
		teamSize: 1
	},
	{
		title: ('projects.engibase.title'),
		description: ('projects.engibase.description'),
		technologies: ['Laminas', 'MariaDB', 'Redis', 'Kafka', 'Elasticsearch', 'Docker', 'Apache', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/engibase.jpg',
		teamSize: 3
	},
	{
		title: ('projects.techknock.title'),
		description: ('projects.techknock.description'),
		technologies: ['Laminas', 'MariaDB', 'Redis', 'Kafka', 'Elasticsearch', 'Docker', 'Apache', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/techknock.jpg',
		teamSize: 2
	},
	{
		title: ('projects.dragon_tiger.title'),
		description: ('projects.dragon_tiger.description'),
		technologies: ['Laminas', 'MariaDB', 'Redis', 'Kafka', 'Elasticsearch', 'Docker', 'Apache', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/dragon-tiger.jpg',
		teamSize: 2
	},
	{
		title: ('projects.startup_viet.title'),
		description: ('projects.startup_viet.description'),
		technologies: ['Zend 1', 'Elasticsearch', 'Gearman', 'Redis', 'MySQL', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/startup-viet.jpg',
		demo: 'https://startup.vnexpress.net/startup-viet-2020',
		teamSize: 3
	},
	{
		title: ('projects.vrace_v1.title'),
		description: ('projects.vrace_v1.description'),
		technologies: ['Zend 1', 'Elasticsearch', 'Gearman', 'Redis', 'MySQL', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/vrace.jpg',
		demo: 'https://vrace.vnexpress.net',
		teamSize: 2
	},
	{
		title: ('projects.vrace.title'),
		description: ('projects.vrace.description'),
		technologies: ['Zend 2', 'RabbitMQ', 'Elasticsearch', 'Redis', 'MySQL', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/vrace.jpg',
		demo: 'https://vrace.vnexpress.net',
		teamSize: 3
	},
	{
		title: ('projects.vaccine.title'),
		description: ('projects.vaccine.description'),
		technologies: ['Zend 2', 'RabbitMQ', 'Elasticsearch', 'Redis', 'MySQL', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/vaccine.jpg',
		demo: 'https://vnexpress.net/suc-khoe/vaccine',
		teamSize: 2
	},
	{
		title: ('projects.science.title'),
		description: ('projects.science.description'),
		technologies: ['Zend 2', 'RabbitMQ', 'Elasticsearch', 'Redis', 'MySQL', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/science.jpg',
		demo: 'https://vnexpress.net/khoa-hoc/cuoc-thi-sang-tao-khoa-hoc',
		teamSize: 2
	},
	{
		title: ('projects.cooking.title'),
		description: ('projects.cooking.description'),
		technologies: ['Zend 2', 'RabbitMQ', 'Elasticsearch', 'Redis', 'MySQL', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/cooking.jpg',
		demo: 'https://vnexpress.net/doi-song/cooking',
		teamSize: 2
	},
	{
		title: ('projects.copyright.title'),
		description: ('projects.copyright.description'),
		technologies: ['Zend 2', 'RabbitMQ', 'Elasticsearch', 'Redis', 'MySQL', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/copyright.jpg',
		teamSize: 3
	},
	{
		title: ('projects.admin_pages.title'),
		description: ('projects.admin_pages.description'),
		technologies: ['Zend 1', 'Elasticsearch', 'Gearman', 'Redis', 'MySQL', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/admin-pages.jpg',
		teamSize: 3
	},
	{
		title: ('projects.rpa.title'),
		description: ('projects.rpa.description'),
		technologies: ['RPA', 'VB.NET', 'Selenium', 'AKABOT', 'Python', 'Javascript'],
		image: '/images/projects/rpa.jpg',
		teamSize: 1
	},
	{
		title: ('projects.internal_website.title'),
		description: ('projects.internal_website.description'),
		technologies: ['Laravel 5', 'MySQL', 'Bootstrap', 'jQuery', 'Javascript', 'HTML5', 'CSS3'],
		image: '/images/projects/admin-pages.jpg',
		teamSize: 2
	},
	{
		title: ('projects.glory_pos.title'),
		description: ('projects.glory_pos.description'),
		technologies: ['Angular 7', 'NodeJS', 'MySQL', 'HTML5', 'CSS3', 'Javascript'],
		image: '/images/projects/glory.jpg',
		teamSize: 3
	},
	{
		title: ('projects.ecommerce.title'),
		description: ('projects.ecommerce.description'),
		technologies: ['PHP MVC', 'MySQL', 'Bootstrap', 'jQuery', 'Javascript', 'HTML5', 'CSS3'],
		image: '/images/projects/ecommerce.jpg',
		teamSize: 1
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

export default function Projects() {
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(0);

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
							modules={[Virtual, Autoplay, Pagination, Navigation]}
							spaceBetween={30}
							slidesPerView={1}
							virtual
							watchSlidesProgress={true}
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
								<SwiperSlide key={index} virtualIndex={index} data-swiper-slide-index={index}>
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
															src={project.image || '/images/projects/coming_soon.jpg'}
															alt={t(project.title)}
															className="w-full h-48 object-cover"
															onError={(e) => {
																e.target.onerror = null;
																e.target.src = '/images/projects/coming_soon.jpg';
															}}
														/>
														<div className="absolute top-2 right-2 flex flex-row gap-2">
															{project.isPetProject && (
																<div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
																	Pet Project
																</div>
															)}
															<div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
																{project.teamSize} {project.teamSize > 1 ? 'Members' : 'Member'}
															</div>
														</div>
														<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
													</motion.div>

													<motion.h3 
														className="section-subtitle mb-2"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: 0.2 }}
													>
														{t(project.title)}
													</motion.h3>
													<motion.p 
														className="text-foreground/80 mb-4"
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ delay: 0.3 }}
													>
														{t(project.description)}
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
														{project.github && (
														<Button variant="outline" className="w-full" asChild>
															<a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="View code">
																<Github className="mr-2 h-4 w-4" />
																{t('projects.view_code')}
															</a>
														</Button> )}
														{project.demo && (
														<Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600" asChild>
															<a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="View project">
																<ExternalLink className="mr-2 h-4 w-4" />
																{t('projects.view_project')}
															</a>
														</Button> )}
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
			<style>{`
				.projects-slider {
					padding: 20px 10px 50px;
				}
				.projects-slider.swiper {
					overflow: hidden;
				}
				.projects-slider .swiper-slide {
					height: auto;
					display: flex;
				}
				.projects-slider .swiper-slide > div {
					height: 100%;
					display: flex;
					flex-direction: column;
				}
				.projects-slider .swiper-slide .glass-card {
					height: 100%;
					display: flex;
					flex-direction: column;
				}
				.projects-slider .swiper-slide .glass-card .p-6 {
					flex: 1;
					display: flex;
					flex-direction: column;
				}
				.projects-slider .swiper-slide .glass-card .p-6 > div:last-child {
					margin-top: auto;
				}
				.swiper-button-prev-custom,
				.swiper-button-next-custom {
					width: 40px;
					height: 40px;
					background: linear-gradient(to right, rgb(168 85 247), rgb(236 72 153));
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
					background: linear-gradient(to right, rgb(147 51 234), rgb(219 39 119));
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
					right: -10px;
				}
				.swiper-button-prev-custom {
					left: -10px;
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