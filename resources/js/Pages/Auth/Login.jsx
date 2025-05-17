import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Login({ status, canResetPassword }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth.login.title')} />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value={t('auth.login.email')} className="text-foreground/80" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value={t('auth.login.password')} className="text-foreground/80" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full h-10 px-4 rounded-full border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-background/50 backdrop-blur-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-cyan-500 shadow-sm focus:ring-cyan-500"
                        />
                        <span className="ms-2 text-sm text-foreground/80">{t('auth.login.remember')}</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-foreground/80 hover:text-foreground"
                        >
                            {t('auth.login.forgot')}
                        </Link>
                    )}
                </div>

                <div className="flex items-center justify-end">
                    <Link
                        href={route('register')}
                        className="text-sm text-foreground/80 hover:text-foreground me-4"
                    >
                        {t('auth.login.no_account')}
                    </Link>

                    <PrimaryButton 
                        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-500"
                        disabled={processing}
                    >
                        {t('auth.login.submit')}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
