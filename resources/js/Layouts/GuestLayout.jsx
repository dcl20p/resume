import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { ThemeProvider } from "@/Components/ThemeProvider";
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { ThemeToggle } from '@/Components/ThemeToggle';
import { Button } from '@/Components/ui/button';
import { Globe } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

export default function GuestLayout({ children }) {
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <ThemeProvider defaultTheme="dark">
            <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
                {/* Background elements */}
                <div className="fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 hero-pattern opacity-5"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green/10 to-transparent rounded-full blur-3xl"></div>
                </div>

                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/" className="flex items-center text-xl font-bold">
                                Portfolio
                            </Link>

                            <div className="flex items-center space-x-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <Globe className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => changeLanguage('en')}>
                                            English
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => changeLanguage('vi')}>
                                            Tiếng Việt
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-6 sm:pt-0">
                    <div className="w-full max-w-md px-6 py-8 overflow-hidden glass-card rounded-lg shadow-lg">
                        <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            {children}
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
