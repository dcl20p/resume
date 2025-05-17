import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'w-full flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-foreground focus:border-indigo-700'
                    : 'border-transparent hover:border-gray-300 hover:text-foreground focus:border-gray-300 focus:text-foreground') +
                ' ' +
                className
            }
        >
            {children}
        </Link>
    );
}
