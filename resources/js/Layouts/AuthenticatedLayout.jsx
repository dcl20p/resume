import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
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

export default function Authenticated({ user, header, children }) {
    console.log('Authenticated user:', user);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
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

                {/* Fixed header */}
                <div className="fixed top-0 left-0 right-0 z-50">
                    <nav className="glass-card border-b border-border/50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="shrink-0 flex items-center">
                                    <Link href="/dashboard" className="text-xl font-bold">
                                        Portfolio
                                    </Link>
                                    </div>

                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink 
                                            href={route('dashboard')} 
                                            active={route().current('dashboard')} 
                                            className="hover:text-foreground data-[active=true]:bg-foreground/10 data-[active=true]:text-foreground"
                                        >
                                            {t('nav.dashboard')}
                                        </NavLink>
                                    </div>
                                </div>

                                <div className="hidden sm:flex sm:items-center sm:ml-6">
                                    <div className="ml-3 relative">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-full">
                                                    <Globe className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="z-[100]">
                                                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                                                    {t('about.en')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => changeLanguage('vi')}>
                                                    {t('about.vi')}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="ml-3 relative">
                                        <ThemeToggle />
                                    </div>

                                    <div className="ml-3 relative">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-foreground/60 hover:text-foreground focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {user?.name}

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end" className="z-[100]">
                                                <DropdownMenuItem href={route('profile.edit')}>
                                                    {t('nav.profile')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <form method="POST" action={route('logout')}>
                                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                                                        <button type="submit" className="w-full text-left">
                                                            {t('nav.logout')}
                                                        </button>
                                                    </form>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="-mr-2 flex items-center sm:hidden">
                                    <div className="flex items-center space-x-2 mr-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-full">
                                                    <Globe className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="z-[100]">
                                                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                                                    {t('about.en')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => changeLanguage('vi')}>
                                                    {t('about.vi')}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <ThemeToggle />
                                    </div>
                                    <button
                                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground/80 hover:bg-foreground/10 focus:outline-none focus:bg-foreground/10 active:bg-foreground/20 transition duration-150 ease-in-out"
                                    >
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path
                                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink 
                                    href={route('dashboard')} 
                                    active={route().current('dashboard')}
                                    className="hover:text-foreground data-[active=true]:bg-foreground/10 data-[active=true]:text-foreground"
                                >
                                    {t('nav.dashboard')}
                                </ResponsiveNavLink>
                            </div>

                            <div className="pt-4 pb-1 border-t border-border/50">
                                <div className="px-4">
                                    <div className="font-medium text-base text-foreground">{user?.name}</div>
                                    <div className="font-medium text-sm text-foreground/60">{user?.email}</div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink 
                                        href={route('profile.edit')} 
                                        className="hover:text-foreground hover:bg-foreground/10"
                                    >
                                        {t('nav.profile')}
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink 
                                        method="post" 
                                        href={route('logout')} 
                                        as="button" 
                                        className="hover:text-foreground hover:bg-foreground/10"
                                    >
                                        {t('nav.logout')}
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {header && (
                        <header className="glass-card border-b border-border/50">
                            <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
                                <h2 className="text-xl font-semibold text-foreground">{header}</h2>
                            </div>
                        </header>
                    )}
                </div>

                {/* Main content with padding for fixed header */}
                <div className="pt-[calc(4rem+var(--header-height,0px))]">
                    <main className="container mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-4 lg:py-8">
                        <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            {children}
                        </TooltipProvider>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}
