import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/Components/ui/card';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'Docker'],
      image: '/images/projects/project1.jpg',
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
    }
  ];

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="glass-card card-hover h-full border-0 group">
                  <CardContent className="p-6">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <h3 className="section-subtitle mb-2">{project.title}</h3>
                    <p className="text-foreground/80 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm bg-cyan-500/10 text-cyan-500 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" className="w-full" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          {t('projects.view_code')}
                        </a>
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 hover:opacity-90" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t('projects.view_project')}
                        </a>
                      </Button>
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