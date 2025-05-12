import React from 'react';
import { Link } from '@inertiajs/react';
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { ThemeProvider } from "@/Components/ThemeProvider";

const ResumeLayout = ({ children }) => {
	return (
		<ThemeProvider defaultTheme="dark">
			<div className="min-h-screen bg-background text-foreground overflow-hidden relative">
				{/* Background elements */}
				<div className="fixed inset-0 z-0 overflow-hidden">
					<div className="absolute inset-0 hero-pattern opacity-5"></div>
					<div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan/10 to-transparent rounded-full blur-3xl"></div>
					<div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green/10 to-transparent rounded-full blur-3xl"></div>
				</div>

				<div className="relative z-10">
					<TooltipProvider>
						<Toaster />
						<Sonner />
						{children}
					</TooltipProvider>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default ResumeLayout; 