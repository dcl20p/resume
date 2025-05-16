import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
	const { t } = useTranslation();

	const socialLinks = [
		{
			icon: <Github className="h-5 w-5" />,
			href: 'https://github.com/dcl20p',
			label: 'GitHub'
		},
		{
			icon: <Linkedin className="h-5 w-5" />,
			href: 'https://www.linkedin.com/in/t%C3%B9ng-thi%E1%BB%81u-s%E1%BB%B9-b68a84167/',
			label: 'LinkedIn'
		},
		{
			icon: <Mail className="h-5 w-5" />,
			href: 'mailto:mailto:tung096300862@gmail.com',
			label: 'Email'
		}
	];

	return (
		<footer className="bg-primary/5 py-12">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-2xl font-bold mb-4">{t('footer.title')}</h2>
					<p className="text-muted-foreground mb-8">
						{t('footer.description')}
					</p>

					<div className="flex justify-center gap-4 mb-8">
						{socialLinks.map((link, index) => (
							<a
								key={index}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={link.label}
								className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
							>
								{link.icon}
								<span className="sr-only">{link.label}</span>
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
} 