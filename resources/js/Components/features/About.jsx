import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
	User,
	MapPin,
	Mail,
	Phone,
	Code,
	Briefcase,
	School,
	Heart,
	Book,
	Coffee,
	Globe 
} from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";
import CountUp from "react-countup";

export default function About() {
	const { t } = useTranslation();

	const stats = [
		{
			label: t("about.years"),
			value: 6,
			suffix: "+",
		},
		{
			label: t("about.projects"),
			value: 25,
			suffix: "+",
		},
		{
			label: t("about.tech_used"),
			value: 15,
			suffix: "+",
		},
	];

	const personalInfo = [
		{
			label: t("about.name"),
			value: t("hero.name")	,
			icon: <User className="h-5 w-5 icon-gradient" />,
		},
		{
			label: t("about.email"),
			value: "tung096300862@gmail.com",
			icon: <Mail className="h-5 w-5 icon-gradient" />,
		},
		{
			label: t("about.phone"),
			value: "+84 963002862",
			icon: <Phone className="h-5 w-5 icon-gradient" />,
		},
		{
			label: t("about.location"),
			value: t("about.locationValue"),
			icon: <MapPin className="h-5 w-5 icon-gradient" />,
		},
		{
			label: t("about.website"),
			value: "https://thieusytung.com",
			icon: <Globe  className="h-5 w-5 icon-gradient" />,
		},
	];

	const careerGoals = [
		{
			text: t("about.careerGoal1"),
			icon: <Code className="h-5 w-5 icon-gradient" />,
		},
		{
			text: t("about.careerGoal2"),
			icon: <Briefcase className="h-5 w-5 icon-gradient" />,
		},
		{
			text: t("about.careerGoal3"),
			icon: <School className="h-5 w-5 icon-gradient" />,
		},
	];

	const interests = [
		{
			name: t("about.interest1"),
			icon: <Code className="h-5 w-5 icon-gradient" />,
		},
		{
			name: t("about.interest2"),
			icon: <Book className="h-5 w-5 icon-gradient" />,
		},
		{
			name: t("about.interest3"),
			icon: <Coffee className="h-5 w-5 icon-gradient" />,
		},
		{
			name: t("about.interest4"),
			icon: <Heart className="h-5 w-5 icon-gradient" />,
		},
	];

	return (
		<section
			id="about"
			className="section-padding relative overflow-hidden bg-ground-light"
		>
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
					<h2 className="section-title">{t("about.title")}</h2>

					{/* Who Am I & Stats */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="h-full"
						>
							<Card className="glass-card card-hover h-full border-0">
								<CardContent className="p-6">
									<h3 className="section-subtitle">{t("about.who")}</h3>
									<p className="text-foreground/80 leading-relaxed">
										{t("about.description")}
									</p>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="h-full"
						>
							<Card className="glass-card card-hover h-full border-0">
								<CardContent className="p-6">
									<h3 className="section-subtitle">{t("about.stats")}</h3>
									<div className="grid grid-cols-3 gap-4">
										{stats.map((stat, index) => (
											<div key={index} className="text-center">
												<div className="text-3xl font-bold mb-1 gradient-text">
													<CountUp
														end={stat.value}
														suffix={stat.suffix}
														duration={2.5}
														enableScrollSpy
														scrollSpyOnce
													/>
												</div>
												<div className="text-sm text-foreground/60">
													{stat.label}
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>

					{/* Personal Info & Career Goals */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="h-full"
						>
							<Card className="glass-card card-hover h-full border-0">
								<CardContent className="p-6">
									<h3 className="section-subtitle">
										{t("about.personalInfo")}
									</h3>
									<div className="space-y-4">
										{personalInfo.map((info, index) => (
											<div key={index} className="flex items-start gap-3">
												<div className="p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 rounded-full">
													{info.icon}
												</div>
												<div>
													<h4 className="font-medium gradient-text">
														{info.label}
													</h4>
													<p className="text-foreground/80">{info.value}</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="h-full"
						>
							<Card className="glass-card card-hover h-full border-0">
								<CardContent className="p-6">
									<h3 className="section-subtitle">{t("about.careerGoals")}</h3>
									<p className="text-foreground/80 mb-4 leading-relaxed">
										{t("about.careerGoalsDescription")}
									</p>
									<ul className="space-y-2">
										{careerGoals.map((goal, index) => (
											<li key={index} className="flex items-start gap-2">
												<div className="p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 rounded-full">
													{goal.icon}
												</div>
												<span className="text-foreground/80">{goal.text}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</motion.div>
					</div>

					{/* Interests */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<Card className="glass-card card-hover border-0">
							<CardContent className="p-6">
								<h3 className="section-subtitle">{t("about.interests")}</h3>
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
									{interests.map((interest, index) => (
										<div
											key={index}
											className="flex items-center gap-3 p-4 rounded-md bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300"
										>
											<div className="p-2 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 rounded-full">
												{interest.icon}
											</div>
											<span className="font-medium gradient-text">
												{interest.name}
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
