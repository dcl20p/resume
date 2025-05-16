import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/Components/ui/card';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactInfo() {
    const { t } = useTranslation();

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
            link: 'https://github.com/dcl20p',
            label: 'View GitHub'
        },
        {
            icon: <Linkedin className="w-5 h-5" />,
            title: 'LinkedIn',
            link: 'https://www.linkedin.com/in/t%C3%B9ng-thi%E1%BB%81u-s%E1%BB%B9-b68a84167/',
            label: 'View LinkedIn'
        }
    ];

    return (
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
                                    aria-label={social.label}
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
    );
} 